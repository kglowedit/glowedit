/**
 * Admin Application Logic for The K-Glow Edit (한국어 관리자 스튜디오)
 * 핵심 블로그 기능:
 * 1. 새 글 작성 (한국어 원문 입력 -> AI 영문·중문·일문 자동 번역 -> 실시간 독자 화면 미리보기)
 * 2. 카테고리 관리
 * 3. 태그 관리
 * 4. 커뮤니티(게시판) 관리
 */

import { showToast } from './affiliate.js';
import { 
  getArticles, 
  saveArticle, 
  deleteArticle, 
  toggleArticleStatus,
  getCategories, 
  saveCategory, 
  deleteCategory, 
  getTags, 
  saveTag, 
  deleteTag, 
  getCommunityPosts, 
  getAllCommunityPostsRaw,
  saveCommunityPost,
  updateCommunityPost,
  deleteCommunityPost, 
  batchDeleteCommunityPosts,
  togglePinCommunityPost,
  toggleHideCommunityPost,
  addCommunityComment,
  deleteCommunityComment,
  resetDemoData,
  getPromoSettings,
  savePromoSettings,
  resetPromoSettings,
  DEFAULT_PROMO_SETTINGS,
  getProducts
} from './data.js';
import { generateStructuredData } from './seo.js';
import { 
  translateFullArticle, 
  generateSlug,
  getGeminiApiKey,
  setGeminiApiKey,
  hasGeminiApiKey,
  testGeminiApiKey,
  getActiveGeminiModel,
  getPreferredEngine,
  setPreferredEngine,
  isAutoFallbackEnabled,
  setAutoFallbackEnabled
} from './translator.js';

let activeTab = 'articles';
let currentArticleStatusFilter = 'all'; // 'all' | 'published' | 'draft'
let editingArticle = null;
let currentEditorLang = 'ko'; // 기본 작성 언어: 한국어
let currentPreviewLang = 'en'; // 기본 미리보기 언어: 영문
let uploadedArticleImages = []; // Cloudflare R2 uploaded images collection

let tempArticleLangData = {
  ko: { title: '', excerpt: '', content: '' },
  en: { title: '', excerpt: '', content: '' },
  zh: { title: '', excerpt: '', content: '' },
  ja: { title: '', excerpt: '', content: '' }
};

export function initAdminApp() {
  setupNavigationTabs();
  setupArticleStatusFilters();
  updateTopCounters();
  renderArticlesTable();
  renderCategoriesTable();
  renderTagsChips();
  renderCommunityTable();
  setupCommunityAdmin();
  setupArticleEditor();
  setupCategoryForm();
  setupTagForm();
  setupGeminiSettings();
  setupSeoDiagnosticsModal();
  setupResetDemo();
  setupPromotionsModule();
}

function updateTopCounters() {
  const articles = getArticles();
  const categories = getCategories();
  const tags = getTags();
  const communityPosts = getCommunityPosts();
  const promoSettings = getPromoSettings();

  const publishedArticles = articles.filter(a => (a.status || 'published') === 'published');
  const draftArticles = articles.filter(a => a.status === 'draft');

  const elArt = document.getElementById('stat-articles-count');
  const elPublished = document.getElementById('stat-published-count');
  const elDrafts = document.getElementById('stat-drafts-count');
  const elCat = document.getElementById('stat-categories-count');
  const elTag = document.getElementById('stat-tags-count');
  const elComm = document.getElementById('stat-community-count');
  const elPromo = document.getElementById('stat-promo-status');

  if (elArt) elArt.textContent = articles.length;
  if (elPublished) elPublished.textContent = publishedArticles.length;
  if (elDrafts) elDrafts.textContent = draftArticles.length;
  if (elCat) elCat.textContent = categories.length;
  if (elTag) elTag.textContent = tags.length;
  if (elComm) elComm.textContent = communityPosts.length;
  if (elPromo) {
    const topText = promoSettings.topBanner.enabled ? '상단ON' : '상단OFF';
    const couponText = promoSettings.eventCoupon.enabled ? '쿠폰ON' : '쿠폰OFF';
    elPromo.textContent = `${topText} · ${couponText}`;
    elPromo.style.color = (promoSettings.topBanner.enabled || promoSettings.eventCoupon.enabled) ? '#F472B6' : '#94A3B8';
  }

  const countFilterAll = document.getElementById('count-filter-all');
  const countFilterPub = document.getElementById('count-filter-published');
  const countFilterDraft = document.getElementById('count-filter-draft');

  if (countFilterAll) countFilterAll.textContent = articles.length;
  if (countFilterPub) countFilterPub.textContent = publishedArticles.length;
  if (countFilterDraft) countFilterDraft.textContent = draftArticles.length;
}

function setupArticleStatusFilters() {
  document.querySelectorAll('.status-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentArticleStatusFilter = btn.dataset.statusFilter || 'all';
      renderArticlesTable();
    });
  });
}

function setupNavigationTabs() {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`panel-${tab}`);
      if (panel) panel.classList.add('active');
      activeTab = tab;

      updateTopCounters();
      if (tab === 'articles') renderArticlesTable();
      if (tab === 'categories') renderCategoriesTable();
      if (tab === 'tags') renderTagsChips();
      if (tab === 'community') renderCommunityTable();
      if (tab === 'promotions') renderPromotionsPanel();
    });
  });
}

function setupResetDemo() {
  const resetBtn = document.getElementById('btn-reset-demo');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('기본 데모 데이터(글, 카테고리, 태그, 커뮤니티 게시글, 배너/쿠폰 설정)를 초기 상태로 복원하시겠습니까?')) {
        resetDemoData();
        updateTopCounters();
        renderArticlesTable();
        renderCategoriesTable();
        renderTagsChips();
        renderCommunityTable();
        renderPromotionsPanel();
        showToast({ title: "초기화 완료", message: "기본 데모 콘텐츠와 배너/쿠폰 설정이 복구되었습니다." });
      }
    });
  }
}

