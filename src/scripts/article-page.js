/**
 * Standalone Article Page Script for The K-Glow Edit
 * Handles URL slug resolution, rich markdown rendering, contextual affiliate formulas, and comments
 */

import '../styles/tokens.css';
import '../styles/main.css';
import { copyPromoCode, handleAffiliateClick, applyPromoSettingsToDOM } from './affiliate.js';
import { getArticles, getPublishedArticles, getProducts } from './data.js';
import { getLang, initLanguage, setLang, t, translations } from './i18n.js';
import { updateHeadMetadata } from './seo.js';

let currentArticle = null;

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  applyPromoSettingsToDOM();
  setupArticleHeaderControls();
  loadAndRenderArticle();
});

function setupArticleHeaderControls() {
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = getLang();
    langSelect.addEventListener('change', (e) => {
      setLang(e.target.value);
      applyPromoSettingsToDOM();
      loadAndRenderArticle();
    });
  }

  const promoBtn = document.getElementById('promo-code-btn');
  if (promoBtn) {
    promoBtn.addEventListener('click', () => copyPromoCode(promoBtn));
  }

  const shareBtn = document.getElementById('btn-share-article');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert(t('linkCopied'));
      });
    });
  }

  // Article Comments Form
  const commentForm = document.getElementById('article-comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', handleNewComment);
  }
}

