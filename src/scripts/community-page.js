/**
 * Community Page Script for K-beuty Glow Edit
 * Standalone Community Bulletin Board (/community.html)
 */

import '../styles/tokens.css';
import '../styles/main.css';
import { copyPromoCode, PROMO_CODE, showToast } from './affiliate.js';
import { 
  CURRENCIES, 
  getCommunityPosts, 
  getAllCommunityPostsRaw,
  saveCommunityPost, 
  updateCommunityPost,
  deleteCommunityPost, 
  likeCommunityPost, 
  isPostLikedByMe,
  incrementPostViews,
  addCommunityComment,
  deleteCommunityComment,
  likeCommunityComment
} from './data.js';
import { getLang, initLanguage, setLang, t, translations } from './i18n.js';

let currentCommCategory = 'all';
let commSearchQuery = '';
let commSortBy = 'latest';
let commViewMode = 'cards'; // 'cards' | 'table'
let commCurrentPage = 1;
const commPageSize = 6;
let activeDetailPostId = null;
let pendingPassAction = null;

document.addEventListener('DOMContentLoaded', () => {
  initCommunityPage();
});

function initCommunityPage() {
  // 1. Language & Promo Code
  const activeLang = initLanguage();
  setupPromoCode();
  setupHeaderEvents();

  // 2. Setup Community Forum
  setupCommunityForum();
  renderCommunityBoard();

  // 3. Check URL parameters for direct link or write action
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('postId');
  const isWrite = params.get('write');

  if (postId) {
    setTimeout(() => {
      openCommunityPostDetail(postId);
    }, 200);
  } else if (isWrite) {
    const postBox = document.getElementById('community-new-post-box');
    if (postBox) {
      postBox.classList.add('open');
      document.getElementById('comm-post-title')?.focus();
    }
  }

  // Check URL hash fallback (#post-...)
  const hash = window.location.hash;
  if (hash && hash.startsWith('#post-')) {
    const pId = hash.replace('#post-', '');
    setTimeout(() => {
      openCommunityPostDetail(pId);
    }, 200);
  }
}

function setupPromoCode() {
  const promoBtn = document.getElementById('promo-code-btn');
  promoBtn?.addEventListener('click', () => {
    copyPromoCode();
  });
}

function setupHeaderEvents() {
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.value = getLang();
    langSelect.addEventListener('change', (e) => {
      setLang(e.target.value);
      applyI18nLabels();
      renderCommunityBoard();
      if (activeDetailPostId) {
        openCommunityPostDetail(activeDetailPostId);
      }
    });
  }

  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    const savedCurrency = localStorage.getItem('kbeauty_currency') || 'USD';
    currencySelect.value = savedCurrency;
    currencySelect.addEventListener('change', (e) => {
      localStorage.setItem('kbeauty_currency', e.target.value);
    });
  }
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