/* =========================================================
   1. 에디토리얼 글 목록 & 새 글 작성 (Articles CMS)
========================================================= */
function renderArticlesTable() {
  const tbody = document.getElementById('articles-table-body');
  if (!tbody) return;

  const allArticles = getArticles();
  const categories = getCategories();

  let filteredArticles = allArticles;
  if (currentArticleStatusFilter === 'published') {
    filteredArticles = allArticles.filter(a => (a.status || 'published') === 'published');
  } else if (currentArticleStatusFilter === 'draft') {
    filteredArticles = allArticles.filter(a => a.status === 'draft');
  }

  if (filteredArticles.length === 0) {
    const filterMsg = currentArticleStatusFilter === 'published'
      ? '발행된 글이 없습니다.'
      : currentArticleStatusFilter === 'draft'
      ? '임시 저장된 글이 없습니다.'
      : '등록된 글이 없습니다. [새 글 작성하기]를 눌러 첫 번째 에디토리얼을 작성해보세요.';
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 32px; color: #94A3B8;">
          ${filterMsg}
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredArticles.map(art => {
    const titleEn = art.title.en || art.title.ko || 'Untitled';
    const catObj = categories.find(c => c.id === art.category);
    const catName = catObj?.name?.en || art.category;
    const articlePageUrl = `/article.html?slug=${encodeURIComponent(art.slug)}`;
    const isDraft = art.status === 'draft';

    const statusBadge = isDraft 
      ? `<span class="badge-status-draft">🟡 임시 저장</span>`
      : `<span class="badge-status-published">🟢 발행됨</span>`;

    const toggleStatusBtn = isDraft
      ? `<button class="btn-action-icon btn-toggle-status" data-id="${art.id}" data-target-status="published" title="사이트에 즉시 공개 발행" style="color: #10B981; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1); margin-right: 4px;">
           🚀 즉시 발행
         </button>`
      : `<button class="btn-action-icon btn-toggle-status" data-id="${art.id}" data-target-status="draft" title="발행 취소 및 임시 저장(비공개)으로 전환" style="color: #FBBF24; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); margin-right: 4px;">
           🔒 비공개 전환
         </button>`;

    return `
      <tr style="${isDraft ? 'background: rgba(245, 158, 11, 0.03);' : ''}">
        <td>
          <img src="${art.coverImage}" alt="${titleEn}" style="width: 56px; height: 42px; object-fit: cover; border-radius: var(--radius-xs); border: 1px solid #334155;" />
        </td>
        <td>
          <div style="font-weight: 600; color: #FFFFFF; font-size: 0.92rem;">
            ${escapeHtml(titleEn)}
            ${isDraft ? '<span style="font-size: 0.72rem; color: #FCD34D; font-weight: 600; margin-left: 6px;">[비공개]</span>' : ''}
          </div>
          <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 2px;">
            ${art.featured ? '<span style="color: #F59E0B; font-weight: 700; margin-right: 6px;">[⭐ 메인추천]</span>' : ''}
            ${art.author?.name || 'Editor'} • ${art.readTime}분 분량
          </div>
        </td>
        <td>
          ${statusBadge}
        </td>
        <td>
          <a href="${articlePageUrl}" target="_blank" style="color: #38BDF8; font-family: monospace; font-size: 0.8rem; text-decoration: none;">
            ${escapeHtml(art.slug)} ↗
          </a>
        </td>
        <td>
          <span style="background: rgba(56, 189, 248, 0.15); color: #38BDF8; padding: 3px 8px; border-radius: var(--radius-xs); font-size: 0.78rem; font-weight: 600;">
            ${escapeHtml(catName)}
          </span>
        </td>
        <td style="color: #CBD5E1;">${(art.views || 0).toLocaleString()}회</td>
        <td style="color: #94A3B8; font-size: 0.82rem;">${art.publishDate || '2026-10-15'}</td>
        <td style="text-align: right; white-space: nowrap;">
          ${toggleStatusBtn}
          <a href="${articlePageUrl}" target="_blank" class="btn-action-icon" style="text-decoration: none; display: inline-block; margin-right: 4px;" title="개별 글 페이지 열람">
            보기
          </a>
          <button class="btn-action-icon btn-edit-article" data-id="${art.id}" style="margin-right: 4px;" title="글 수정">
            수정
          </button>
          <button class="btn-action-icon btn-delete-article" data-id="${art.id}" style="color: #F87171;" title="글 삭제">
            삭제
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach status toggle action
  tbody.querySelectorAll('.btn-toggle-status').forEach(btn => {
    btn.addEventListener('click', () => {
      const artId = btn.dataset.id;
      const targetStatus = btn.dataset.targetStatus;
      const updated = toggleArticleStatus(artId, targetStatus);
      if (updated) {
        updateTopCounters();
        renderArticlesTable();
        const artTitle = updated.title?.en || updated.title?.ko || '글';
        if (targetStatus === 'draft') {
          showToast({
            title: "🔒 임시 저장(비공개) 전환 완료",
            message: `[${artTitle}]이 임시 저장 상태로 변경되었습니다. 이제 독자 화면에서 가려집니다.`,
            icon: "🔒",
            duration: 4000
          });
        } else {
          showToast({
            title: "🚀 사이트 즉시 발행 완료",
            message: `[${artTitle}]이 정상 발행되어 독자들에게 공개되었습니다.`,
            icon: "🚀",
            duration: 4000
          });
        }
      }
    });
  });

  // Attach edit actions
  tbody.querySelectorAll('.btn-edit-article').forEach(btn => {
    btn.addEventListener('click', () => {
      const artId = btn.dataset.id;
      openArticleModal(artId);
    });
  });

  tbody.querySelectorAll('.btn-delete-article').forEach(btn => {
    btn.addEventListener('click', () => {
      const artId = btn.dataset.id;
      if (confirm('이 글을 삭제하시겠습니까? 삭제된 글은 복원할 수 없습니다.')) {
        deleteArticle(artId);
        updateTopCounters();
        renderArticlesTable();
        showToast({ title: "글 삭제 완료", message: "게시글이 성공적으로 삭제되었습니다." });
      }
    });
  });
}

function setupArticleEditor() {
  const modal = document.getElementById('modal-article-backdrop');
  const openBtn = document.getElementById('btn-open-article-modal');
  const closeBtn = document.getElementById('btn-close-article-modal');
  const cancelBtn = document.getElementById('btn-cancel-article-modal');
  const form = document.getElementById('form-article-editor');
  const autoSlugBtn = document.getElementById('btn-auto-slug');
  const presetCovers = document.getElementById('editor-preset-covers');
  const translateBtn = document.getElementById('btn-run-translation');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openArticleModal(null);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeArticleModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeArticleModal);

  // Save as Draft quick button handler
  const saveAsDraftBtn = document.getElementById('btn-save-as-draft');
  if (saveAsDraftBtn) {
    saveAsDraftBtn.addEventListener('click', () => {
      const statusSelect = document.getElementById('editor-status');
      if (statusSelect) statusSelect.value = 'draft';
      if (form.requestSubmit) {
        form.requestSubmit();
      } else {
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    });
  }

  // Auto slug generator from English title
  if (autoSlugBtn) {
    autoSlugBtn.addEventListener('click', () => {
      saveCurrentEditorLangFields();
      const titleEn = tempArticleLangData.en.title || tempArticleLangData.ko.title;
      if (titleEn) {
        document.getElementById('editor-slug').value = generateSlug(titleEn);
      }
    });
  }

  // Preset cover picker
  if (presetCovers) {
    presetCovers.addEventListener('change', (e) => {
      if (e.target.value) {
        document.getElementById('editor-cover').value = e.target.value;
        uploadedArticleImages.forEach(img => {
          img.isCover = (img.url === e.target.value);
        });
        renderR2Gallery();
        if (currentEditorLang === 'preview') {
          renderLivePreview(currentPreviewLang);
        }
      }
    });
  }

  // Cover input manual change sync
  const coverInput = document.getElementById('editor-cover');
  if (coverInput) {
    coverInput.addEventListener('input', () => {
      const val = coverInput.value.trim();
      uploadedArticleImages.forEach(img => {
        img.isCover = (img.url === val);
      });
      renderR2Gallery();
      if (currentEditorLang === 'preview') {
        renderLivePreview(currentPreviewLang);
      }
    });
  }

  // Initialize Cloudflare R2 Uploader and Gallery
  setupR2Uploader();

  // Quick Korean sample fill helper
  const fillSampleBtn = document.getElementById('btn-fill-sample-ko');
  if (fillSampleBtn) {
    fillSampleBtn.addEventListener('click', () => {
      tempArticleLangData.ko = {
        title: "2026 올리브영 1위 선크림: 라운드랩 자작나무 수분 선크림 분석",
        excerpt: "백탁 없는 가벼운 로션 제형과 인제 자작나무 수액의 깊은 보습력을 갖춘 한국 1위 선크림의 피부과 테스트 결과 및 올리브영 글로벌 직구 팁",
        content: `### 1. 왜 올리브영 1위 선크림인가?

한국에서는 선크림을 단순한 여름용 화장품이 아닌 매일 바르는 스킨케어의 마지막 단계로 취급합니다. 라운드랩 자작나무 수분 선크림은 로션처럼 가볍게 스며들어 화장이 밀리지 않습니다.

### 2. 핵심 유효 성분 및 효능
• 인제 자작나무 수액: 피부 속 깊은 수분 공급 및 쿨링 효과
• 비타 히알루론산: 건조한 환경에서도 24시간 촉촉함 유지
• 논코메도제닉 테스트 완료: 트러블 및 민감성 피부도 안심 사용

### 3. 올리브영 글로벌 직구 팁
올리브영 글로벌 몰에서 주문 시 결제창에서 프로모 코드 **GLOW10**을 입력하면 추가 10% 할인을 받을 수 있습니다.`
      };

      if (currentEditorLang === 'ko') {
        loadCurrentEditorLangFields();
      }
      showToast({ title: "예시 데이터 입력 완료", message: "한국어 원문이 채워졌습니다. 이제 '자동 번역 실행' 버튼을 눌러보세요!" });
    });
  }

  // Engine switch buttons in translation banner
  document.querySelectorAll('[data-engine-choice]').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosen = btn.dataset.engineChoice;
      setPreferredEngine(chosen);
      updateEngineSwitcherUI(chosen);
      showToast({
        title: chosen === 'gemini' ? "Gemini AI 번역 엔진 선택" : "기본 구글 번역 엔진 선택",
        message: chosen === 'gemini' 
          ? "이제 새 글 작성 시 Gemini AI가 우선 적용됩니다." 
          : "별도 키 없이 무제한으로 기본 구글 번역이 적용됩니다.",
        icon: chosen === 'gemini' ? "🤖" : "🌐"
      });
    });
  });

  // AI Translation button click
  if (translateBtn) {
    translateBtn.addEventListener('click', handleRunAiTranslation);
  }

  // Subtabs switching (KO, EN, ZH, JA, preview)
  document.querySelectorAll('[data-editor-lang]').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      saveCurrentEditorLangFields();
      const targetLang = tabBtn.dataset.editorLang;

      document.querySelectorAll('[data-editor-lang]').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      currentEditorLang = targetLang;

      const fieldsWrap = document.getElementById('editor-text-fields-wrap');
      const previewContainer = document.getElementById('editor-preview-container');
      const translationBanner = document.getElementById('translation-banner-box');

      if (targetLang === 'preview') {
        // Show live preview
        if (fieldsWrap) fieldsWrap.style.display = 'none';
        if (translationBanner) translationBanner.style.display = 'none';
        if (previewContainer) previewContainer.style.display = 'flex';
        renderLivePreview(currentPreviewLang);
      } else {
        // Show text editing fields
        if (fieldsWrap) fieldsWrap.style.display = 'block';
        if (previewContainer) previewContainer.style.display = 'none';
        if (translationBanner) {
          // Show translation action box primarily when in Korean authoring mode
          translationBanner.style.display = targetLang === 'ko' ? 'flex' : 'none';
        }
        loadCurrentEditorLangFields();
      }
    });
  });

  // Preview language switcher buttons (inside preview tab)
  document.querySelectorAll('[data-preview-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-preview-lang]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPreviewLang = btn.dataset.previewLang;
      renderLivePreview(currentPreviewLang);
    });
  });

  // Form submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      saveCurrentEditorLangFields();

      let slug = document.getElementById('editor-slug').value.trim();
      const category = document.getElementById('editor-category').value;
      const skinType = document.getElementById('editor-skintype').value;
      const readTime = parseInt(document.getElementById('editor-readtime').value, 10) || 5;
      const featured = document.getElementById('editor-featured').value === 'true';
      const status = document.getElementById('editor-status')?.value || 'published';
      const coverImage = document.getElementById('editor-cover').value.trim();

      // Ensure English title exists; if user only typed Korean, translate automatically!
      if (!tempArticleLangData.en.title && tempArticleLangData.ko.title) {
        showToast({ title: "자동 번역 진행", message: "영문 번역본을 자동으로 완성하여 저장합니다..." });
        try {
          const res = await translateFullArticle({
            titleKo: tempArticleLangData.ko.title,
            excerptKo: tempArticleLangData.ko.excerpt,
            contentKo: tempArticleLangData.ko.content
          });
          tempArticleLangData.en = res.en;
          tempArticleLangData.zh = res.zh;
          tempArticleLangData.ja = res.ja;
          if (!slug) slug = res.slug;
        } catch (err) {
          console.error("Auto translation on submit failed:", err);
          tempArticleLangData.en.title = tempArticleLangData.ko.title;
        }
      }

      if (!slug) {
        slug = generateSlug(tempArticleLangData.en.title || tempArticleLangData.ko.title || `article-${Date.now()}`);
      }

      const isNew = !editingArticle;
      const articleId = isNew ? slug : editingArticle.id;

      const articlePayload = {
        id: articleId,
        slug: slug,
        status: status,
        featured: featured,
        category: category,
        skinType: skinType,
        coverImage: coverImage || '/assets/images/glass-skin.jpg',
        readTime: readTime,
        views: editingArticle ? editingArticle.views : 1,
        publishDate: editingArticle ? editingArticle.publishDate : new Date().toISOString().split('T')[0],
        author: editingArticle ? editingArticle.author : {
          name: "Seoul Beauty Desk",
          role: "Senior Clinical Editor",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
        },
        title: {
          ko: tempArticleLangData.ko.title,
          en: tempArticleLangData.en.title || tempArticleLangData.ko.title,
          zh: tempArticleLangData.zh.title || tempArticleLangData.en.title || tempArticleLangData.ko.title,
          ja: tempArticleLangData.ja.title || tempArticleLangData.en.title || tempArticleLangData.ko.title
        },
        excerpt: {
          ko: tempArticleLangData.ko.excerpt,
          en: tempArticleLangData.en.excerpt || tempArticleLangData.ko.excerpt,
          zh: tempArticleLangData.zh.excerpt || tempArticleLangData.en.excerpt || tempArticleLangData.ko.excerpt,
          ja: tempArticleLangData.ja.excerpt || tempArticleLangData.en.excerpt || tempArticleLangData.ko.excerpt
        },
        content: {
          ko: tempArticleLangData.ko.content,
          en: tempArticleLangData.en.content || tempArticleLangData.ko.content,
          zh: tempArticleLangData.zh.content || tempArticleLangData.en.content || tempArticleLangData.ko.content,
          ja: tempArticleLangData.ja.content || tempArticleLangData.en.content || tempArticleLangData.ko.content
        },
        products: editingArticle?.products || [
          "round-lab-birch-sunscreen",
          "anua-heartleaf-toner",
          "torriden-dive-in-serum"
        ]
      };

      saveArticle(articlePayload);
      closeArticleModal();
      updateTopCounters();
      renderArticlesTable();

      const isDraft = status === 'draft';
      showToast({
        title: isDraft 
          ? (isNew ? "임시 저장 완료" : "임시 저장(비공개)으로 수정 완료")
          : (isNew ? "새 글 발행 완료" : "글 수정 및 발행 완료"),
        message: isDraft 
          ? `[${articlePayload.title.en || articlePayload.title.ko}]이 비공개(임시 저장)로 저장되었습니다. 독자 화면에서 가려집니다.`
          : `[${articlePayload.title.en || articlePayload.title.ko}] 글이 정상 발행되었습니다. URL: /article.html?slug=${articlePayload.slug}`,
        icon: isDraft ? "📁" : "🚀"
      });
    });
  }
}

async function handleRunAiTranslation() {
  saveCurrentEditorLangFields();
  const titleKo = tempArticleLangData.ko.title;
  const excerptKo = tempArticleLangData.ko.excerpt;
  const contentKo = tempArticleLangData.ko.content;

  if (!titleKo || !titleKo.trim()) {
    alert('한국어 글 제목을 먼저 입력해주세요.');
    document.getElementById('editor-title')?.focus();
    return;
  }

  const translateBtn = document.getElementById('btn-run-translation');
  const icon = document.getElementById('translate-btn-icon');
  const label = document.getElementById('translate-btn-label');
  const statusMsg = document.getElementById('translation-status-msg');

  const chosenEngine = getPreferredEngine();
  const isGemini = chosenEngine === 'gemini';
  const activeModel = getActiveGeminiModel() || 'gemini-3.8-flash';

  // Set loading state
  if (translateBtn) translateBtn.disabled = true;
  if (icon) icon.innerHTML = '<span class="translate-spinner"></span>';
  if (label) {
    label.textContent = isGemini ? 'Gemini AI 번역 진행 중...' : '기본 구글 번역 진행 중...';
  }

  if (statusMsg) {
    statusMsg.style.display = 'block';
    if (isGemini) {
      statusMsg.style.background = 'rgba(139, 92, 246, 0.15)';
      statusMsg.style.border = '1px solid rgba(139, 92, 246, 0.3)';
      statusMsg.style.color = '#C4B5FD';
      statusMsg.innerHTML = `🤖 <strong>Google Gemini (${activeModel}) 번역 실행 중:</strong> K-뷰티 매거진 스타일에 맞추어 고품질 영문, 중문, 일문 번역을 생성하고 있습니다... <br><span style="font-size: 0.78rem; color: #94A3B8;">(Gemini 응답 지연/오류 시 기본 구글 번역으로 자동 안전 전환됩니다)</span>`;
    } else {
      statusMsg.style.background = 'rgba(56, 189, 248, 0.15)';
      statusMsg.style.border = '1px solid rgba(56, 189, 248, 0.3)';
      statusMsg.style.color = '#7DD3FC';
      statusMsg.innerHTML = `🌐 <strong>기본 구글 번역 실행 중:</strong> Google Translate로 한국어 원문을 영문, 중문, 일문으로 빠르게 번역하고 있습니다...`;
    }
  }

  try {
    const result = await translateFullArticle({ 
      titleKo, 
      excerptKo, 
      contentKo,
      engine: chosenEngine 
    });

    tempArticleLangData.en = result.en;
    tempArticleLangData.zh = result.zh;
    tempArticleLangData.ja = result.ja;

    // Fill URL slug if empty or default
    const slugInput = document.getElementById('editor-slug');
    if (slugInput && (!slugInput.value.trim() || slugInput.value.startsWith('article-'))) {
      slugInput.value = result.slug;
    }

    if (statusMsg) {
      if (result.isFallback) {
        statusMsg.style.background = 'rgba(245, 158, 11, 0.18)';
        statusMsg.style.border = '1px solid rgba(245, 158, 11, 0.4)';
        statusMsg.style.color = '#FDE68A';
        statusMsg.innerHTML = `
          ⚡ <strong>기본 구글 번역으로 자동 안전 전환 완료!</strong> (안내: ${result.fallbackReason || 'Gemini 응답 지연'})<br>
          영문, 중문, 일문 3개 언어가 안전하게 번역되었습니다.
          <span style="margin-left: 8px;">
            <a href="#" id="link-goto-preview" style="color: #38BDF8; font-weight: 700; text-decoration: underline;">[👁️ 독자 화면 미리보기로 확인]</a>
          </span>
        `;
        showToast({
          title: "기본 구글 번역으로 자동 전환 완료",
          message: "Gemini API 연동 지연으로 기본 구글 번역으로 즉시 전환되어 3개 언어 번역을 마쳤습니다.",
          icon: "🌐",
          duration: 4500
        });
      } else {
        statusMsg.style.background = 'rgba(16, 185, 129, 0.15)';
        statusMsg.style.border = '1px solid rgba(16, 185, 129, 0.3)';
        statusMsg.style.color = '#6EE7B7';
        statusMsg.innerHTML = `
          ✅ <strong>[${result.engine || 'AI'}] 번역 완료!</strong> 영문, 중문, 일문 3개 언어로 완벽히 번역되었습니다.
          <span style="margin-left: 8px;">
            <a href="#" id="link-goto-preview" style="color: #38BDF8; font-weight: 700; text-decoration: underline;">[👁️ 독자 화면 미리보기로 확인]</a>
          </span>
        `;
        showToast({
          title: `${result.engine || '번역'} 완료`,
          message: "영문, 중문, 일문 번역본과 영문 URL 슬러그가 생성되었습니다. [미리보기] 탭에서 확인해보세요!",
          icon: isGemini ? "✨" : "🌐"
        });
      }

      document.getElementById('link-goto-preview')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('[data-editor-lang="preview"]')?.click();
      });
    }
  } catch (err) {
    console.error("Translation error:", err);
    if (statusMsg) {
      statusMsg.style.background = 'rgba(239, 68, 68, 0.15)';
      statusMsg.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      statusMsg.style.color = '#FCA5A5';
      statusMsg.innerHTML = `⚠️ 번역 중 일시적 오류가 발생했습니다: ${err.message}<br><span style="font-size: 0.8rem; color: #E2E8F0;">상단의 [🌐 기본 구글 번역] 버튼을 누르고 다시 시도하시면 API 키 없이 즉시 번역할 수 있습니다.</span>`;
    }
  } finally {
    if (translateBtn) translateBtn.disabled = false;
    if (icon) icon.innerHTML = isGemini ? '✨' : '🌐';
    if (label) {
      label.textContent = isGemini ? 'Gemini AI 자동 번역 실행' : '기본 구글 번역 실행';
    }
  }
}

function setupGeminiSettings() {
  const openBtn = document.getElementById('btn-open-gemini-settings');
  const linkOpen = document.getElementById('link-open-gemini-settings');
  const modal = document.getElementById('modal-gemini-backdrop');
  const closeBtn = document.getElementById('btn-close-gemini-modal');
  const cancelBtn = document.getElementById('btn-cancel-gemini-modal');
  const saveBtn = document.getElementById('btn-save-gemini-key');
  const testBtn = document.getElementById('btn-test-gemini-key');
  const keyInput = document.getElementById('gemini-key-input');
  const toggleVisBtn = document.getElementById('btn-toggle-key-visibility');
  const testResult = document.getElementById('gemini-test-result');

  const radioGemini = document.getElementById('radio-choice-gemini');
  const radioGoogle = document.getElementById('radio-choice-google');
  const cardGemini = document.getElementById('card-choice-gemini');
  const cardGoogle = document.getElementById('card-choice-google');
  const chkAutoFallback = document.getElementById('chk-auto-fallback');

  function openModal(e) {
    if (e) e.preventDefault();
    if (keyInput) keyInput.value = getGeminiApiKey();
    if (testResult) testResult.style.display = 'none';

    const preferred = getPreferredEngine();
    if (radioGemini && radioGoogle) {
      if (preferred === 'gemini') {
        radioGemini.checked = true;
        cardGemini?.classList.add('selected');
        cardGoogle?.classList.remove('selected');
      } else {
        radioGoogle.checked = true;
        cardGoogle?.classList.add('selected');
        cardGemini?.classList.remove('selected');
      }
    }
    if (chkAutoFallback) {
      chkAutoFallback.checked = isAutoFallbackEnabled();
    }

    if (modal) modal.classList.add('open');
  }

  function closeModal() {
    if (modal) modal.classList.remove('open');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (linkOpen) linkOpen.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  cardGemini?.addEventListener('click', () => {
    if (radioGemini) radioGemini.checked = true;
    cardGemini.classList.add('selected');
    cardGoogle?.classList.remove('selected');
  });

  cardGoogle?.addEventListener('click', () => {
    if (radioGoogle) radioGoogle.checked = true;
    cardGoogle.classList.add('selected');
    cardGemini?.classList.remove('selected');
  });

  if (toggleVisBtn && keyInput) {
    toggleVisBtn.addEventListener('click', () => {
      keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
    });
  }

  if (testBtn && keyInput && testResult) {
    testBtn.addEventListener('click', async () => {
      const val = keyInput.value.trim();
      testResult.style.display = 'block';
      testResult.style.background = 'rgba(56, 189, 248, 0.15)';
      testResult.style.color = '#7DD3FC';
      const currentModel = getActiveGeminiModel() || 'gemini-3.8-flash';
      testResult.innerHTML = `🧪 Google Gemini (${currentModel}) 연결 확인 중...`;
      testBtn.disabled = true;

      const res = await testGeminiApiKey(val);
      testBtn.disabled = false;

      if (res.success) {
        testResult.style.background = 'rgba(16, 185, 129, 0.2)';
        testResult.style.color = '#6EE7B7';
        testResult.innerHTML = `✅ <strong>연결 성공!</strong> ${res.message || `Google Gemini (${res.model || currentModel}) 모델이 정상 작동합니다.`}`;
      } else {
        testResult.style.background = 'rgba(239, 68, 68, 0.2)';
        testResult.style.color = '#FCA5A5';
        testResult.innerHTML = `❌ <strong>연결 실패:</strong> ${res.error}`;
      }
    });
  }

  if (saveBtn && keyInput) {
    saveBtn.addEventListener('click', () => {
      const val = keyInput.value.trim();
      const chosenEngine = document.querySelector('input[name="modal-engine-radio"]:checked')?.value || 'gemini';
      const fallbackEnabled = chkAutoFallback ? chkAutoFallback.checked : true;

      setGeminiApiKey(val);
      setPreferredEngine(chosenEngine);
      setAutoFallbackEnabled(fallbackEnabled);

      updateEngineSwitcherUI(chosenEngine);
      updateGeminiStatusBadge();
      closeModal();

      const engineName = chosenEngine === 'gemini' 
        ? `Google Gemini (${getActiveGeminiModel() || 'gemini-3.8-flash'})` 
        : '기본 구글 번역 (Google Translate)';

      showToast({
        title: "번역 엔진 설정 저장 완료",
        message: `선택된 엔진: ${engineName} | 자동 대체: ${fallbackEnabled ? '활성화' : '비활성화'}`,
        icon: chosenEngine === 'gemini' ? "🤖" : "🌐"
      });
    });
  }

  updateGeminiStatusBadge();
}

function setupSeoDiagnosticsModal() {
  const openBtn = document.getElementById('btn-open-seo-settings');
  const modal = document.getElementById('modal-seo-backdrop');
  const closeBtn = document.getElementById('btn-close-seo-modal');
  const closeFooterBtn = document.getElementById('btn-close-seo-modal-footer');
  const contentArea = document.getElementById('admin-seo-modal-content');
  const copyBtn = document.getElementById('btn-copy-seo-jsonld');

  if (!openBtn || !modal) return;

  function renderSeoDiagnostics() {
    if (!contentArea) return;
    const origin = window.location.origin;
    const canonicalUrl = origin + '/';

    const schemaData = generateStructuredData({
      url: canonicalUrl,
      title: "Seoul Glow Edit | Curated K-Beauty & Olive Young Global Guide",
      description: "Curated Korean skincare editorial, routine guides, and Olive Young Global shopping recommendations.",
      lang: "en",
      products: getProducts()
    });

    const jsonLdString = JSON.stringify(schemaData, null, 2);

    contentArea.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- 상단 핵심 지표 그리드 -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px;">
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">CANONICAL DOMAIN</div>
            <div style="font-size: 0.92rem; color: #38BDF8; font-weight: 700; margin-top: 4px; word-break: break-all;">${canonicalUrl}</div>
          </div>
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">ROBOTS META</div>
            <div style="font-size: 0.92rem; color: #34D399; font-weight: 700; margin-top: 4px;">index, follow (사용자)</div>
          </div>
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">GEO REGION</div>
            <div style="font-size: 0.92rem; color: #F472B6; font-weight: 700; margin-top: 4px;">KR-11 (Seoul, Global)</div>
          </div>
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">SCHEMA TYPES</div>
            <div style="font-size: 0.92rem; color: #FBBF24; font-weight: 700; margin-top: 4px;">WebSite, Org, Product</div>
          </div>
        </div>

        <!-- Google SERP 검색 결과 미리보기 -->
        <div style="background: #0F172A; border: 1px solid #334155; padding: 16px; border-radius: 8px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #E2E8F0; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>🔍 Google 검색 결과(SERP Snippet) 시뮬레이션</span>
          </div>
          <div style="background: #FFFFFF; color: #202124; padding: 16px; border-radius: 8px; font-family: Roboto, -apple-system, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 1.1rem;">🌸</span>
              <div style="font-size: 0.82rem; color: #202124; line-height: 1.2;">
                <div style="font-weight: 600;">Seoul Glow Edit</div>
                <div style="color: #4d5156; font-size: 0.75rem;">${canonicalUrl}</div>
              </div>
            </div>
            <div style="color: #1a0dab; font-size: 1.12rem; font-weight: 500; cursor: pointer; line-height: 1.3; margin-bottom: 4px;">
              Seoul Glow Edit | Curated K-Beauty & Olive Young Global Guide
            </div>
            <div style="color: #4d5156; font-size: 0.84rem; line-height: 1.4;">
              Independent Seoul beauty intelligence, clinical Korean skincare routines, glass skin secrets, and Olive Young Global holy grail recommendations.
            </div>
          </div>
        </div>

        <!-- Hreflang 및 지역 태그 -->
        <div style="background: #0F172A; border: 1px solid #334155; padding: 16px; border-radius: 8px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #E2E8F0; margin-bottom: 8px;">
            🌐 Hreflang 다국어 타겟팅 & GEO 메타 태그
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; font-size: 0.82rem; color: #94A3B8;">
            <div>
              <div style="color: #F8FAFC; font-weight: 600; margin-bottom: 4px;">Hreflang 링크 설정</div>
              <div>• <code>en</code>: ${canonicalUrl}?hl=en</div>
              <div>• <code>zh</code>: ${canonicalUrl}?hl=zh</div>
              <div>• <code>ja</code>: ${canonicalUrl}?hl=ja</div>
              <div>• <code>x-default</code>: ${canonicalUrl}?hl=en</div>
            </div>
            <div>
              <div style="color: #F8FAFC; font-weight: 600; margin-bottom: 4px;">Geo 지역 타겟 태그</div>
              <div>• <code>geo.region</code>: KR-11 (Seoul)</div>
              <div>• <code>geo.placename</code>: Seoul, South Korea</div>
              <div>• <code>target market</code>: Global (US, Japan, Greater China)</div>
            </div>
          </div>
        </div>

        <!-- 실시간 Schema.org JSON-LD -->
        <div style="background: #0F172A; border: 1px solid #334155; padding: 16px; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #E2E8F0;">
              📜 실시간 Schema.org JSON-LD 구조화 데이터
            </div>
            <span style="font-size: 0.72rem; color: #34D399; font-weight: 600;">✓ Schema.org 표준 준수</span>
          </div>
          <pre id="admin-seo-jsonld-code" style="background: #020617; color: #38BDF8; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 0.76rem; max-height: 220px; overflow-y: auto; white-space: pre-wrap; word-break: break-all; border: 1px solid #1E293B;">${jsonLdString}</pre>
        </div>
      </div>
    `;
  }

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    renderSeoDiagnostics();
    modal.classList.add('open');
  });

  const closeModal = () => modal.classList.remove('open');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('admin-seo-jsonld-code');
      if (codeEl) {
        navigator.clipboard.writeText(codeEl.textContent).then(() => {
          showToast({
            title: "복사 완료",
            message: "Schema.org JSON-LD 구조화 데이터가 클립보드에 복사되었습니다.",
            icon: "📋"
          });
        });
      }
    });
  }
}

