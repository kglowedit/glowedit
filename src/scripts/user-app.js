/**
 * User Application Logic for K-beuty Glow Edit
 * Pure K-Beauty Editorial Blog & Community Intelligence Concept
 */

import { buildOliveYoungUrl, copyPromoCode, handleAffiliateClick, PROMO_CODE, showToast } from './affiliate.js';
import { 
  CURRENCIES, 
  formatPrice, 
  getArticles,
  getPublishedArticles, 
  getProducts, 
  getCommunityPosts, 
  saveCommunityPost, 
  likeCommunityPost, 
  addCommunityComment 
} from './data.js';
import { getLang, initLanguage, setLang, t, translations } from './i18n.js';
import { updateHeadMetadata } from './seo.js';

let currentCategory = 'all';
let currentSkinType = 'all';
let searchQuery = '';
let currentCurrency = 'USD';
let currentCommCategory = 'all';

export function initUserApp() {
  // 1. Language & Currency
  const activeLang = initLanguage();
  const savedCurrency = localStorage.getItem('kbeauty_currency');
  if (savedCurrency && CURRENCIES[savedCurrency]) {
    currentCurrency = savedCurrency;
  }

  // 2. Wire up Header and Page controls
  setupHeaderEvents();
  setupNewsletterForm();
  setupRoutineQuiz();
  setupCommunityForum();

  // 3. Render initial state
  renderApp();

  // 4. Check URL hash for direct article link -> redirect to standalone article page
  checkUrlHashForArticle();

  // 5. Update SEO & Schema
  refreshSeoMetadata();
}

function setupHeaderEvents() {
  // Language selector
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = getLang();
    langSelect.addEventListener('change', (e) => {
      setLang(e.target.value);
      renderApp();
      refreshSeoMetadata();
    });
  }

  // Currency selector
  const currSelect = document.getElementById('currency-select');
  if (currSelect) {
    currSelect.value = currentCurrency;
    currSelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem('kbeauty_currency', currentCurrency);
      renderRoutineResults();
    });
  }

  // Promo code button
  const promoBtn = document.getElementById('promo-code-btn');
  if (promoBtn) {
    promoBtn.addEventListener('click', () => copyPromoCode(promoBtn));
  }

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderArticles();
    });
  }

  // SEO Diagnostics Toggle
  const seoFab = document.getElementById('seo-diagnostics-fab');
  const seoDrawer = document.getElementById('seo-drawer');
  const seoCloseBtn = document.getElementById('seo-drawer-close');
  if (seoFab && seoDrawer) {
    seoFab.addEventListener('click', () => {
      seoDrawer.classList.toggle('open');
      if (seoDrawer.classList.contains('open')) {
        updateSeoInspector();
      }
    });
  }
  if (seoCloseBtn && seoDrawer) {
    seoCloseBtn.addEventListener('click', () => seoDrawer.classList.remove('open'));
  }

  // Category & Skin Filter Buttons
  document.querySelectorAll('.filter-pill[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill[data-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderArticles();
    });
  });

  document.querySelectorAll('.filter-pill[data-skintype]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill[data-skintype]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSkinType = btn.dataset.skintype;
      renderArticles();
    });
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (email) {
      showToast({
        title: "Welcome to K-beuty Glow Edit",
        message: "Your exclusive 10% Olive Young promo code GLOW10 has been dispatched to your inbox."
      });
      form.reset();
    }
  });
}

function setupRoutineQuiz() {
  const runBtn = document.getElementById('btn-run-routine');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      generatePersonalizedRoutine();
    });
  }
}

function renderApp() {
  applyI18nLabels();
  renderFeaturedStory();
  renderArticles();
  renderCommunityPosts();
}

function applyI18nLabels() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.setAttribute('placeholder', t(key));
  });
}