function setupCommunityForum() {
  const openPostBtn = document.getElementById('btn-open-new-post');
  const cancelPostBtn = document.getElementById('btn-cancel-post');
  const closePostBoxBtn = document.getElementById('btn-close-post-box');
  const postBox = document.getElementById('community-new-post-box');
  const postForm = document.getElementById('community-post-form');
  const formHeading = document.getElementById('comm-form-heading');
  const submitBtn = document.getElementById('btn-submit-comm-post');
  const editIdInput = document.getElementById('comm-edit-post-id');

  // Open New Post Box
  if (openPostBtn && postBox) {
    openPostBtn.addEventListener('click', () => {
      if (editIdInput) editIdInput.value = '';
      postForm?.reset();
      if (formHeading) formHeading.textContent = t('postModalTitle') || "Start a Discussion in the Community";
      if (submitBtn) submitBtn.textContent = t('submitPostBtn') || "Publish Post";
      postBox.classList.toggle('open');
      if (postBox.classList.contains('open')) {
        document.getElementById('comm-post-title')?.focus();
        postBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Cancel / Close Post Box
  const closeBox = () => {
    postBox?.classList.remove('open');
    if (editIdInput) editIdInput.value = '';
    postForm?.reset();
  };
  cancelPostBtn?.addEventListener('click', closeBox);
  closePostBoxBtn?.addEventListener('click', closeBox);

  // Submit Post (Create or Update)
  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isEditing = editIdInput && editIdInput.value.trim();
      const title = document.getElementById('comm-post-title').value.trim();
      const category = document.getElementById('comm-post-category').value;
      const content = document.getElementById('comm-post-content').value.trim();
      const author = document.getElementById('comm-post-author').value.trim();
      let country = document.getElementById('comm-post-country').value.trim() || 'Global';
      const password = document.getElementById('comm-post-password').value.trim();
      const tagsRaw = document.getElementById('comm-post-tags').value.trim();

      if (!title || !content || !author) return;

      if (!country.startsWith('🇺🇸') && !country.startsWith('🇯🇵') && !country.startsWith('🇰🇷') && !country.startsWith('🇬🇧') && !country.startsWith('🇨🇦')) {
        country = `🌍 ${country}`;
      }

      const tags = tagsRaw
        ? tagsRaw.split(/[,#\s]+/).filter(Boolean).map(t => t.startsWith('#') ? t : `#${t}`)
        : [];

      if (isEditing) {
        updateCommunityPost(isEditing, {
          title,
          category,
          content,
          author,
          country,
          tags,
          password: password || undefined
        });
        showToast({
          title: "Discussion Updated",
          message: t('postEditSuccess') || "Your discussion has been updated."
        });
        if (activeDetailPostId === isEditing) {
          openCommunityPostDetail(isEditing);
        }
      } else {
        saveCommunityPost({
          title,
          category,
          content,
          author,
          country,
          password: password || '1234',
          tags,
          status: 'published'
        });
        showToast({
          title: "Discussion Published",
          message: t('postSuccessToast') || "Your discussion post has been published!"
        });
        commCurrentPage = 1;
      }

      closeBox();
      renderCommunityBoard();
    });
  }

  // Category filter pills
  document.querySelectorAll('.comm-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.comm-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCommCategory = pill.dataset.commCategory || 'all';
      commCurrentPage = 1;
      renderCommunityBoard();
    });
  });

  // Search input
  const searchInput = document.getElementById('comm-search-input');
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        commSearchQuery = e.target.value.trim();
        commCurrentPage = 1;
        renderCommunityBoard();
      }, 250);
    });
  }

  // Sort select
  const sortSelect = document.getElementById('comm-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      commSortBy = e.target.value;
      commCurrentPage = 1;
      renderCommunityBoard();
    });
  }

  // View mode switcher (Cards vs Table)
  const btnViewCards = document.getElementById('btn-view-cards');
  const btnViewTable = document.getElementById('btn-view-table');

  if (btnViewCards && btnViewTable) {
    btnViewCards.addEventListener('click', () => {
      commViewMode = 'cards';
      btnViewCards.classList.add('active');
      btnViewTable.classList.remove('active');
      renderCommunityBoard();
    });

    btnViewTable.addEventListener('click', () => {
      commViewMode = 'table';
      btnViewTable.classList.add('active');
      btnViewCards.classList.remove('active');
      renderCommunityBoard();
    });
  }

  // Detail Modal Events
  const detailModal = document.getElementById('comm-detail-modal');
  const closeDetailBtn = document.getElementById('btn-close-detail-modal');
  closeDetailBtn?.addEventListener('click', () => {
    detailModal?.classList.remove('open');
  });

  detailModal?.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      detailModal.classList.remove('open');
    }
  });

  // Detail Like Button
  const btnDetailLike = document.getElementById('btn-detail-like');
  btnDetailLike?.addEventListener('click', () => {
    if (!activeDetailPostId) return;
    const res = likeCommunityPost(activeDetailPostId);
    document.getElementById('comm-detail-likes-count').textContent = res.likes;
    document.getElementById('comm-detail-likes-top').textContent = res.likes;
    const heart = document.getElementById('comm-detail-heart-icon');
    if (heart) heart.style.transform = 'scale(1.3)';
    setTimeout(() => { if (heart) heart.style.transform = 'scale(1)'; }, 200);
    renderCommunityBoard();
  });

  // Detail Share Link Button
  const btnDetailShare = document.getElementById('btn-detail-share');
  btnDetailShare?.addEventListener('click', () => {
    if (!activeDetailPostId) return;
    const url = `${window.location.origin}/community.html?postId=${activeDetailPostId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast({ title: "Link Copied", message: t('linkCopiedToast') || "Link copied to clipboard!" });
      });
    } else {
      showToast({ title: "Link Copied", message: url });
    }
  });

  // Detail Edit Button (Password Protected)
  const btnDetailEdit = document.getElementById('btn-detail-edit');
  btnDetailEdit?.addEventListener('click', () => {
    if (!activeDetailPostId) return;
    openPasswordModal({ type: 'edit-post', postId: activeDetailPostId });
  });

  // Detail Delete Button (Password Protected)
  const btnDetailDelete = document.getElementById('btn-detail-delete');
  btnDetailDelete?.addEventListener('click', () => {
    if (!activeDetailPostId) return;
    openPasswordModal({ type: 'delete-post', postId: activeDetailPostId });
  });

  // Reply Form Submit inside Detail Modal
  const replyForm = document.getElementById('comm-reply-form');
  replyForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!activeDetailPostId) return;

    const author = document.getElementById('comm-reply-author').value.trim();
    let country = document.getElementById('comm-reply-country').value.trim() || 'Global';
    const password = document.getElementById('comm-reply-password').value.trim();
    const content = document.getElementById('comm-reply-content').value.trim();

    if (!author || !content) return;
    if (!country.startsWith('🇺🇸') && !country.startsWith('🇯🇵') && !country.startsWith('🇰🇷') && !country.startsWith('🇬🇧') && !country.startsWith('🇨🇦')) {
      country = `🌍 ${country}`;
    }

    addCommunityComment(activeDetailPostId, {
      author,
      country,
      password: password || '1234',
      content
    });

    replyForm.reset();
    showToast({
      title: "Reply Posted",
      message: t('replySuccessToast') || "Reply posted successfully!"
    });

    const refreshedPost = getAllCommunityPostsRaw().find(p => p.id === activeDetailPostId);
    if (refreshedPost) {
      renderDetailComments(refreshedPost);
      document.getElementById('comm-detail-comments-top').textContent = (refreshedPost.replies || []).length;
      document.getElementById('comm-detail-replies-count').textContent = (refreshedPost.replies || []).length;
    }
    renderCommunityBoard();
  });

  // Password Modal Buttons
  const passModal = document.getElementById('comm-pass-modal');
  const btnCancelPass = document.getElementById('btn-cancel-pass-modal');
  const btnConfirmPass = document.getElementById('btn-confirm-pass-modal');
  const passInput = document.getElementById('comm-input-verify-password');

  btnCancelPass?.addEventListener('click', () => {
    passModal?.classList.remove('open');
    pendingPassAction = null;
  });

  passModal?.addEventListener('click', (e) => {
    if (e.target === passModal) {
      passModal.classList.remove('open');
      pendingPassAction = null;
    }
  });

  btnConfirmPass?.addEventListener('click', handlePasswordConfirm);
  passInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handlePasswordConfirm();
  });
}

function openPasswordModal(actionConfig) {
  pendingPassAction = actionConfig;
  const modal = document.getElementById('comm-pass-modal');
  const input = document.getElementById('comm-input-verify-password');
  const errorEl = document.getElementById('comm-pass-error');
  const titleEl = document.getElementById('comm-pass-title');
  const descEl = document.getElementById('comm-pass-desc');

  if (!modal || !input) return;
  input.value = '';
  if (errorEl) {
    errorEl.style.display = 'none';
    errorEl.textContent = '';
  }

  if (actionConfig.type === 'edit-post') {
    if (titleEl) titleEl.textContent = t('passwordPromptTitle') || 'Enter Post Passcode';
    if (descEl) descEl.textContent = 'Please enter your 4-digit passcode to edit this discussion.';
  } else if (actionConfig.type === 'delete-post') {
    if (titleEl) titleEl.textContent = t('deletePostBtn') || 'Delete Post';
    if (descEl) descEl.textContent = 'Please enter your passcode to permanently delete this discussion.';
  } else if (actionConfig.type === 'delete-comment') {
    if (titleEl) titleEl.textContent = 'Delete Reply';
    if (descEl) descEl.textContent = 'Please enter the passcode you set when leaving this reply.';
  }

  modal.classList.add('open');
  input.focus();
}

function handlePasswordConfirm() {
  if (!pendingPassAction) return;
  const input = document.getElementById('comm-input-verify-password');
  const errorEl = document.getElementById('comm-pass-error');
  const modal = document.getElementById('comm-pass-modal');
  const enteredPass = input ? input.value.trim() : '';

  if (!enteredPass) {
    if (errorEl) {
      errorEl.textContent = 'Please enter passcode.';
      errorEl.style.display = 'block';
    }
    return;
  }

  const { type, postId, commentId } = pendingPassAction;
  const post = getAllCommunityPostsRaw().find(p => p.id === postId);

  if (type === 'edit-post' || type === 'delete-post') {
    if (!post) {
      modal?.classList.remove('open');
      return;
    }

    if (post.password && post.password !== enteredPass) {
      if (errorEl) {
        errorEl.textContent = t('passwordIncorrect') || 'Incorrect passcode. Please try again.';
        errorEl.style.display = 'block';
      }
      return;
    }

    modal?.classList.remove('open');

    if (type === 'delete-post') {
      deleteCommunityPost(postId);
      document.getElementById('comm-detail-modal')?.classList.remove('open');
      showToast({ title: "Deleted", message: t('postDeleteSuccess') || "Post deleted successfully." });
      renderCommunityBoard();
    } else if (type === 'edit-post') {
      document.getElementById('comm-detail-modal')?.classList.remove('open');
      openEditPostBox(post);
    }
  } else if (type === 'delete-comment') {
    const result = deleteCommunityComment(postId, commentId, enteredPass);
    if (!result.success) {
      if (errorEl) {
        errorEl.textContent = result.message || 'Incorrect passcode.';
        errorEl.style.display = 'block';
      }
      return;
    }
    modal?.classList.remove('open');
    showToast({ title: "Deleted", message: t('commentDeleteSuccess') || "Reply deleted successfully." });
    const refreshedPost = getAllCommunityPostsRaw().find(p => p.id === postId);
    if (refreshedPost) {
      renderDetailComments(refreshedPost);
      document.getElementById('comm-detail-comments-top').textContent = (refreshedPost.replies || []).length;
      document.getElementById('comm-detail-replies-count').textContent = (refreshedPost.replies || []).length;
    }
    renderCommunityBoard();
  }
}

function openEditPostBox(post) {
  const postBox = document.getElementById('community-new-post-box');
  const formHeading = document.getElementById('comm-form-heading');
  const submitBtn = document.getElementById('btn-submit-comm-post');
  const editIdInput = document.getElementById('comm-edit-post-id');

  if (!postBox) return;

  if (editIdInput) editIdInput.value = post.id;
  document.getElementById('comm-post-title').value = post.title || '';
  document.getElementById('comm-post-category').value = post.category || 'Routine Advice';
  document.getElementById('comm-post-content').value = post.content || '';
  document.getElementById('comm-post-author').value = post.author || '';
  document.getElementById('comm-post-country').value = post.country || '';
  document.getElementById('comm-post-password').value = post.password || '';
  document.getElementById('comm-post-tags').value = (post.tags || []).join(', ');

  if (formHeading) formHeading.textContent = t('editPostBtn') || "Edit Discussion";
  if (submitBtn) submitBtn.textContent = "Update Post";

  postBox.classList.add('open');
  postBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCommunityBoard() {
  const container = document.getElementById('comm-posts-view-container');
  const pinnedContainer = document.getElementById('comm-pinned-notices');
  if (!container) return;

  const rawPosts = getAllCommunityPostsRaw().filter(p => p.status !== 'hidden');

  // 1. Render Pinned Notices
  if (pinnedContainer) {
    const pinnedPosts = rawPosts.filter(p => p.isPinned || p.category === 'Notice');
    if (pinnedPosts.length > 0 && (currentCommCategory === 'all' || currentCommCategory === 'Notice')) {
      pinnedContainer.style.display = 'flex';
      pinnedContainer.innerHTML = pinnedPosts.map(p => `
        <div class="comm-pinned-card" data-post-id="${p.id}">
          <div class="comm-pinned-title">
            <span class="comm-notice-badge">📌 ${t('pinnedNoticeBadge') || 'NOTICE'}</span>
            <span>${escapeHtml(p.title)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 14px; font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap;">
            <span>👁️ ${p.views || 0}</span>
            <span>💬 ${(p.replies || []).length}</span>
            <span>${p.date}</span>
          </div>
        </div>
      `).join('');

      pinnedContainer.querySelectorAll('.comm-pinned-card').forEach(card => {
        card.addEventListener('click', () => {
          openCommunityPostDetail(card.dataset.postId);
        });
      });
    } else {
      pinnedContainer.style.display = 'none';
      pinnedContainer.innerHTML = '';
    }
  }

  // 2. Filter & Sort posts
  const filteredPosts = getCommunityPosts({
    includeHidden: false,
    category: currentCommCategory,
    searchQuery: commSearchQuery,
    sortBy: commSortBy
  });

  if (filteredPosts.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 24px; color: var(--color-text-muted); background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-card-border);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🌸</div>
        <p style="font-size: 1.05rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 6px;">${t('noPostsFound') || 'No discussions found matching your filter.'}</p>
        <p style="font-size: 0.88rem; margin-bottom: 16px;">Be the first to share your K-Beauty holy grail discoveries or ask for routine advice!</p>
        <button class="btn-primary" onclick="document.getElementById('btn-open-new-post').click();" style="padding: 9px 20px; font-size: 0.88rem;">${t('askQuestionBtn') || '+ Start a Discussion'}</button>
      </div>
    `;
    renderPagination(0);
    return;
  }

  // 3. Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / commPageSize) || 1;
  commCurrentPage = Math.min(Math.max(1, commCurrentPage), totalPages);
  const startIndex = (commCurrentPage - 1) * commPageSize;
  const pagedPosts = filteredPosts.slice(startIndex, startIndex + commPageSize);

  // 4. Render View (Cards or Classic Table)
  if (commViewMode === 'table') {
    renderTableView(pagedPosts, container);
  } else {
    renderCardsView(pagedPosts, container);
  }

  // 5. Render Pagination
  renderPagination(totalPages);
}

function renderCardsView(posts, container) {
  container.innerHTML = `
    <div class="community-posts-list">
      ${posts.map(post => {
        const repliesCount = (post.replies || []).length;
        const isLiked = isPostLikedByMe(post.id);
        return `
          <div class="community-card" id="comm-card-${post.id}" data-post-id="${post.id}">
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
              <div style="display: flex; align-items: center; gap: 8px;">
                ${post.isPinned ? `<span class="comm-notice-badge">📌 NOTICE</span>` : ''}
                <span class="community-cat-badge">${escapeHtml(post.category)}</span>
              </div>
            </div>

            <h3 class="community-post-title">${escapeHtml(post.title)}</h3>
            <p class="community-post-content">${escapeHtml(post.content)}</p>

            ${post.tags && post.tags.length > 0 ? `
              <div class="community-tags-row">
                ${post.tags.map(tag => `<span class="comm-tag-chip">${escapeHtml(tag)}</span>`).join('')}
              </div>
            ` : ''}

            <div class="community-actions-bar">
              <div class="comm-actions-left">
                <button class="community-action-btn btn-card-like ${isLiked ? 'active' : ''}" data-post-id="${post.id}">
                  <span>❤️</span>
                  <span class="like-count">${post.likes || 0}</span>
                </button>
                <div style="color: var(--color-text-muted); display: inline-flex; align-items: center; gap: 5px;">
                  <span>💬</span>
                  <span>${repliesCount}</span>
                </div>
                <div style="color: var(--color-text-muted); display: inline-flex; align-items: center; gap: 5px;">
                  <span>👁️</span>
                  <span>${post.views || 0}</span>
                </div>
              </div>
              <button class="btn-secondary btn-card-read-more" data-post-id="${post.id}" style="padding: 6px 14px; font-size: 0.82rem;">
                <span>View & Reply ↗</span>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach card click listeners to open detail
  container.querySelectorAll('.community-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-card-like')) return;
      openCommunityPostDetail(card.dataset.postId);
    });
  });

  // Attach card like buttons
  container.querySelectorAll('.btn-card-like').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const postId = btn.dataset.postId;
      const res = likeCommunityPost(postId);
      btn.querySelector('.like-count').textContent = res.likes;
      if (res.isLiked) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  });
}