function updateEngineSwitcherUI(chosenEngine) {
  const engine = chosenEngine || getPreferredEngine();
  const geminiBtn = document.getElementById('btn-engine-gemini');
  const googleBtn = document.getElementById('btn-engine-google');
  const bannerDesc = document.getElementById('translation-banner-desc');
  const translateLabel = document.getElementById('translate-btn-label');
  const activeModel = getActiveGeminiModel() || 'gemini-3.8-flash';
  const autoFallback = isAutoFallbackEnabled();

  if (geminiBtn && googleBtn) {
    if (engine === 'gemini') {
      geminiBtn.classList.add('active');
      googleBtn.classList.remove('active');
      if (bannerDesc) {
        bannerDesc.innerHTML = `Google AI Studio의 최신 <strong>${activeModel}</strong> AI가 K-뷰티 매거진 스타일에 맞추어 고품질 영문·중문·일문 및 URL 슬러그를 자동 생성합니다. ${autoFallback ? '<span style="color:#6EE7B7;">(API 오류/지연 시 기본 구글 번역으로 자동 안전 전환)</span>' : ''}`;
      }
      if (translateLabel) translateLabel.textContent = 'Gemini AI 자동 번역 실행';
    } else {
      googleBtn.classList.add('active');
      geminiBtn.classList.remove('active');
      if (bannerDesc) {
        bannerDesc.innerHTML = `<strong>기본 구글 번역(Google Translate)</strong>을 사용하여 별도 키 없이 즉시 한국어 원문을 영문·중문·일문으로 빠르게 번역합니다.`;
      }
      if (translateLabel) translateLabel.textContent = '기본 구글 번역 실행';
    }
  }

  updateGeminiStatusBadge();
}