function renderFeaturedStory() {
  const container = document.getElementById('featured-story-wrap');
  if (!container) return;

  const articles = getPublishedArticles();
  const featured = articles.find(a => a.featured) || articles[0];
  if (!featured) return;

  const lang = getLang();
  const title = featured.title[lang] || featured.title.en;
  const excerpt = featured.excerpt[lang] || featured.excerpt.en;
  const articleUrl = `/article.html?slug=${encodeURIComponent(featured.slug)}`;

  container.innerHTML = `
    <div class="featured-story-card" id="featured-${featured.id}">
      <div class="featured-img-wrap">
        <a href="${articleUrl}">
          <img src="${featured.coverImage}" alt="${title}" class="featured-img" loading="eager" />
        </a>
      </div>
      <div class="featured-content">
        <div class="meta-row">
          <span class="badge-featured">${t('featuredBadge')}</span>
          <span>•</span>
          <span>${featured.readTime} ${t('readTime')}</span>
          <span>•</span>
          <span>${featured.views.toLocaleString()} ${t('views')}</span>
        </div>
        <h2 class="featured-headline">
          <a href="${articleUrl}" style="color: inherit; text-decoration: none;">${title}</a>
        </h2>
        <p class="featured-excerpt">${excerpt}</p>
        <div class="author-bar">
          <img src="${featured.author.avatar}" alt="${featured.author.name}" class="author-avatar" />
          <div>
            <div class="author-name">${featured.author.name}</div>
            <div class="author-role">${featured.author.role}</div>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <a href="${articleUrl}" class="btn-primary" style="padding: 10px 22px; font-size: 0.9rem; text-decoration: none; display: inline-flex;">
            ${t('readFullArticle')} →
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderArticles() {
  const container = document.getElementById('articles-grid');
  if (!container) return;

  const lang = getLang();
  const articles = getPublishedArticles();

  // Filter
  const filtered = articles.filter(art => {
    const matchCat = currentCategory === 'all' || art.category === currentCategory;
    const matchSkin = currentSkinType === 'all' || art.skinType === currentSkinType || art.skinType === 'all';
    
    const title = (art.title[lang] || art.title.en || '').toLowerCase();
    const excerpt = (art.excerpt[lang] || art.excerpt.en || '').toLowerCase();
    const matchSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery);

    return matchCat && matchSkin && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">No guides found matching your filter criteria.</p>
        <button class="btn-secondary" id="reset-filter-btn" style="padding: 8px 18px; font-size: 0.85rem;">Clear Filters</button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentCategory = 'all';
        currentSkinType = 'all';
        searchQuery = '';
        document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.filter-pill[data-category="all"], .filter-pill[data-skintype="all"]').forEach(p => p.classList.add('active'));
        renderArticles();
      });
    }
    return;
  }

  container.innerHTML = filtered.map(art => {
    const title = art.title[lang] || art.title.en;
    const excerpt = art.excerpt[lang] || art.excerpt.en;
    const articleUrl = `/article.html?slug=${encodeURIComponent(art.slug)}`;
    return `
      <article class="article-card" data-article-id="${art.id}">
        <a href="${articleUrl}" style="text-decoration: none; color: inherit; display: block;">
          <div class="article-thumb-wrap">
            <img src="${art.coverImage}" alt="${title}" class="article-thumb" loading="lazy" />
            <span class="category-tag-float">${getCategoryLabel(art.category)}</span>
          </div>
          <div class="article-body">
            <div class="meta-row" style="font-size: 0.78rem;">
              <span>${art.readTime} ${t('readTime')}</span>
              <span>•</span>
              <span>${art.publishDate}</span>
            </div>
            <h3 class="article-title">${title}</h3>
            <p class="article-snippet">${excerpt}</p>
            <div class="article-footer">
              <span>${art.views.toLocaleString()} ${t('views')}</span>
              <span class="read-more-link">${t('readFullArticle')} →</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }).join('');
}

function checkUrlHashForArticle() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  // If user navigated with a hash matching an article slug, navigate to standalone page
  const articles = getPublishedArticles();
  const found = articles.find(a => a.slug === hash || a.id === hash);
  if (found) {
    window.location.href = `/article.html?slug=${encodeURIComponent(found.slug)}`;
  }
}

