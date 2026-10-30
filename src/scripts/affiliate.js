/**
 * Olive Young Global Affiliate & Promotion Engine
 * Handles tracked affiliate links, promo code management, dynamic banner & coupon rendering, and toast reminders
 */

import { recordAffiliateClick, getPromoSettings, savePromoSettings, DEFAULT_PROMO_SETTINGS } from './data.js';
import { getLang, t } from './i18n.js';

export { getPromoSettings, savePromoSettings, DEFAULT_PROMO_SETTINGS };

export function getActivePromoCode() {
  const settings = getPromoSettings();
  return settings.topBanner?.promoCode || settings.eventCoupon?.promoCode || "GLOW10";
}

// Fallback constant for backwards compatibility
export const PROMO_CODE = "GLOW10";

export function buildOliveYoungUrl(baseUrl, subId = "global_editorial") {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('aff_id', 'glowseoul');
    url.searchParams.set('sub_id', `${getLang()}_${subId}`);
    url.searchParams.set('utm_source', 'seoul_glow_edit');
    url.searchParams.set('utm_medium', 'affiliate');
    url.searchParams.set('utm_campaign', 'olive_young_bestsellers');
    return url.toString();
  } catch (e) {
    return baseUrl;
  }
}

export function handleAffiliateClick(e, productId, directUrl, source = "product_card") {
  e.preventDefault();
  
  // 1. Record analytics
  recordAffiliateClick(productId, source);

  // 2. Build final tracking URL
  const trackedUrl = buildOliveYoungUrl(directUrl, source);
  const activeCode = getActivePromoCode();

  // 3. Show luxury toast notification reminding the user of the discount code
  showToast({
    title: t('officialAffiliateLink'),
    message: `${t('promoBarText')} ${activeCode} ${t('promoBarDiscount')}`,
    icon: '🛍️',
    duration: 3500
  });

  // 4. Open in new tab after a tiny delay so user reads the notification
  setTimeout(() => {
    window.open(trackedUrl, '_blank', 'noopener,noreferrer');
  }, 400);
}

export function copyPromoCode(btnElement, customCode = null) {
  const codeToCopy = customCode || getActivePromoCode();
  const settings = getPromoSettings();
  const successMsg = settings.eventCoupon?.copySuccessMessage
    ? settings.eventCoupon.copySuccessMessage.replace(/GLOW10/g, codeToCopy)
    : `Code "${codeToCopy}" copied to clipboard! Paste at checkout.`;

  navigator.clipboard.writeText(codeToCopy).then(() => {
    showToast({
      title: "PROMO CODE COPIED",
      message: successMsg,
      icon: '✨'
    });

    if (btnElement) {
      const origText = btnElement.innerText;
      btnElement.innerText = "✓ " + t('codeCopied');
      btnElement.classList.add('copied');
      setTimeout(() => {
        btnElement.innerText = origText;
        btnElement.classList.remove('copied');
      }, 2500);
    }
  }).catch(err => {
    console.error('Failed to copy', err);
  });
}

export function showToast({ title, message, icon = '✨', duration = 3000 }) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Apply dynamic promotion settings (top banner, sidebar coupon, floating coupon) to DOM
 */