function updateGeminiStatusBadge() {
  const dot = document.getElementById('gemini-status-dot');
  const text = document.getElementById('gemini-status-text');
  const badge = document.getElementById('gemini-engine-badge');
  const isConfigured = hasGeminiApiKey();
  const activeModel = getActiveGeminiModel() || 'gemini-3.8-flash';
  const currentEngine = getPreferredEngine();

  if (currentEngine === 'google') {
    if (dot) dot.style.background = '#38BDF8';
    if (text) text.textContent = '🌐 기본 구글 번역 활성';
    if (badge) {
      badge.textContent = '기본 구글 번역 (키 불필요)';
      badge.style.background = 'rgba(56, 189, 248, 0.2)';
      badge.style.color = '#7DD3FC';
      badge.style.borderColor = 'rgba(56, 189, 248, 0.4)';
    }
  } else {
    if (dot) {
      dot.style.background = isConfigured ? '#10B981' : '#F59E0B';
    }
    if (text) {
      text.textContent = isConfigured ? `🟢 ${activeModel} 활성` : '🤖 Gemini 키 미설정';
    }
    if (badge) {
      if (isConfigured) {
        badge.textContent = `Google Gemini (${activeModel}) 연동됨`;
        badge.style.background = 'rgba(16, 185, 129, 0.2)';
        badge.style.color = '#6EE7B7';
        badge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      } else {
        badge.textContent = 'Google Gemini (키 미설정)';
        badge.style.background = 'rgba(139, 92, 246, 0.15)';
        badge.style.color = '#C4B5FD';
        badge.style.borderColor = 'rgba(139, 92, 246, 0.3)';
      }
    }
  }
}