function renderTableView(posts, container) {
  container.innerHTML = `
    <div class="comm-table-wrap">
      <table class="comm-table">
        <thead>
          <tr>
            <th style="width: 70px; text-align: center;">No.</th>
            <th style="width: 130px;">분류</th>
            <th>제목</th>
            <th style="width: 140px;">작성자</th>
            <th style="width: 100px;">작성일</th>
            <th style="width: 70px; text-align: center;">조회</th>
            <th style="width: 70px; text-align: center;">추천</th>
          </tr>
        </thead>
        <tbody>
          ${posts.map(post => {
            const repliesCount = (post.replies || []).length;
            return `
              <tr class="comm-table-row" data-post-id="${post.id}">
                <td style="text-align: center; color: var(--color-text-muted); font-size: 0.8rem;">
                  ${post.isPinned ? '📌' : post.postNo || '#'}
                </td>
                <td>
                  <span class="community-cat-badge" style="font-size: 0.72rem; padding: 2px 7px;">
                    ${escapeHtml(post.category)}
                  </span>
                </td>
                <td>
                  <div class="comm-table-title">
                    <span>${escapeHtml(post.title)}</span>
                    ${repliesCount > 0 ? `<span class="comm-reply-count-badge">[${repliesCount}]</span>` : ''}
                  </div>
                </td>
                <td>
                  <div style="font-weight: 500; color: var(--color-text-main); font-size: 0.84rem;">
                    ${escapeHtml(post.author)}
                  </div>
                  <div style="font-size: 0.72rem; color: var(--color-text-muted);">
                    ${escapeHtml(post.country)}
                  </div>
                </td>
                <td style="font-size: 0.8rem; color: var(--color-text-muted);">
                  ${post.date}
                </td>
                <td style="text-align: center; font-size: 0.82rem; color: var(--color-text-muted);">
                  ${post.views || 0}
                </td>
                <td style="text-align: center; font-size: 0.82rem; color: var(--color-primary); font-weight: 600;">
                  ${post.likes || 0}
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Attach table row click listeners
  container.querySelectorAll('.comm-table-row').forEach(row => {
    row.addEventListener('click', () => {
      openCommunityPostDetail(row.dataset.postId);
    });
  });
}