function loadAndRenderArticle() {
  const lang = getLang();
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const articles = getArticles();
  currentArticle = articles.find(a => a.slug === slug || a.id === slug) || articles[0];

  if (!currentArticle) {
    document.getElementById('article-main-content').innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2>Article Not Found</h2>
        <a href="/" class="btn-primary" style="margin-top: 16px;">Back to All Stories</a>
      </div>
    `;
    return;
  }

  // Check if article is draft (hidden)
  if (currentArticle.status === 'draft') {
    document.getElementById('article-main-content').innerHTML = `
      <div style="text-align: center; padding: 70px 20px; max-width: 600px; margin: 0 auto;">
        <div style="font-size: 3.5rem; margin-bottom: 16px;">🔒</div>
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.35); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; margin-bottom: 14px;">
          비공개 문서
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 12px; color: var(--color-text-main);">이 글은 현재 비공개 상태입니다</h2>
        <p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 24px;">
          해당 아티클은 현재 비공개 처리되었거나 준비 중인 콘텐츠로 일반 독자에게 열람이 제한되어 있습니다.
        </p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <a href="/" class="btn-secondary" style="padding: 10px 22px;">← 블로그 홈으로 이동</a>
        </div>
      </div>
    `;
    return;
  }

  // Update Page Title and Document Meta
  const title = currentArticle.title[lang] || currentArticle.title.en;
  const excerpt = currentArticle.excerpt[lang] || currentArticle.excerpt.en;
  const content = currentArticle.content[lang] || currentArticle.content.en;

  document.title = `${title} | The K-Glow Edit`;

  updateHeadMetadata({
    title: `${title} | The K-Glow Edit`,
    description: excerpt,
    image: currentArticle.coverImage,
    type: "article",
    article: currentArticle
  });

  // Render Article Elements
  document.getElementById('post-category-tag').textContent = currentArticle.category.toUpperCase();
  document.getElementById('post-read-time').textContent = `${currentArticle.readTime} ${t('readTime')}`;
  document.getElementById('post-views').textContent = `${(currentArticle.views || 12000).toLocaleString()} ${t('views')}`;
  document.getElementById('post-title').textContent = title;
  document.getElementById('post-date').textContent = currentArticle.publishDate || "2026-10-18";
  document.getElementById('post-author-name').textContent = currentArticle.author?.name || "Min-Ji Kang";
  document.getElementById('post-author-role').textContent = currentArticle.author?.role || "Beauty Editor";
  document.getElementById('post-author-avatar').src = currentArticle.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80";

  document.getElementById('post-cover-image').src = currentArticle.coverImage;
  document.getElementById('post-cover-image').alt = title;

  // Render Markdown Body
  document.getElementById('post-body-prose').innerHTML = formatMarkdown(content);

  // Render Embedded Products
  renderEmbeddedProducts();

  // Render Comments
  renderComments();

  // Render Related Articles
  renderRelatedArticles();
}

function renderEmbeddedProducts() {
  const embedWrap = document.getElementById('post-embedded-products');
  if (!embedWrap || !currentArticle) return;

  const lang = getLang();
  const allProducts = getProducts();
  const articleProducts = (currentArticle.products || [])
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  if (articleProducts.length === 0) {
    embedWrap.innerHTML = '';
    return;
  }

  embedWrap.innerHTML = `
    <div style="background: #FAF7F5; border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); padding: 28px; margin: 40px 0;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 1.2rem;">✨</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--color-text-main);">
          ${t('relatedProductsInArticle')}
        </h3>
      </div>
      <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 20px; line-height: 1.5;">
        Formulations rigorously analyzed and tested by our Seoul beauty desk. Available worldwide via Olive Young Global with international tracking.
      </p>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${articleProducts.map(p => {
          const pName = p.name[lang] || p.name.en;
          const pBadge = p.badge[lang] || p.badge.en;
          return `
            <div style="background: #FFFFFF; border: 1px solid var(--color-card-border); border-radius: var(--radius-md); padding: 18px; display: grid; grid-template-columns: 88px 1fr auto; gap: 18px; align-items: center;">
              <img src="${p.image}" alt="${pName}" style="width: 88px; height: 88px; object-fit: contain; background: #FDFBFA; border-radius: var(--radius-xs); padding: 4px;" />
              <div>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${p.brand} • ${pBadge}</div>
                <div style="font-size: 1rem; font-weight: 600; color: var(--color-text-main); line-height: 1.35; margin: 3px 0;">${pName}</div>
                <div style="font-size: 0.8rem; color: var(--color-olive-young); font-weight: 500;">✓ Official Olive Young Global Store</div>
              </div>
              <div>
                <a href="${p.oliveYoungUrl}" 
                   class="btn-primary" 
                   data-product-id="${p.id}" 
                   data-url="${p.oliveYoungUrl}"
                   style="padding: 10px 18px; font-size: 0.85rem; border-radius: var(--radius-sm); white-space: nowrap;">
                  <span>${t('viewOnOliveYoung')}</span>
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  embedWrap.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
      handleAffiliateClick(e, btn.dataset.productId, btn.dataset.url, "article_page");
    });
  });
}

function renderComments() {
  const list = document.getElementById('article-comments-list');
  if (!list || !currentArticle) return;

  const storageKey = `comments_${currentArticle.id}`;
  const savedComments = JSON.parse(localStorage.getItem(storageKey) || '[]');

  const defaultComments = [
    { author: "Emily Watson", country: "🇺🇸 USA", date: "Yesterday", text: "This guide completely changed how I look at Korean skincare steps. Ordering the Round Lab sunscreen right now with code GLOW10!" },
    { author: "Yuki Tanaka", country: "🇯🇵 Japan", date: "2 days ago", text: "とても参考になりました。特に水分の重ね塗りの解説がわかりやすいです。" }
  ];

  const allComments = [...defaultComments, ...savedComments];

  list.innerHTML = allComments.map(c => `
    <div style="background: #FFFFFF; border: 1px solid var(--color-card-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 0.82rem;">
        <span style="font-weight: 600; color: var(--color-text-main);">${c.author} <span style="font-weight: 400; color: var(--color-text-muted);">(${c.country})</span></span>
        <span style="color: var(--color-text-muted);">${c.date}</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5;">${c.text}</p>
    </div>
  `).join('');
}

function handleNewComment(e) {
  e.preventDefault();
  const nameInput = document.getElementById('comment-author');
  const countryInput = document.getElementById('comment-country');
  const textInput = document.getElementById('comment-text');

  if (!nameInput || !textInput || !textInput.value.trim()) return;

  const storageKey = `comments_${currentArticle.id}`;
  const savedComments = JSON.parse(localStorage.getItem(storageKey) || '[]');

  savedComments.unshift({
    author: nameInput.value.trim() || 'Anonymous Reader',
    country: countryInput ? countryInput.value.trim() : 'Global',
    date: 'Just now',
    text: textInput.value.trim()
  });

  localStorage.setItem(storageKey, JSON.stringify(savedComments));
  textInput.value = '';
  renderComments();
}

function renderRelatedArticles() {
  const container = document.getElementById('related-articles-grid');
  if (!container || !currentArticle) return;

  const lang = getLang();
  const articles = getPublishedArticles().filter(a => a.id !== currentArticle.id).slice(0, 3);

  container.innerHTML = articles.map(art => {
    const title = art.title[lang] || art.title.en;
    return `
      <a href="/article.html?slug=${art.slug}" class="article-card" style="text-decoration: none;">
        <div class="article-thumb-wrap" style="height: 160px;">
          <img src="${art.coverImage}" alt="${title}" class="article-thumb" />
        </div>
        <div class="article-body" style="padding: 16px;">
          <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${art.category}</div>
          <h4 style="font-family: var(--font-serif); font-size: 1.05rem; line-height: 1.35; margin: 4px 0 8px; color: var(--color-text-main);">${title}</h4>
          <span style="font-size: 0.78rem; color: var(--color-text-muted);">${art.readTime} ${t('readTime')}</span>
        </div>
      </a>
    `;
  }).join('');
}

function formatMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/^• (.*$)/gim, '<li>$1</li>');
}