function openArticleModal(articleId) {
  const modal = document.getElementById('modal-article-backdrop');
  const heading = document.getElementById('modal-article-title-heading');
  const catSelect = document.getElementById('editor-category');
  const statusMsg = document.getElementById('translation-status-msg');
  if (statusMsg) statusMsg.style.display = 'none';

  // Populate categories dropdown
  const categories = getCategories();
  catSelect.innerHTML = categories.map(c => `
    <option value="${c.id}">${c.name?.en || c.id}</option>
  `).join('');

  if (articleId) {
    const articles = getArticles();
    editingArticle = articles.find(a => a.id === articleId);
    heading.textContent = '에디토리얼 글 수정';
    document.getElementById('btn-save-article-label').textContent = '변경사항 저장';
  } else {
    editingArticle = null;
    heading.textContent = '새 에디토리얼 글 작성';
    document.getElementById('btn-save-article-label').textContent = '새 글 발행하기';
  }

  // Populate form fields
  if (editingArticle) {
    document.getElementById('editor-slug').value = editingArticle.slug || editingArticle.id;
    document.getElementById('editor-category').value = editingArticle.category || categories[0]?.id;
    document.getElementById('editor-skintype').value = editingArticle.skinType || 'all';
    document.getElementById('editor-readtime').value = editingArticle.readTime || 5;
    document.getElementById('editor-featured').value = editingArticle.featured ? 'true' : 'false';
    const statusSelect = document.getElementById('editor-status');
    if (statusSelect) statusSelect.value = editingArticle.status || 'published';
    document.getElementById('editor-cover').value = editingArticle.coverImage || '';

    tempArticleLangData = {
      ko: {
        title: editingArticle.title?.ko || editingArticle.title?.en || '',
        excerpt: editingArticle.excerpt?.ko || editingArticle.excerpt?.en || '',
        content: editingArticle.content?.ko || editingArticle.content?.en || ''
      },
      en: {
        title: editingArticle.title?.en || '',
        excerpt: editingArticle.excerpt?.en || '',
        content: editingArticle.content?.en || ''
      },
      zh: {
        title: editingArticle.title?.zh || '',
        excerpt: editingArticle.excerpt?.zh || '',
        content: editingArticle.content?.zh || ''
      },
      ja: {
        title: editingArticle.title?.ja || '',
        excerpt: editingArticle.excerpt?.ja || '',
        content: editingArticle.content?.ja || ''
      }
    };
  } else {
    document.getElementById('editor-slug').value = '';
    document.getElementById('editor-category').value = categories[0]?.id || 'glass-skin';
    document.getElementById('editor-skintype').value = 'all';
    document.getElementById('editor-readtime').value = 5;
    document.getElementById('editor-featured').value = 'false';
    const statusSelect = document.getElementById('editor-status');
    if (statusSelect) statusSelect.value = 'published';
    document.getElementById('editor-cover').value = '/assets/images/glass-skin.jpg';

    tempArticleLangData = {
      ko: { title: '', excerpt: '', content: '' },
      en: { title: '', excerpt: '', content: '' },
      zh: { title: '', excerpt: '', content: '' },
      ja: { title: '', excerpt: '', content: '' }
    };
  }

  // Reset to Korean authoring subtab
  currentEditorLang = 'ko';
  currentPreviewLang = 'en';

  document.querySelectorAll('[data-editor-lang]').forEach(b => {
    b.classList.toggle('active', b.dataset.editorLang === 'ko');
  });

  const fieldsWrap = document.getElementById('editor-text-fields-wrap');
  const previewContainer = document.getElementById('editor-preview-container');
  const translationBanner = document.getElementById('translation-banner-box');

  if (fieldsWrap) fieldsWrap.style.display = 'block';
  if (previewContainer) previewContainer.style.display = 'none';
  if (translationBanner) translationBanner.style.display = 'flex';

  loadCurrentEditorLangFields();
  updateEngineSwitcherUI();

  // Populate R2 images gallery
  uploadedArticleImages = [];
  if (editingArticle) {
    const existingUrls = new Set();
    if (editingArticle.coverImage) {
      existingUrls.add(editingArticle.coverImage);
      uploadedArticleImages.push({
        id: `cover_${editingArticle.id}`,
        url: editingArticle.coverImage,
        name: '대표 커버 사진',
        size: 0,
        isCover: true,
        storage: 'r2'
      });
    }

    // Extract all markdown images from all languages content
    ['ko', 'en', 'zh', 'ja'].forEach(l => {
      const cnt = editingArticle.content?.[l] || '';
      const matches = cnt.matchAll(/!\[(.*?)\]\((.*?)\)/g);
      for (const match of matches) {
        const alt = match[1];
        const url = match[2];
        if (url && !existingUrls.has(url)) {
          existingUrls.add(url);
          uploadedArticleImages.push({
            id: `body_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            url: url,
            name: alt || '본문 삽입 사진',
            size: 0,
            isCover: (url === editingArticle.coverImage),
            storage: 'r2'
          });
        }
      }
    });
  }
  renderR2Gallery();

  modal.classList.add('open');
}

function closeArticleModal() {
  const modal = document.getElementById('modal-article-backdrop');
  if (modal) modal.classList.remove('open');
  editingArticle = null;
  uploadedArticleImages = [];
  renderR2Gallery();
}

function saveCurrentEditorLangFields() {
  if (currentEditorLang === 'preview') return;

  const title = document.getElementById('editor-title')?.value || '';
  const excerpt = document.getElementById('editor-excerpt')?.value || '';
  const content = document.getElementById('editor-content')?.value || '';

  if (tempArticleLangData[currentEditorLang]) {
    tempArticleLangData[currentEditorLang].title = title;
    tempArticleLangData[currentEditorLang].excerpt = excerpt;
    tempArticleLangData[currentEditorLang].content = content;
  }
}

function loadCurrentEditorLangFields() {
  const indicator = document.getElementById('editor-lang-indicator');
  const hint = document.getElementById('editor-field-hint');

  const langNames = {
    ko: 'KO (한국어 원문 작성)',
    en: 'EN (영문 번역본)',
    zh: 'ZH (중문 번역본)',
    ja: 'JA (일문 번역본)'
  };

  const hints = {
    ko: '한국어 원문으로 내용을 편하게 작성하세요. 작성 후 아래 번역 버튼을 누르면 영문/중문/일문이 자동 생성됩니다.',
    en: '영문 번역본입니다. 독자들에게 노출될 제목, 요약, 본문을 자유롭게 수정하거나 다듬을 수 있습니다.',
    zh: '중문 번역본입니다. 필요에 따라 어휘나 문맥을 직접 수정할 수 있습니다.',
    ja: '일문 번역본입니다. 필요에 따라 어휘나 문맥을 직접 수정할 수 있습니다.'
  };

  if (indicator) indicator.textContent = langNames[currentEditorLang] || currentEditorLang.toUpperCase();
  if (hint) hint.textContent = hints[currentEditorLang] || '';

  const titleInput = document.getElementById('editor-title');
  const excerptInput = document.getElementById('editor-excerpt');
  const contentInput = document.getElementById('editor-content');

  const data = tempArticleLangData[currentEditorLang] || { title: '', excerpt: '', content: '' };
  if (titleInput) titleInput.value = data.title || '';
  if (excerptInput) excerptInput.value = data.excerpt || '';
  if (contentInput) contentInput.value = data.content || '';
}

function renderLivePreview(lang) {
  const categories = getCategories();
  const catId = document.getElementById('editor-category')?.value;
  const catObj = categories.find(c => c.id === catId);
  const catName = catObj?.name?.[lang] || catObj?.name?.en || catId || 'K-Beauty';

  const readTime = document.getElementById('editor-readtime')?.value || '5';
  const coverImage = document.getElementById('editor-cover')?.value || '/assets/images/glass-skin.jpg';
  const todayStr = new Date().toISOString().split('T')[0];

  const langData = tempArticleLangData[lang] || {};
  const fallbackData = tempArticleLangData.ko || {};

  const title = langData.title || fallbackData.title || '글 제목이 여기에 표시됩니다';
  const excerpt = langData.excerpt || fallbackData.excerpt || '글 요약문이 여기에 표시됩니다. K-뷰티 루틴과 성분 분석을 확인해보세요.';
  const content = langData.content || fallbackData.content || '### 본문 미리보기\n\n작성된 본문 내용이 마크다운으로 렌더링됩니다.';

  // 1. 아티클 카드 뷰 렌더링
  const prevCardImg = document.getElementById('prev-card-img');
  const prevCardCat = document.getElementById('prev-card-cat');
  const prevCardReadtime = document.getElementById('prev-card-readtime');
  const prevCardDate = document.getElementById('prev-card-date');
  const prevCardTitle = document.getElementById('prev-card-title');
  const prevCardExcerpt = document.getElementById('prev-card-excerpt');

  if (prevCardImg) prevCardImg.src = coverImage;
  if (prevCardCat) prevCardCat.textContent = catName;
  if (prevCardReadtime) prevCardReadtime.textContent = `${readTime} min read`;
  if (prevCardDate) prevCardDate.textContent = todayStr;
  if (prevCardTitle) prevCardTitle.textContent = title;
  if (prevCardExcerpt) prevCardExcerpt.textContent = excerpt;

  // 2. 개별 글 전용 페이지 뷰 렌더링
  const prevReaderCat = document.getElementById('prev-reader-cat');
  const prevReaderReadtime = document.getElementById('prev-reader-readtime');
  const prevReaderTitle = document.getElementById('prev-reader-title');
  const prevReaderImg = document.getElementById('prev-reader-img');
  const prevReaderProse = document.getElementById('prev-reader-prose');

  if (prevReaderCat) prevReaderCat.textContent = catName;
  if (prevReaderReadtime) prevReaderReadtime.textContent = `${readTime} min read`;
  if (prevReaderTitle) prevReaderTitle.textContent = title;
  if (prevReaderImg) prevReaderImg.src = coverImage;
  if (prevReaderProse) prevReaderProse.innerHTML = formatMarkdown(content);
}

function formatMarkdown(text) {
  if (!text) return '<p style="color: #94A3B8;">본문 내용이 없습니다.</p>';
  return text
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 18px; margin-bottom: 8px; color: #1C1917;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.35rem; font-weight: 700; margin-top: 22px; margin-bottom: 10px; color: #1C1917;">$1</h2>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, (match, alt, url) => {
      const figCaption = alt ? `<figcaption class="article-body-figcaption">${alt}</figcaption>` : '';
      return `</p><figure class="article-body-figure"><img src="${url}" alt="${alt || 'K-Glow Editorial'}" class="article-body-inline-img" style="max-width: 100%; border-radius: 8px;" loading="lazy" />${figCaption}</figure><p style="margin-bottom: 12px; line-height: 1.7; color: #44403C;">`;
    })
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/^• (.*$)/gim, '<li style="margin-left: 18px; margin-bottom: 4px; color: #44403C;">$1</li>')
    .replace(/\n\n/gim, '</p><p style="margin-bottom: 12px; line-height: 1.7; color: #44403C;">');
}

/* =========================================================
   Cloudflare R2 Image Uploader & Gallery Manager
========================================================= */
function setupR2Uploader() {
  const dropzone = document.getElementById('r2-dropzone');
  const fileInput = document.getElementById('r2-file-input');
  const quickInsertBtn = document.getElementById('btn-quick-insert-photo');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        handleImageUploadFiles(files);
      }
      fileInput.value = '';
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = Array.from(dt.files || []).filter(f => f.type.startsWith('image/'));
      if (files.length > 0) {
        handleImageUploadFiles(files);
      } else {
        showToast({ title: '업로드 오류', message: '이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.' });
      }
    });
  }

  // Quick insert photo button above textarea
  if (quickInsertBtn) {
    quickInsertBtn.addEventListener('click', () => {
      if (uploadedArticleImages.length === 0) {
        showToast({
          title: '사진 업로드 필요',
          message: '먼저 상단의 드롭존을 클릭하여 사진을 업로드해주세요.'
        });
        const dz = document.getElementById('r2-dropzone');
        if (dz) dz.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // If only 1 image, insert directly
      if (uploadedArticleImages.length === 1) {
        const img = uploadedArticleImages[0];
        insertImageAtCursor(img.url, img.name);
        return;
      }

      // If multiple, show quick dialog / prompt or insert chosen
      const titles = uploadedArticleImages.map((img, idx) => `${idx + 1}. ${img.name || '사진'}`).join('\n');
      const pick = prompt(`본문 커서 위치에 배치할 사진 번호를 선택하세요 (1~${uploadedArticleImages.length}):\n\n${titles}`, '1');
      if (pick) {
        const idx = parseInt(pick, 10) - 1;
        if (idx >= 0 && idx < uploadedArticleImages.length) {
          const chosen = uploadedArticleImages[idx];
          insertImageAtCursor(chosen.url, chosen.name);
        }
      }
    });
  }
}

async function handleImageUploadFiles(files) {
  const statusEl = document.getElementById('r2-upload-status');
  const statusText = document.getElementById('r2-upload-status-text');

  if (statusEl) {
    statusEl.style.display = 'flex';
    if (statusText) statusText.textContent = `${files.length}개의 사진을 Cloudflare R2에 업로드하는 중...`;
  }

  const formData = new FormData();
  files.forEach(f => {
    formData.append('files', f);
  });

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error(`서버 응답 오류 (${res.status})`);
    }

    const data = await res.json();
    if (data.success && Array.isArray(data.files)) {
      const currentCover = document.getElementById('editor-cover')?.value.trim();
      const isFirstBatch = (uploadedArticleImages.length === 0);

      data.files.forEach((file, index) => {
        const isCover = (isFirstBatch && index === 0 && (!currentCover || currentCover === '/assets/images/glass-skin.jpg'));
        uploadedArticleImages.push({
          id: file.key || `img_${Date.now()}_${index}`,
          key: file.key,
          url: file.url,
          name: file.name,
          size: file.size,
          type: file.type,
          isCover: isCover,
          storage: file.storage || 'r2'
        });

        if (isCover) {
          const coverInput = document.getElementById('editor-cover');
          if (coverInput) coverInput.value = file.url;
        }
      });

      renderR2Gallery();
      showToast({
        title: 'Cloudflare R2 업로드 완료',
        message: `${data.files.length}개의 사진이 Cloudflare R2에 안전하게 저장되었습니다.`
      });
    } else {
      throw new Error(data.error || '업로드 처리에 실패했습니다.');
    }
  } catch (err) {
    console.error('Upload failed:', err);
    showToast({
      title: '사진 업로드 실패',
      message: err.message || '사진 업로드 중 오류가 발생했습니다.'
    });
  } finally {
    if (statusEl) statusEl.style.display = 'none';
  }
}

function renderR2Gallery() {
  const wrap = document.getElementById('r2-gallery-wrap');
  const grid = document.getElementById('r2-gallery-grid');
  const countEl = document.getElementById('r2-gallery-count');
  const coverInput = document.getElementById('editor-cover');
  const currentCoverUrl = coverInput ? coverInput.value.trim() : '';

  if (!wrap || !grid) return;

  if (uploadedArticleImages.length === 0) {
    wrap.style.display = 'none';
    grid.innerHTML = '';
    return;
  }

  wrap.style.display = 'block';
  if (countEl) countEl.textContent = uploadedArticleImages.length;

  grid.innerHTML = uploadedArticleImages.map((img, idx) => {
    const isCover = (img.url === currentCoverUrl || img.isCover);
    const sizeStr = img.size ? `${(img.size / 1024).toFixed(1)} KB` : 'R2 Image';
    const cleanName = img.name || `photo-${idx + 1}`;

    return `
      <div class="r2-img-card ${isCover ? 'is-cover' : ''}" data-url="${img.url}">
        <div class="r2-card-thumb-wrap">
          <img src="${img.url}" alt="${cleanName}" class="r2-card-thumb" onerror="this.src='/assets/images/glass-skin.jpg';" />
          ${isCover ? '<div class="r2-card-cover-tag">★ 대표 사진 (Cover)</div>' : ''}
        </div>
        <div class="r2-card-body">
          <div class="r2-card-filename" title="${cleanName}">${cleanName}</div>
          <div class="r2-card-meta">
            <span>${sizeStr}</span>
            <span style="color: #38BDF8; font-weight: 600;">☁️ R2</span>
          </div>
          <div class="r2-card-actions">
            <button type="button" class="btn-r2-cover ${isCover ? 'is-selected' : ''}" data-action="set-cover" data-url="${img.url}" title="이 사진을 글의 대표 커버 사진으로 지정합니다">
              ${isCover ? '✓ 대표 사진 선택됨' : '⭐ 대표 사진 지정'}
            </button>
            <button type="button" class="btn-r2-insert" data-action="insert-content" data-url="${img.url}" data-name="${cleanName}" title="현재 본문 커서 위치에 마크다운 사진으로 즉시 배치합니다">
              📌 본문 원하는 곳에 삽입
            </button>
            <div class="r2-card-sub-actions">
              <button type="button" class="btn-r2-sub" data-action="copy-url" data-url="${img.url}">주소 복사</button>
              <button type="button" class="btn-r2-sub delete-btn" data-action="delete" data-url="${img.url}">제거</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const url = btn.dataset.url;
      const name = btn.dataset.name;

      if (action === 'set-cover') {
        selectAsCoverImage(url);
      } else if (action === 'insert-content') {
        insertImageAtCursor(url, name);
      } else if (action === 'copy-url') {
        navigator.clipboard.writeText(url).then(() => {
          showToast({ title: 'URL 복사 완료', message: '사진 주소가 클립보드에 복사되었습니다.' });
        });
      } else if (action === 'delete') {
        uploadedArticleImages = uploadedArticleImages.filter(item => item.url !== url);
        renderR2Gallery();
        showToast({ title: '사진 제거', message: '갤러리 목록에서 사진이 제거되었습니다.' });
      }
    });
  });
}

function selectAsCoverImage(imageUrl) {
  const coverInput = document.getElementById('editor-cover');
  if (coverInput) {
    coverInput.value = imageUrl;
  }
  uploadedArticleImages.forEach(img => {
    img.isCover = (img.url === imageUrl);
  });
  renderR2Gallery();

  if (currentEditorLang === 'preview') {
    renderLivePreview(currentPreviewLang);
  }
  showToast({
    title: '대표 사진 지정 완료',
    message: '선택한 사진이 메인 커버 대표 사진으로 설정되었습니다.'
  });
}

function insertImageAtCursor(imageUrl, altText = '') {
  const textarea = document.getElementById('editor-content');
  if (!textarea) return;

  const startPos = textarea.selectionStart ?? textarea.value.length;
  const endPos = textarea.selectionEnd ?? textarea.value.length;
  const before = textarea.value.substring(0, startPos);
  const after = textarea.value.substring(endPos);

  const prefix = (before.length > 0 && !before.endsWith('\n\n')) ? (before.endsWith('\n') ? '\n' : '\n\n') : '';
  const suffix = (after.length > 0 && !after.startsWith('\n\n')) ? (after.startsWith('\n') ? '\n' : '\n\n') : '';
  const cleanAlt = (altText || '사진 설명').replace(/\.[^/.]+$/, '');
  const markdownImg = `${prefix}![${cleanAlt}](${imageUrl})${suffix}`;

  textarea.value = before + markdownImg + after;
  const newCursorPos = startPos + markdownImg.length;
  textarea.selectionStart = newCursorPos;
  textarea.selectionEnd = newCursorPos;
  textarea.focus();

  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  saveCurrentEditorLangFields();

  showToast({
    title: '본문 사진 배치 완료',
    message: `본문 커서 위치에 사진이 배치되었습니다. (${cleanAlt})`
  });
}

/* =========================================================
   2. 카테고리 관리 (Category Management)
========================================================= */
function renderCategoriesTable() {
  const tbody = document.getElementById('categories-table-body');
  if (!tbody) return;

  const categories = getCategories();
  const articles = getArticles();

  if (categories.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 24px; color: #94A3B8;">
          등록된 카테고리가 없습니다. 왼쪽 폼에서 카테고리를 추가해보세요.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = categories.map(cat => {
    const count = articles.filter(a => a.category === cat.id).length;
    return `
      <tr>
        <td>
          <code style="background: rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 4px; color: #38BDF8;">${escapeHtml(cat.id)}</code>
        </td>
        <td>
          <div style="font-weight: 600; color: #FFFFFF;">${escapeHtml(cat.name?.en || cat.id)}</div>
          <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 2px;">
            중문: ${escapeHtml(cat.name?.zh || '-')} | 일문: ${escapeHtml(cat.name?.ja || '-')}
          </div>
        </td>
        <td>
          <span style="font-weight: 600; color: #CBD5E1;">${count}개 글</span>
        </td>
        <td style="text-align: right;">
          <button class="btn-action-icon btn-delete-category" data-id="${cat.id}" style="color: #F87171;" title="카테고리 삭제">
            삭제
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.btn-delete-category').forEach(btn => {
    btn.addEventListener('click', () => {
      const catId = btn.dataset.id;
      if (confirm(`'${catId}' 카테고리를 삭제하시겠습니까?`)) {
        deleteCategory(catId);
        updateTopCounters();
        renderCategoriesTable();
        showToast({ title: "카테고리 삭제 완료", message: `'${catId}' 카테고리가 삭제되었습니다.` });
      }
    });
  });
}

function setupCategoryForm() {
  const form = document.getElementById('form-add-category');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('cat-new-id').value.trim().toLowerCase().replace(/\s+/g, '-');
    const nameEn = document.getElementById('cat-new-name-en').value.trim();
    const nameZh = document.getElementById('cat-new-name-zh').value.trim() || nameEn;
    const nameJa = document.getElementById('cat-new-name-ja').value.trim() || nameEn;

    if (!id || !nameEn) return;

    saveCategory({
      id,
      name: { en: nameEn, zh: nameZh, ja: nameJa },
      count: 0
    });

    form.reset();
    updateTopCounters();
    renderCategoriesTable();
    showToast({ title: "카테고리 추가 완료", message: `'${nameEn}' 카테고리가 생성되었습니다.` });
  });
}

/* =========================================================
   3. 태그 관리 (Tag Management)
========================================================= */
function renderTagsChips() {
  const container = document.getElementById('tags-chips-container');
  if (!container) return;

  const tags = getTags();

  if (tags.length === 0) {
    container.innerHTML = `<span style="color: #94A3B8; font-size: 0.9rem;">등록된 태그가 없습니다.</span>`;
    return;
  }

  container.innerHTML = tags.map(tag => `
    <div style="background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); color: #C084FC; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px;">
      <span style="font-weight: 600;">${escapeHtml(tag)}</span>
      <button class="btn-delete-tag" data-tag="${escapeHtml(tag)}" style="background: none; border: none; color: #E9D5FF; font-size: 0.85rem; cursor: pointer; padding: 0 2px;" title="태그 삭제">&times;</button>
    </div>
  `).join('');

  container.querySelectorAll('.btn-delete-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      deleteTag(tag);
      updateTopCounters();
      renderTagsChips();
      showToast({ title: "태그 삭제 완료", message: `'${tag}' 태그가 삭제되었습니다.` });
    });
  });
}

function setupTagForm() {
  const form = document.getElementById('form-add-tag');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tagInput = document.getElementById('tag-new-input');
    const val = tagInput.value.trim();
    if (!val) return;

    saveTag(val);
    tagInput.value = '';
    updateTopCounters();
    renderTagsChips();
    showToast({ title: "태그 추가 완료", message: `'${val}' 태그가 등록되었습니다.` });
  });
}

/* =========================================================
   4. 커뮤니티(게시판) 관리 (Community Moderation)
========================================================= */
let adminCommFilterStatus = 'all';
let adminCommFilterCat = 'all';
let adminCommSearchQuery = '';
let adminCommSelectedIds = new Set();

function setupCommunityAdmin() {
  const btnNew = document.getElementById('btn-admin-comm-new');
  const btnBulkDelete = document.getElementById('btn-admin-comm-bulk-delete');
  const statusFilter = document.getElementById('admin-comm-filter-status');
  const catFilter = document.getElementById('admin-comm-filter-cat');
  const searchInput = document.getElementById('admin-comm-search-input');
  const checkAll = document.getElementById('admin-comm-check-all');

  // Editor Modal elements
  const editorModal = document.getElementById('modal-admin-comm-editor');
  const btnCloseEditor = document.getElementById('btn-close-admin-comm-editor');
  const btnCancelEditor = document.getElementById('btn-cancel-admin-comm-editor');
  const editorForm = document.getElementById('form-admin-comm-editor');
  const editorTitle = document.getElementById('admin-comm-modal-title');
  const editIdInput = document.getElementById('admin-comm-edit-id');

  // Comment Modal elements
  const commentsModal = document.getElementById('modal-admin-comm-comments');
  const btnCloseComments = document.getElementById('btn-close-admin-comm-comments');
  const btnCloseCommentsFooter = document.getElementById('btn-close-admin-comments-footer');
  const btnSendReply = document.getElementById('btn-admin-send-reply');
  const adminReplyInput = document.getElementById('admin-comm-admin-reply-input');

  // Open New Post / Notice Modal
  btnNew?.addEventListener('click', () => {
    if (editIdInput) editIdInput.value = '';
    editorForm?.reset();
    if (editorTitle) editorTitle.textContent = "관리자 공지 / 게시글 작성";
    document.getElementById('admin-comm-input-category').value = 'Notice';
    document.getElementById('admin-comm-input-pinned').checked = true;
    document.getElementById('admin-comm-input-author').value = 'K-Beauty Glow Admin';
    document.getElementById('admin-comm-input-country').value = '🇰🇷 Seoul (Admin)';
    editorModal?.classList.add('open');
  });

  // Close Editor Modal
  const closeEditor = () => editorModal?.classList.remove('open');
  btnCloseEditor?.addEventListener('click', closeEditor);
  btnCancelEditor?.addEventListener('click', closeEditor);

  // Editor Form Submit (Create or Update)
  editorForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = editIdInput ? editIdInput.value.trim() : '';
    const title = document.getElementById('admin-comm-input-title').value.trim();
    const category = document.getElementById('admin-comm-input-category').value;
    const isPinned = document.getElementById('admin-comm-input-pinned').checked;
    const author = document.getElementById('admin-comm-input-author').value.trim();
    const country = document.getElementById('admin-comm-input-country').value.trim();
    const tagsRaw = document.getElementById('admin-comm-input-tags').value.trim();
    const content = document.getElementById('admin-comm-input-content').value.trim();

    if (!title || !content || !author) return;

    const tags = tagsRaw
      ? tagsRaw.split(/[,#\s]+/).filter(Boolean).map(t => t.startsWith('#') ? t : `#${t}`)
      : [];

    if (editId) {
      updateCommunityPost(editId, {
        title,
        category,
        isPinned,
        author,
        country,
        tags,
        content
      });
      showToast({ title: "게시글 수정 완료", message: "커뮤니티 글이 수정되었습니다." });
    } else {
      saveCommunityPost({
        title,
        category,
        isPinned,
        isNotice: category === 'Notice' || isPinned,
        author,
        country,
        tags,
        content,
        password: 'admin',
        status: 'published'
      });
      showToast({ title: "게시글 발행 완료", message: "관리자 게시글(공지)이 등록되었습니다." });
    }

    closeEditor();
    updateTopCounters();
    renderCommunityTable();
  });

  // Filters & Search
  statusFilter?.addEventListener('change', (e) => {
    adminCommFilterStatus = e.target.value;
    renderCommunityTable();
  });

  catFilter?.addEventListener('change', (e) => {
    adminCommFilterCat = e.target.value;
    renderCommunityTable();
  });

  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        adminCommSearchQuery = e.target.value.trim();
        renderCommunityTable();
      }, 200);
    });
  }

  // Check all toggle
  checkAll?.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const checkboxes = document.querySelectorAll('.admin-comm-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = isChecked;
      if (isChecked) adminCommSelectedIds.add(cb.dataset.id);
      else adminCommSelectedIds.delete(cb.dataset.id);
    });
    updateSelectedCount();
  });

  // Bulk Delete
  btnBulkDelete?.addEventListener('click', () => {
    if (adminCommSelectedIds.size === 0) {
      alert('삭제할 게시글을 먼저 선택해주세요.');
      return;
    }

    if (confirm(`선택한 ${adminCommSelectedIds.size}개의 게시글을 영구 삭제하시겠습니까?`)) {
      batchDeleteCommunityPosts(Array.from(adminCommSelectedIds));
      adminCommSelectedIds.clear();
      updateSelectedCount();
      updateTopCounters();
      renderCommunityTable();
      showToast({ title: "일괄 삭제 완료", message: "선택한 게시글이 삭제되었습니다." });
    }
  });

  // Comments Modal Close
  const closeCommentsModal = () => commentsModal?.classList.remove('open');
  btnCloseComments?.addEventListener('click', closeCommentsModal);
  btnCloseCommentsFooter?.addEventListener('click', closeCommentsModal);

  // Admin Reply Send inside comments modal
  btnSendReply?.addEventListener('click', () => {
    const postId = document.getElementById('admin-comm-comments-post-id')?.value;
    const text = adminReplyInput ? adminReplyInput.value.trim() : '';
    if (!postId || !text) return;

    addCommunityComment(postId, {
      author: "K-Beauty Glow Editorial (Admin)",
      country: "🇰🇷 Seoul (Admin)",
      password: "admin",
      content: text
    });

    if (adminReplyInput) adminReplyInput.value = '';
    showToast({ title: "답글 등록 완료", message: "관리자 공식 댓글이 등록되었습니다." });

    const post = getAllCommunityPostsRaw().find(p => p.id === postId);
    if (post) openAdminCommentsModal(post);
    renderCommunityTable();
  });

  adminReplyInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnSendReply?.click();
  });
}