/* =========================================================
   Community Forum Logic (게시판)
========================================================= */
function setupCommunityForum() {
  const openPostBtn = document.getElementById('btn-open-new-post');
  const cancelPostBtn = document.getElementById('btn-cancel-post');
  const postBox = document.getElementById('community-new-post-box');
  const postForm = document.getElementById('community-post-form');

  if (openPostBtn && postBox) {
    openPostBtn.addEventListener('click', () => {
      postBox.classList.toggle('open');
      if (postBox.classList.contains('open')) {
        document.getElementById('comm-post-title')?.focus();
      }
    });
  }

  if (cancelPostBtn && postBox) {
    cancelPostBtn.addEventListener('click', () => {
      postBox.classList.remove('open');
      postForm?.reset();
    });
  }

  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('comm-post-title').value.trim();
      const category = document.getElementById('comm-post-category').value;
      const content = document.getElementById('comm-post-content').value.trim();
      const author = document.getElementById('comm-post-author').value.trim();
      let country = document.getElementById('comm-post-country').value.trim() || 'Global';

      if (!country.startsWith('🇺🇸') && !country.startsWith('🇯🇵') && !country.startsWith('🇰🇷') && !country.startsWith('🇬🇧') && !country.startsWith('🇨🇦')) {
        country = `🌍 ${country}`;
      }

      if (!title || !content || !author) return;

      const newPost = {
        id: `post-${Date.now()}`,
        title,
        category,
        content,
        author,
        country,
        date: 'Just now',
        likes: 1,
        replies: []
      };

      saveCommunityPost(newPost);
      postForm.reset();
      postBox.classList.remove('open');

      showToast({
        title: "Discussion Published",
        message: "Your topic has been posted to the global K-Beauty community."
      });

      renderCommunityPosts();
    });
  }

  // Category filter tabs
  document.querySelectorAll('.comm-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.comm-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCommCategory = pill.dataset.commCategory || 'all';
      renderCommunityPosts();
    });
  });
}