export function applyPromoSettingsToDOM() {
  const settings = getPromoSettings();
  const currentLang = getLang();

  const isTopEnabled = Boolean(settings?.topBanner?.enabled);
  const isCouponEnabled = Boolean(settings?.eventCoupon?.enabled);

  // Sync Root document classes immediately
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('hide-top-promo', !isTopEnabled);
    document.documentElement.classList.toggle('hide-sidebar-promo', !isCouponEnabled);
  }

  // 1. Top Banner
  const topBar = document.getElementById('top-promo-bar') || document.querySelector('.top-promo-bar');
  if (topBar) {
    if (!isTopEnabled) {
      topBar.style.setProperty('display', 'none', 'important');
      topBar.setAttribute('hidden', '');
      topBar.classList.add('is-hidden');
    } else {
      topBar.removeAttribute('hidden');
      topBar.classList.remove('is-hidden');
      topBar.style.setProperty('display', 'flex', 'important');

      // Update background theme
      topBar.classList.remove('theme-dark', 'theme-rose', 'theme-gold', 'theme-emerald');
      const theme = settings.topBanner.bgTheme || 'dark';
      topBar.classList.add(`theme-${theme}`);

      // Update Badge
      const badgeEl = topBar.querySelector('.promo-badge');
      if (badgeEl && settings.topBanner.badge) {
        badgeEl.textContent = settings.topBanner.badge;
      }

      // Update Text based on current language
      const textEl = document.getElementById('top-promo-text') || topBar.querySelector('[data-i18n="promoBarText"]');
      if (textEl) {
        let txt = settings.topBanner.textEn || settings.topBanner.text || t('promoBarText');
        if (currentLang === 'zh' && settings.topBanner.textZh) txt = settings.topBanner.textZh;
        else if (currentLang === 'ja' && settings.topBanner.textJa) txt = settings.topBanner.textJa;
        else if (currentLang === 'ko' && settings.topBanner.textKo) txt = settings.topBanner.textKo;
        textEl.textContent = txt;
      }

      // Update Promo Code in button
      const codeSpan = document.getElementById('top-promo-code') || topBar.querySelector('.promo-code-btn span:first-child');
      if (codeSpan && settings.topBanner.promoCode) {
        codeSpan.textContent = settings.topBanner.promoCode;
      }

      // Update Discount Text based on current language
      const discEl = document.getElementById('top-promo-discount') || topBar.querySelector('[data-i18n="promoBarDiscount"]');
      if (discEl) {
        let disc = settings.topBanner.discountEn || settings.topBanner.discount || t('promoBarDiscount');
        if (currentLang === 'zh' && settings.topBanner.discountZh) disc = settings.topBanner.discountZh;
        else if (currentLang === 'ja' && settings.topBanner.discountJa) disc = settings.topBanner.discountJa;
        else if (currentLang === 'ko' && settings.topBanner.discountKo) disc = settings.topBanner.discountKo;
        discEl.textContent = disc;
      }
    }
  }

  // 2. Sidebar Promo Widget (Right Sidebar Coupon on Main Page)
  const sidebarWidget = document.getElementById('sidebar-promo-widget') || document.querySelector('.sidebar-promo-widget');
  if (sidebarWidget) {
    if (!isCouponEnabled) {
      sidebarWidget.style.setProperty('display', 'none', 'important');
      sidebarWidget.setAttribute('hidden', '');
      sidebarWidget.classList.add('is-hidden');
    } else {
      sidebarWidget.removeAttribute('hidden');
      sidebarWidget.classList.remove('is-hidden');
      sidebarWidget.style.setProperty('display', 'block', 'important');

      const badgeEl = sidebarWidget.querySelector('.sidebar-promo-badge');
      if (badgeEl && settings.eventCoupon.badge) {
        badgeEl.textContent = settings.eventCoupon.badge;
      }

      const titleEl = sidebarWidget.querySelector('h4');
      if (titleEl && settings.eventCoupon.title) {
        titleEl.textContent = settings.eventCoupon.title;
      }

      const descEl = sidebarWidget.querySelector('p');
      if (descEl && settings.eventCoupon.desc) {
        descEl.textContent = settings.eventCoupon.desc;
      }

      const codeEl = sidebarWidget.querySelector('code');
      if (codeEl && settings.eventCoupon.promoCode) {
        codeEl.textContent = settings.eventCoupon.promoCode;
      }

      // Optional direct shop link button
      let linkEl = sidebarWidget.querySelector('.sidebar-promo-shop-link');
      if (settings.eventCoupon.landingUrl) {
        if (!linkEl) {
          linkEl = document.createElement('a');
          linkEl.className = 'sidebar-promo-shop-link';
          linkEl.target = '_blank';
          linkEl.rel = 'noopener noreferrer';
          sidebarWidget.appendChild(linkEl);
        }
        linkEl.href = settings.eventCoupon.landingUrl;
        linkEl.innerHTML = `<span>${settings.eventCoupon.targetMallName || 'Olive Young Global'}</span> <span>↗</span>`;
      } else if (linkEl) {
        linkEl.remove();
      }
    }
  }

  // 3. Floating Coupon Widget (Bottom Right)
  renderFloatingCouponWidget(settings);
}

/**
 * Render or remove floating coupon pill on bottom-right of viewport
 */
export function renderFloatingCouponWidget(settings = null) {
  if (!settings) settings = getPromoSettings();

  const isCouponEnabled = Boolean(settings?.eventCoupon?.enabled);
  const isFloatingEnabled = Boolean(settings?.eventCoupon?.floatingEnabled);

  const existing = document.getElementById('floating-coupon-pill');
  if (!isCouponEnabled || !isFloatingEnabled) {
    if (existing) existing.remove();
    return;
  }

  const promoCode = settings.eventCoupon.promoCode || "GLOW10";
  const discountTag = settings.eventCoupon.discountTag || "10% OFF";

  let pill = existing;
  if (!pill) {
    pill = document.createElement('div');
    pill.id = 'floating-coupon-pill';
    pill.className = 'floating-coupon-pill';
    pill.setAttribute('role', 'region');
    pill.setAttribute('aria-label', 'Reader Promotion Coupon');
    document.body.appendChild(pill);
  }

  pill.innerHTML = `
    <div class="floating-coupon-inner">
      <span class="floating-coupon-icon" aria-hidden="true">🎁</span>
      <div class="floating-coupon-info">
        <span class="floating-coupon-tag">${discountTag}</span>
        <strong class="floating-coupon-code">${promoCode}</strong>
      </div>
      <button class="floating-coupon-btn" id="floating-coupon-btn" title="Click to copy coupon code">
        <span>Copy</span>
        <span>📋</span>
      </button>
    </div>
  `;

  const btn = pill.querySelector('#floating-coupon-btn');
  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    copyPromoCode(btn, promoCode);
  });

  pill.addEventListener('click', () => {
    copyPromoCode(btn, promoCode);
  });
}

export function initPromoCodeButtons() {
  // Apply current settings
  applyPromoSettingsToDOM();

  const barBtn = document.getElementById('promo-code-btn');
  const sidebarBtn = document.getElementById('sidebar-promo-copy-btn');
  
  barBtn?.addEventListener('click', () => {
    const settings = getPromoSettings();
    copyPromoCode(barBtn, settings.topBanner.promoCode);
  });

  sidebarBtn?.addEventListener('click', () => {
    const settings = getPromoSettings();
    copyPromoCode(sidebarBtn, settings.eventCoupon.promoCode);
  });
}

// Real-time synchronization across open tabs when promo settings change
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'kbeauty_promo_settings') {
      applyPromoSettingsToDOM();
    }
  });
}