function updateSelectedCount() {
  const countEl = document.getElementById('admin-comm-selected-count');
  if (countEl) countEl.textContent = adminCommSelectedIds.size;
  const checkAll = document.getElementById('admin-comm-check-all');
  const allCbs = document.querySelectorAll('.admin-comm-checkbox');
  if (checkAll && allCbs.length > 0) {
    checkAll.checked = adminCommSelectedIds.size === allCbs.length;
  }
}

function renderCommunityTable() {
  const tbody = document.getElementById('community-table-body');
  if (!tbody) return;

  const rawPosts = getAllCommunityPostsRaw();

  // Update Stats Counters
  const totalPosts = rawPosts.length;
  const pinnedCount = rawPosts.filter(p => p.isPinned || p.category === 'Notice').length;
  const hiddenCount = rawPosts.filter(p => p.status === 'hidden').length;
  const repliesTotal = rawPosts.reduce((acc, p) => acc + (p.replies || []).length, 0);
  const likesTotal = rawPosts.reduce((acc, p) => acc + (p.likes || 0), 0);

  const elStatTotal = document.getElementById('admin-comm-stat-total');
  const elStatPinned = document.getElementById('admin-comm-stat-pinned');
  const elStatHidden = document.getElementById('admin-comm-stat-hidden');
  const elStatReplies = document.getElementById('admin-comm-stat-replies');
  const elStatLikes = document.getElementById('admin-comm-stat-likes');
  const elHeaderComm = document.getElementById('stat-community-count');

  if (elStatTotal) elStatTotal.textContent = totalPosts;
  if (elStatPinned) elStatPinned.textContent = pinnedCount;
  if (elStatHidden) elStatHidden.textContent = hiddenCount;
  if (elStatReplies) elStatReplies.textContent = repliesTotal;
  if (elStatLikes) elStatLikes.textContent = likesTotal;
  if (elHeaderComm) elHeaderComm.textContent = totalPosts;

  // Filter posts
  let filtered = [...rawPosts];

  // Status Filter
  if (adminCommFilterStatus === 'published') {
    filtered = filtered.filter(p => p.status !== 'hidden');
  } else if (adminCommFilterStatus === 'pinned') {
    filtered = filtered.filter(p => p.isPinned || p.category === 'Notice');
  } else if (adminCommFilterStatus === 'hidden') {
    filtered = filtered.filter(p => p.status === 'hidden');
  }

  // Category Filter
  if (adminCommFilterCat !== 'all') {
    filtered = filtered.filter(p => p.category === adminCommFilterCat);
  }

  // Search Filter
  if (adminCommSearchQuery) {
    const q = adminCommSearchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 36px; color: #94A3B8;">
          조건에 일치하는 커뮤니티 게시글이 없습니다.
        </td>
      </tr>
    `;
    updateSelectedCount();
    return;
  }

  tbody.innerHTML = filtered.map(post => {
    const repliesCount = (post.replies || []).length;
    const isChecked = adminCommSelectedIds.has(post.id);
    const isHidden = post.status === 'hidden';

    return `
      <tr style="${isHidden ? 'opacity: 0.65; background: rgba(15, 23, 42, 0.4);' : ''}">
        <td style="text-align: center;">
          <input type="checkbox" class="admin-comm-checkbox" data-id="${post.id}" ${isChecked ? 'checked' : ''} />
        </td>
        <td>
          ${post.isPinned ? `<span class="badge-status-pinned">📌 공지</span>` : isHidden ? `<span class="badge-status-hidden">🔒 숨김</span>` : `<span class="badge-status-published">🟢 공개중</span>`}
        </td>
        <td style="color: #94A3B8; font-size: 0.8rem;">
          #${post.postNo || '-'}
        </td>
        <td>
          <span style="background: rgba(56, 189, 248, 0.12); color: #38BDF8; padding: 2px 8px; border-radius: var(--radius-xs); font-size: 0.76rem; font-weight: 600;">
            ${escapeHtml(post.category)}
          </span>
        </td>
        <td style="max-width: 300px;">
          <div class="admin-comm-clickable-title" data-id="${post.id}" style="font-weight: 600; color: #F8FAFC; font-size: 0.9rem; margin-bottom: 2px; cursor: pointer;" title="클릭하여 수정">
            ${escapeHtml(post.title)}
          </div>
          <div style="font-size: 0.78rem; color: #94A3B8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${escapeHtml(post.content)}
          </div>
        </td>
        <td>
          <div style="font-weight: 600; color: #FFFFFF; font-size: 0.84rem;">${escapeHtml(post.author)}</div>
          <div style="font-size: 0.74rem; color: #94A3B8;">${escapeHtml(post.country)}</div>
        </td>
        <td style="font-size: 0.82rem; white-space: nowrap;">
          <span style="color: #94A3B8;">👁️ ${post.views || 0}</span>
          <span style="color: #EC4899; margin: 0 4px;">❤️ ${post.likes || 0}</span>
          <span style="color: #38BDF8;">💬 ${repliesCount}</span>
        </td>
        <td style="color: #94A3B8; font-size: 0.78rem; white-space: nowrap;">
          ${post.date}
        <td style="text-align: right; white-space: nowrap;">
          <a href="/community.html?postId=${post.id}" target="_blank" class="btn-action-icon" style="color: #60A5FA; font-size: 0.78rem; text-decoration: none;" title="독자 화면에서 바로보기">
            ↗ 보기
          </a>
          <button class="btn-action-icon btn-admin-comm-pin" data-id="${post.id}" title="${post.isPinned ? '공지 해제' : '상단 공지 지정'}" style="font-size: 0.78rem; color: #F472B6;">
            ${post.isPinned ? '📌 해제' : '📌 공지'}
          </button>
          <button class="btn-action-icon btn-admin-comm-hide" data-id="${post.id}" title="${isHidden ? '공개 복원' : '사이트에서 숨김(블라인드)'}" style="font-size: 0.78rem; color: ${isHidden ? '#34D399' : '#FCD34D'};">
            ${isHidden ? '👁️ 공개' : '🔒 숨김'}
          </button>
          <button class="btn-action-icon btn-admin-comm-edit" data-id="${post.id}" title="게시글 내용 수정" style="font-size: 0.78rem; color: #38BDF8;">
            ✏️ 수정
          </button>
          <button class="btn-action-icon btn-admin-comm-replies" data-id="${post.id}" title="댓글 목록 및 삭제" style="font-size: 0.78rem; color: #A78BFA;">
            💬 댓글 (${repliesCount})
          </button>
          <button class="btn-action-icon btn-admin-comm-delete" data-id="${post.id}" style="color: #F87171; font-size: 0.78rem;" title="게시글 삭제">
            🗑️ 삭제
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Row Checkboxes
  tbody.querySelectorAll('.admin-comm-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) adminCommSelectedIds.add(cb.dataset.id);
      else adminCommSelectedIds.delete(cb.dataset.id);
      updateSelectedCount();
    });
  });

  // Clickable title to edit
  tbody.querySelectorAll('.admin-comm-clickable-title, .btn-admin-comm-edit').forEach(el => {
    el.addEventListener('click', () => {
      const postId = el.dataset.id;
      const post = rawPosts.find(p => p.id === postId);
      if (post) openAdminEditModal(post);
    });
  });

  // Pin Toggle
  tbody.querySelectorAll('.btn-admin-comm-pin').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.id;
      const isPinned = togglePinCommunityPost(postId);
      showToast({
        title: isPinned ? "상단 공지 지정" : "공지 해제 완료",
        message: isPinned ? "해당 글이 사용자 게시판 최상단에 고정됩니다." : "일반 게시글로 전환되었습니다."
      });
      renderCommunityTable();
    });
  });

  // Hide Toggle
  tbody.querySelectorAll('.btn-admin-comm-hide').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.id;
      const status = toggleHideCommunityPost(postId);
      showToast({
        title: status === 'hidden' ? "게시글 숨김(블라인드) 완료" : "게시글 공개 복구 완료",
        message: status === 'hidden' ? "사용자 화면에서 즉시 가려집니다." : "사용자 화면에 다시 노출됩니다."
      });
      renderCommunityTable();
    });
  });

  // Comment Moderation Modal
  tbody.querySelectorAll('.btn-admin-comm-replies').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.id;
      const post = rawPosts.find(p => p.id === postId);
      if (post) openAdminCommentsModal(post);
    });
  });

  // Delete Post
  tbody.querySelectorAll('.btn-admin-comm-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.dataset.id;
      if (confirm('이 커뮤니티 게시글을 영구 삭제하시겠습니까?')) {
        deleteCommunityPost(postId);
        adminCommSelectedIds.delete(postId);
        updateTopCounters();
        renderCommunityTable();
        showToast({ title: "게시글 삭제 완료", message: "커뮤니티 글이 삭제되었습니다." });
      }
    });
  });

  updateSelectedCount();
}