function renderCommunityPosts() {
  const container = document.getElementById('community-posts-list');
  if (!container) return;

  const allPosts = getCommunityPosts();
  const filtered = allPosts.filter(p => {
    if (currentCommCategory === 'all') return true;
    return p.category === currentCommCategory;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--color-text-muted); background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-card-border);">
        <p style="font-size: 1rem; margin-bottom: 8px;">No discussions found under this category yet.</p>
        <button class="btn-primary" onclick="document.getElementById('btn-open-new-post').click();" style="padding: 8px 16px; font-size: 0.85rem;">Be the first to ask!</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(post => {
    const repliesCount = (post.replies || []).length;
    return `
      <div class="community-card" id="comm-card-${post.id}">
        <div class="community-card-header">
          <div class="community-author-row">
            <span class="community-avatar">${getAvatarInitials(post.author)}</span>
            <div>
              <div class="community-author-name">
                ${escapeHtml(post.author)}
                <span class="community-author-country">${escapeHtml(post.country)}</span>
              </div>
              <div class="community-post-date">${post.date}</div>
            </div>
          </div>
          <span class="community-cat-badge">${escapeHtml(post.category)}</span>
        </div>

        <h3 class="community-post-title">${escapeHtml(post.title)}</h3>
        <p class="community-post-content">${escapeHtml(post.content)}</p>

        <div class="community-actions-bar">
          <button class="community-action-btn btn-like-post" data-post-id="${post.id}">
            <span>❤️</span>
            <span class="like-count">${post.likes || 0}</span>
          </button>
          <button class="community-action-btn btn-toggle-replies" data-post-id="${post.id}">
            <span>💬</span>
            <span>${repliesCount} ${repliesCount === 1 ? 'Reply' : 'Replies'}</span>
          </button>
        </div>

        <!-- Replies Drawer -->
        <div class="community-replies-drawer" id="replies-${post.id}" style="display: none; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--color-card-border);">
          <div class="replies-list" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
            ${(post.replies || []).map(r => `
              <div style="background: rgba(0,0,0,0.02); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.85rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-weight: 600; color: var(--color-text-main);">
                  <span>${escapeHtml(r.author)} <small style="color: var(--color-text-muted); font-weight: normal;">${escapeHtml(r.country || '')}</small></span>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted);">${r.date}</span>
                </div>
                <div style="color: var(--color-text-secondary); line-height: 1.4;">${escapeHtml(r.content)}</div>
              </div>
            `).join('')}
          </div>

          <!-- Add reply form -->
          <form class="inline-reply-form" data-post-id="${post.id}" style="display: flex; gap: 8px;">
            <input type="text" class="custom-select reply-input" placeholder="Write a reply..." required style="flex: 1; padding: 8px 12px; font-size: 0.85rem;" />
            <button type="submit" class="btn-primary" style="padding: 8px 14px; font-size: 0.82rem; white-space: nowrap;">Reply</button>
          </form>
        </div>
      </div>
    `;
  }).join('');

  // Attach event listeners for Likes
  container.querySelectorAll('.btn-like-post').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const postId = btn.dataset.postId;
      likeCommunityPost(postId);
      const post = getCommunityPosts().find(p => p.id === postId);
      if (post) {
        btn.querySelector('.like-count').textContent = post.likes;
        btn.style.color = '#EC4899';
      }
    });
  });

  // Attach event listeners for Reply Accordion Toggle
  container.querySelectorAll('.btn-toggle-replies').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.postId;
      const drawer = document.getElementById(`replies-${postId}`);
      if (drawer) {
        drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
      }
    });
  });

  // Attach event listeners for Reply Form Submissions
  container.querySelectorAll('.inline-reply-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const postId = form.dataset.postId;
      const input = form.querySelector('.reply-input');
      const text = input.value.trim();
      if (!text) return;

      addCommunityComment(postId, {
        author: "Skincare Lover",
        country: "Global Reader",
        date: "Just now",
        content: text
      });

      renderCommunityPosts();
      // Keep drawer open
      const drawer = document.getElementById(`replies-${postId}`);
      if (drawer) drawer.style.display = 'block';
    });
  });
}

function getAvatarInitials(name) {
  if (!name) return 'K';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* =========================================================
   Skincare Routine Quiz
========================================================= */
function generatePersonalizedRoutine() {
  const skinSelect = document.getElementById('routine-skin-select');
  const goalSelect = document.getElementById('routine-goal-select');
  const resultsContainer = document.getElementById('routine-results-container');
  const stepsGrid = document.getElementById('routine-steps-grid');

  if (!skinSelect || !goalSelect || !resultsContainer || !stepsGrid) return;

  const skin = skinSelect.value;
  const goal = goalSelect.value;
  const lang = getLang();
  const products = getProducts();

  let step1Prod = products.find(p => p.id === 'anua-heartleaf-toner');
  let step2Prod = products.find(p => p.id === 'torriden-dive-in-serum');
  let step3Prod = products.find(p => p.id === 'round-lab-birch-sunscreen');

  if (goal === 'glow') {
    step2Prod = products.find(p => p.id === 'cosrx-snail-mucin-essence') || step2Prod;
    step3Prod = products.find(p => p.id === 'beauty-of-joseon-sunscreen') || step3Prod;
  } else if (goal === 'calm') {
    step1Prod = products.find(p => p.id === 'mediheal-madecassoside-pad') || step1Prod;
  }

  const steps = [
    { title: "Step 1: Low-pH Toner & Prep", product: step1Prod, note: "Balances skin mantle and opens cellular hydration channels." },
    { title: "Step 2: Active Repair Ampoule", product: step2Prod, note: "Infuses multi-depth moisture and reinforces damaged barrier lipids." },
    { title: "Step 3: Lightweight Daily Sun Shield", product: step3Prod, note: "Broad-spectrum SPF 50+ essential to prevent hyperpigmentation." }
  ];

  stepsGrid.innerHTML = steps.map((s, idx) => {
    const p = s.product;
    const pName = p.name[lang] || p.name.en;
    const price = formatPrice(p.priceUSD, currentCurrency);
    return `
      <div class="step-box">
        <span class="step-number">${s.title}</span>
        <div style="font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.4;">${s.note}</div>
        <img src="${p.image}" alt="${pName}" style="height: 130px; object-fit: contain; margin: 10px 0; border-radius: var(--radius-sm);" />
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${p.brand}</div>
        <div style="font-size: 0.9rem; font-weight: 600; line-height: 1.35;">${pName}</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: auto;">Tested reference: ${price}</div>
        <a href="${p.oliveYoungUrl}" class="btn-primary" data-product-id="${p.id}" data-url="${p.oliveYoungUrl}" style="padding: 8px 12px; font-size: 0.8rem; margin-top: 10px; border-radius: var(--radius-sm); justify-content: center; text-decoration: none;">
          ${t('viewOnOliveYoung')}
        </a>
      </div>
    `;
  }).join('');

  stepsGrid.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      handleAffiliateClick(e, btn.dataset.productId, btn.dataset.url, "routine_diagnostic");
    });
  });

  resultsContainer.classList.add('visible');
  resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderRoutineResults() {
  const resultsContainer = document.getElementById('routine-results-container');
  if (resultsContainer && resultsContainer.classList.contains('visible')) {
    generatePersonalizedRoutine();
  }
}