function renderPagination(totalPages) {
  const paginationBar = document.getElementById('comm-pagination-bar');
  if (!paginationBar) return;

  if (totalPages <= 1) {
    paginationBar.innerHTML = '';
    return;
  }

  let html = `
    <button class="comm-page-btn" id="btn-page-first" ${commCurrentPage === 1 ? 'disabled' : ''} title="First Page">«</button>
    <button class="comm-page-btn" id="btn-page-prev" ${commCurrentPage === 1 ? 'disabled' : ''} title="Previous Page">‹</button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="comm-page-btn ${i === commCurrentPage ? 'active' : ''}" data-page="${i}">
        ${i}
      </button>
    `;
  }

  html += `
    <button class="comm-page-btn" id="btn-page-next" ${commCurrentPage === totalPages ? 'disabled' : ''} title="Next Page">›</button>
    <button class="comm-page-btn" id="btn-page-last" ${commCurrentPage === totalPages ? 'disabled' : ''} title="Last Page">»</button>
  `;

  paginationBar.innerHTML = html;

  paginationBar.querySelectorAll('.comm-page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      commCurrentPage = parseInt(btn.dataset.page, 10);
      renderCommunityBoard();
      document.getElementById('community-board-root')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.getElementById('btn-page-first')?.addEventListener('click', () => {
    if (commCurrentPage > 1) {
      commCurrentPage = 1;
      renderCommunityBoard();
      document.getElementById('community-board-root')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.getElementById('btn-page-prev')?.addEventListener('click', () => {
    if (commCurrentPage > 1) {
      commCurrentPage--;
      renderCommunityBoard();
      document.getElementById('community-board-root')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.getElementById('btn-page-next')?.addEventListener('click', () => {
    if (commCurrentPage < totalPages) {
      commCurrentPage++;
      renderCommunityBoard();
      document.getElementById('community-board-root')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  document.getElementById('btn-page-last')?.addEventListener('click', () => {
    if (commCurrentPage < totalPages) {
      commCurrentPage = totalPages;
      renderCommunityBoard();
      document.getElementById('community-board-root')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function openCommunityPostDetail(postId) {
  activeDetailPostId = postId;
  incrementPostViews(postId);

  const post = getAllCommunityPostsRaw().find(p => p.id === postId);
  if (!post) return;

  const modal = document.getElementById('comm-detail-modal');
  if (!modal) return;

  document.getElementById('comm-detail-cat-badge').textContent = post.category;
  document.getElementById('comm-detail-date').textContent = post.date;
  document.getElementById('comm-detail-title').textContent = post.title;
  document.getElementById('comm-detail-avatar').textContent = getAvatarInitials(post.author);
  document.getElementById('comm-detail-author').textContent = post.author;
  document.getElementById('comm-detail-country').textContent = post.country;
  document.getElementById('comm-detail-views').textContent = post.views || 0;
  document.getElementById('comm-detail-likes-top').textContent = post.likes || 0;
  document.getElementById('comm-detail-comments-top').textContent = (post.replies || []).length;

  document.getElementById('comm-detail-content').textContent = post.content;

  const tagsContainer = document.getElementById('comm-detail-tags');
  if (tagsContainer) {
    if (post.tags && post.tags.length > 0) {
      tagsContainer.innerHTML = post.tags.map(t => `<span class="comm-tag-chip">${escapeHtml(t)}</span>`).join('');
      tagsContainer.style.display = 'flex';
    } else {
      tagsContainer.innerHTML = '';
      tagsContainer.style.display = 'none';
    }
  }

  // Like button status
  const isLiked = isPostLikedByMe(postId);
  const btnLike = document.getElementById('btn-detail-like');
  document.getElementById('comm-detail-likes-count').textContent = post.likes || 0;
  if (btnLike) {
    if (isLiked) btnLike.classList.add('active');
    else btnLike.classList.remove('active');
  }

  // Render replies
  renderDetailComments(post);

  modal.classList.add('open');
}

function renderDetailComments(post) {
  const container = document.getElementById('comm-detail-comments-list');
  const countEl = document.getElementById('comm-detail-replies-count');
  if (!container) return;

  const replies = post.replies || [];
  if (countEl) countEl.textContent = replies.length;

  if (replies.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--color-text-muted); font-size: 0.88rem; background: var(--color-bg-alt); border-radius: var(--radius-sm);">
        No replies yet. Be the first to share your thoughts!
      </div>
    `;
    return;
  }

  container.innerHTML = replies.map(r => `
    <div class="comm-comment-item" id="comm-reply-${r.id}">
      <div class="comm-comment-header">
        <div class="comm-comment-author-info">
          <span style="font-size: 1rem;">💬</span>
          <span>${escapeHtml(r.author)}</span>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: normal;">${escapeHtml(r.country || '')}</span>
        </div>
        <div style="color: var(--color-text-muted); font-size: 0.78rem;">
          ${r.date}
        </div>
      </div>
      <div class="comm-comment-content">${escapeHtml(r.content)}</div>
      <div class="comm-comment-footer">
        <button type="button" class="comm-comment-btn btn-like-comment" data-comment-id="${r.id}">
          <span>❤️</span>
          <span class="comment-like-count">${r.likes || 0}</span>
        </button>
        <button type="button" class="comm-comment-btn delete btn-delete-comment" data-comment-id="${r.id}">
          <span>🗑️ Delete</span>
        </button>
      </div>
    </div>
  `).join('');

  // Comment like buttons
  container.querySelectorAll('.btn-like-comment').forEach(btn => {
    btn.addEventListener('click', () => {
      const commentId = btn.dataset.commentId;
      const res = likeCommunityComment(post.id, commentId);
      btn.querySelector('.comment-like-count').textContent = res.likes;
    });
  });

  // Comment delete buttons (password protected)
  container.querySelectorAll('.btn-delete-comment').forEach(btn => {
    btn.addEventListener('click', () => {
      const commentId = btn.dataset.commentId;
      openPasswordModal({
        type: 'delete-comment',
        postId: post.id,
        commentId
      });
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