function openAdminEditModal(post) {
  const modal = document.getElementById('modal-admin-comm-editor');
  const titleHeading = document.getElementById('admin-comm-modal-title');
  const editIdInput = document.getElementById('admin-comm-edit-id');

  if (!modal) return;

  if (editIdInput) editIdInput.value = post.id;
  if (titleHeading) titleHeading.textContent = `게시글 수정 (#${post.postNo || ''})`;

  document.getElementById('admin-comm-input-category').value = post.category || 'Routine Advice';
  document.getElementById('admin-comm-input-pinned').checked = !!post.isPinned;
  document.getElementById('admin-comm-input-title').value = post.title || '';
  document.getElementById('admin-comm-input-author').value = post.author || '';
  document.getElementById('admin-comm-input-country').value = post.country || '';
  document.getElementById('admin-comm-input-tags').value = (post.tags || []).join(', ');
  document.getElementById('admin-comm-input-content').value = post.content || '';

  modal.classList.add('open');
}

function openAdminCommentsModal(post) {
  const modal = document.getElementById('modal-admin-comm-comments');
  const targetTitle = document.getElementById('admin-comm-comments-target-title');
  const container = document.getElementById('admin-comm-comments-container');
  const postIdInput = document.getElementById('admin-comm-comments-post-id');

  if (!modal || !container) return;

  if (postIdInput) postIdInput.value = post.id;
  if (targetTitle) targetTitle.textContent = `대상 글: "${post.title}"`;

  const replies = post.replies || [];

  if (replies.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: #94A3B8; font-size: 0.86rem; background: #0F172A; border-radius: var(--radius-sm);">
        등록된 댓글이 없습니다.
      </div>
    `;
  } else {
    container.innerHTML = replies.map(r => `
      <div class="admin-comm-comment-row" id="admin-comment-${r.id}">
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 600; color: #FFFFFF; font-size: 0.84rem;">
              <span>${escapeHtml(r.author)}</span>
              <span style="color: #94A3B8; font-size: 0.76rem; font-weight: normal; margin-left: 6px;">${escapeHtml(r.country || '')}</span>
            </div>
            <div style="font-size: 0.74rem; color: #94A3B8;">${r.date}</div>
          </div>
          <div style="font-size: 0.85rem; color: #CBD5E1; line-height: 1.4; word-break: break-word;">
            ${escapeHtml(r.content)}
          </div>
        </div>
        <div>
          <button class="btn-action-icon btn-admin-delete-comment" data-post-id="${post.id}" data-comment-id="${r.id}" style="color: #F87171; font-size: 0.78rem;" title="댓글 삭제">
            삭제
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.btn-admin-delete-comment').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.dataset.postId;
        const cId = btn.dataset.commentId;
        if (confirm('이 댓글을 삭제하시겠습니까?')) {
          deleteCommunityComment(pId, cId, '', true);
          showToast({ title: "댓글 삭제 완료", message: "댓글이 삭제되었습니다." });
          const refreshed = getAllCommunityPostsRaw().find(p => p.id === pId);
          if (refreshed) openAdminCommentsModal(refreshed);
          renderCommunityTable();
        }
      });
    });
  }

  modal.classList.add('open');
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
   5. 상단 배너 & 이벤트 쿠폰 관리 (Promotions & Banner Management)