function refreshSeoMetadata() {
  const lang = getLang();
  const descMap = {
    en: "Curated K-Beauty intelligence, glass skin routines, and Olive Young Global shopping guides with exclusive promo code discounts.",
    zh: "首尔正统韩系护肤专栏、水光肌公式与 Olive Young Global 全球直邮省钱指南，独家专享海淘优惠码。",
    ja: "ソウル発の最新韓国スキンケアトレンド、水光肌ルーティン、オリーブヤンググローバル公式通販の購入ガイド。"
  };

  updateHeadMetadata({
    title: `${t('brandName')} | ${t('brandTagline')}`,
    description: descMap[lang] || descMap.en,
    products: getProducts()
  });
}

function updateSeoInspector() {
  const container = document.getElementById('seo-inspector-data');
  if (!container) return;

  const lang = getLang();
  const canonicalUrl = window.location.origin + window.location.pathname;
  const jsonLdScript = document.getElementById('seo-json-ld');
  const structuredDataText = jsonLdScript ? jsonLdScript.textContent : 'Generating...';

  container.innerHTML = `
    <div>
      <strong>Active Language:</strong> <code>${lang}</code>
    </div>
    <div>
      <strong>Canonical Tag:</strong> <code>${canonicalUrl}</code>
    </div>
    <div>
      <strong>Hreflang Targets:</strong>
      <ul style="padding-left: 20px; margin-top: 6px;">
        <li><code>en</code>: ${canonicalUrl}?hl=en</li>
        <li><code>zh</code>: ${canonicalUrl}?hl=zh</li>
        <li><code>ja</code>: ${canonicalUrl}?hl=ja</li>
        <li><code>x-default</code>: ${canonicalUrl}?hl=en</li>
      </ul>
    </div>
    <div>
      <strong>Geo Meta Tags:</strong>
      <div style="margin-top: 4px;"><code>geo.region: KR-11 (Seoul)</code></div>
      <div><code>geo.placename: Seoul, South Korea</code></div>
      <div><code>target market: Global (US, Japan, China, Southeast Asia)</code></div>
    </div>
    <div>
      <strong>Live Schema.org JSON-LD Output:</strong>
      <pre class="seo-code-box">${structuredDataText}</pre>
    </div>
  `;
}

function getCategoryLabel(cat) {
  const map = {
    'awards': t('filterAwards'),
    'glass-skin': t('filterGlassSkin'),
    'sun-care': t('filterSunCare'),
    'trouble': t('filterTrouble')
  };
  return map[cat] || cat;
}