========================================================= */
let currentPromoTheme = 'dark';
let activePromoLang = 'en';

function setupPromotionsModule() {
  const saveBtn = document.getElementById('btn-save-promotions');
  const resetBtn = document.getElementById('btn-reset-promotions');

  saveBtn?.addEventListener('click', () => handleSavePromotions(true));
  resetBtn?.addEventListener('click', handleResetPromotions);

  // Theme selector buttons
  const themeContainer = document.getElementById('promo-theme-selector');
  themeContainer?.querySelectorAll('.promo-theme-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      themeContainer.querySelectorAll('.promo-theme-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPromoTheme = btn.dataset.theme || 'dark';
      updatePromotionsLivePreview();
      handleSavePromotions(false); // Auto-save theme selection
    });
  });

  // Language subtabs
  const langTabsContainer = document.getElementById('promo-lang-tabs');
  langTabsContainer?.querySelectorAll('.promo-lang-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.promoLang;
      langTabsContainer.querySelectorAll('.promo-lang-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.promo-lang-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`promo-lang-panel-${lang}`);
      if (panel) panel.classList.add('active');
      activePromoLang = lang;
      updatePromotionsLivePreview();
    });
  });

  // Real-time input listeners for Live Sync Preview & Instant Auto-Save for toggles
  const inputIds = [
    'promo-top-enabled', 'promo-top-badge', 'promo-top-code', 'promo-top-link',
    'promo-top-text-en', 'promo-top-disc-en',
    'promo-top-text-ko', 'promo-top-disc-ko',
    'promo-top-text-zh', 'promo-top-disc-zh',
    'promo-top-text-ja', 'promo-top-disc-ja',
    'promo-coupon-enabled', 'promo-floating-enabled',
    'promo-coupon-badge', 'promo-coupon-discount-tag',
    'promo-coupon-title', 'promo-coupon-code',
    'promo-coupon-desc', 'promo-coupon-mall',
    'promo-coupon-url', 'promo-coupon-success-msg'
  ];

  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        updatePromotionsLivePreview();
      });
      el.addEventListener('change', () => {
        updatePromotionsLivePreview();
        // Automatically save immediately when any switch or field changes!
        handleSavePromotions(false);
      });
    }
  });

  renderPromotionsPanel();
}

function renderPromotionsPanel() {
  const settings = getPromoSettings();
  currentPromoTheme = settings.topBanner.bgTheme || 'dark';

  // Top Banner Form fields
  const elTopEnabled = document.getElementById('promo-top-enabled');
  if (elTopEnabled) elTopEnabled.checked = Boolean(settings.topBanner.enabled);

  const themeContainer = document.getElementById('promo-theme-selector');
  if (themeContainer) {
    themeContainer.querySelectorAll('.promo-theme-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.theme === currentPromoTheme);
    });
  }

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val !== undefined && val !== null ? val : '';
  };

  setVal('promo-top-badge', settings.topBanner.badge);
  setVal('promo-top-code', settings.topBanner.promoCode);
  setVal('promo-top-link', settings.topBanner.linkUrl);

  setVal('promo-top-text-en', settings.topBanner.textEn || settings.topBanner.text);
  setVal('promo-top-disc-en', settings.topBanner.discountEn || settings.topBanner.discount);

  setVal('promo-top-text-ko', settings.topBanner.textKo);
  setVal('promo-top-disc-ko', settings.topBanner.discountKo);

  setVal('promo-top-text-zh', settings.topBanner.textZh);
  setVal('promo-top-disc-zh', settings.topBanner.discountZh);

  setVal('promo-top-text-ja', settings.topBanner.textJa);
  setVal('promo-top-disc-ja', settings.topBanner.discountJa);

  // Coupon Form fields
  const elCouponEnabled = document.getElementById('promo-coupon-enabled');
  if (elCouponEnabled) elCouponEnabled.checked = Boolean(settings.eventCoupon.enabled);

  const elFloatingEnabled = document.getElementById('promo-floating-enabled');
  if (elFloatingEnabled) elFloatingEnabled.checked = Boolean(settings.eventCoupon.floatingEnabled);

  setVal('promo-coupon-badge', settings.eventCoupon.badge);
  setVal('promo-coupon-discount-tag', settings.eventCoupon.discountTag);
  setVal('promo-coupon-title', settings.eventCoupon.title);
  setVal('promo-coupon-code', settings.eventCoupon.promoCode);
  setVal('promo-coupon-desc', settings.eventCoupon.desc);
  setVal('promo-coupon-mall', settings.eventCoupon.targetMallName);
  setVal('promo-coupon-url', settings.eventCoupon.landingUrl);
  setVal('promo-coupon-success-msg', settings.eventCoupon.copySuccessMessage);

  updatePromotionsLivePreview();
}

function updatePromotionsLivePreview() {
  const getVal = (id) => (document.getElementById(id)?.value || '').trim();
  const getChecked = (id) => Boolean(document.getElementById(id)?.checked);

  const topEnabled = getChecked('promo-top-enabled');
  const topBadge = getVal('promo-top-badge') || 'READER PRIVILEGE';
  const topCode = getVal('promo-top-code') || 'GLOW10';
  
  // Pick active text according to activePromoLang
  let topText = getVal(`promo-top-text-${activePromoLang}`) || getVal('promo-top-text-en') || 'THE K-GLOW READERS: Use promo code';
  let topDiscount = getVal(`promo-top-disc-${activePromoLang}`) || getVal('promo-top-disc-en') || 'for an exclusive 10% OFF at Olive Young Global';

  // Preview 1: Top Banner
  const previewTopBar = document.getElementById('preview-top-banner');
  const previewTopDisabled = document.getElementById('preview-top-disabled-msg');
  if (previewTopBar && previewTopDisabled) {
    if (topEnabled) {
      previewTopBar.style.display = 'block';
      previewTopDisabled.style.display = 'none';

      previewTopBar.className = `promo-live-top-banner theme-${currentPromoTheme}`;
      const elBadge = document.getElementById('preview-top-badge');
      if (elBadge) elBadge.textContent = topBadge;

      const elText = document.getElementById('preview-top-text');
      if (elText) elText.textContent = topText;

      const elCode = document.getElementById('preview-top-code');
      if (elCode) elCode.textContent = topCode;

      const elDisc = document.getElementById('preview-top-discount');
      if (elDisc) elDisc.textContent = topDiscount;
    } else {
      previewTopBar.style.display = 'none';
      previewTopDisabled.style.display = 'block';
    }
  }

  // Preview 2: Sidebar Coupon
  const couponEnabled = getChecked('promo-coupon-enabled');
  const previewSidebar = document.getElementById('preview-sidebar-widget');
  const previewSidebarDisabled = document.getElementById('preview-sidebar-disabled-msg');
  if (previewSidebar && previewSidebarDisabled) {
    if (couponEnabled) {
      previewSidebar.style.display = 'block';
      previewSidebarDisabled.style.display = 'none';

      const couponBadge = getVal('promo-coupon-badge') || 'READER PRIVILEGE';
      const couponTitle = getVal('promo-coupon-title') || 'Olive Young Global 10% OFF';
      const couponCode = getVal('promo-coupon-code') || 'GLOW10';
      const couponDesc = getVal('promo-coupon-desc') || '';
      const couponMall = getVal('promo-coupon-mall') || 'Olive Young Global';

      const elBadge = document.getElementById('preview-sidebar-badge');
      if (elBadge) elBadge.textContent = couponBadge;

      const elTitle = document.getElementById('preview-sidebar-title');
      if (elTitle) elTitle.textContent = couponTitle;

      const elCode = document.getElementById('preview-sidebar-code');
      if (elCode) elCode.textContent = couponCode;

      const elDesc = document.getElementById('preview-sidebar-desc');
      if (elDesc) elDesc.textContent = couponDesc;

      const elMall = document.getElementById('preview-sidebar-mall');
      if (elMall) elMall.textContent = couponMall;
    } else {
      previewSidebar.style.display = 'none';
      previewSidebarDisabled.style.display = 'block';
    }
  }

  // Preview 3: Floating Coupon Widget
  const floatingEnabled = getChecked('promo-floating-enabled') && couponEnabled;
  const previewFloating = document.getElementById('preview-floating-pill');
  const previewFloatingDisabled = document.getElementById('preview-floating-disabled-msg');
  if (previewFloating && previewFloatingDisabled) {
    if (floatingEnabled) {
      previewFloating.style.display = 'inline-block';
      previewFloatingDisabled.style.display = 'none';

      const couponCode = getVal('promo-coupon-code') || 'GLOW10';
      const discountTag = getVal('promo-coupon-discount-tag') || '10% OFF';

      const elCode = document.getElementById('preview-floating-code');
      if (elCode) elCode.textContent = couponCode;

      const elTag = document.getElementById('preview-floating-tag');
      if (elTag) elTag.textContent = discountTag;
    } else {
      previewFloating.style.display = 'none';
      previewFloatingDisabled.style.display = 'block';
    }
  }
}

function handleSavePromotions(showNotification = true) {
  const getVal = (id) => (document.getElementById(id)?.value || '').trim();
  const getChecked = (id) => Boolean(document.getElementById(id)?.checked);

  const updatedSettings = {
    topBanner: {
      enabled: getChecked('promo-top-enabled'),
      badge: getVal('promo-top-badge') || 'READER PRIVILEGE',
      promoCode: getVal('promo-top-code') || 'GLOW10',
      linkUrl: getVal('promo-top-link') || 'https://global.oliveyoung.com',
      bgTheme: currentPromoTheme || 'dark',
      textEn: getVal('promo-top-text-en'),
      discountEn: getVal('promo-top-disc-en'),
      textKo: getVal('promo-top-text-ko'),
      discountKo: getVal('promo-top-disc-ko'),
      textZh: getVal('promo-top-text-zh'),
      discountZh: getVal('promo-top-disc-zh'),
      textJa: getVal('promo-top-text-ja'),
      discountJa: getVal('promo-top-disc-ja'),
    },
    eventCoupon: {
      enabled: getChecked('promo-coupon-enabled'),
      floatingEnabled: getChecked('promo-floating-enabled'),
      badge: getVal('promo-coupon-badge') || 'READER PRIVILEGE',
      discountTag: getVal('promo-coupon-discount-tag') || '10% OFF',
      title: getVal('promo-coupon-title') || 'Olive Young Global 10% OFF',
      promoCode: getVal('promo-coupon-code') || 'GLOW10',
      desc: getVal('promo-coupon-desc'),
      targetMallName: getVal('promo-coupon-mall') || 'Olive Young Global',
      landingUrl: getVal('promo-coupon-url') || 'https://global.oliveyoung.com',
      copySuccessMessage: getVal('promo-coupon-success-msg') || 'Code copied to clipboard!'
    }
  };

  savePromoSettings(updatedSettings);
  updateTopCounters();
  updatePromotionsLivePreview();

  if (showNotification) {
    showToast({
      title: "설정 저장 완료",
      message: "상단 배너 및 이벤트 쿠폰 설정이 성공적으로 저장되었습니다."
    });
  }
}

function handleResetPromotions() {
  if (confirm('배너 및 이벤트 쿠폰 설정을 기본값으로 되돌리시겠습니까?')) {
    resetPromoSettings();
    renderPromotionsPanel();
    updateTopCounters();
    showToast({
      title: "기본값 복원 완료",
      message: "배너 및 쿠폰 설정이 초기 기본 데모 상태로 복원되었습니다."
    });
  }
}
