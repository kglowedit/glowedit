/**
 * Olive Young Global Affiliate Engine
 * Generates tracked affiliate links, logs outbound click events, and shows promo reminders
 */

import { recordAffiliateClick } from './data.js';
import { getLang, t } from './i18n.js';

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

  // 3. Show luxury toast notification reminding the user of the discount code
  showToast({
    title: t('officialAffiliateLink'),
    message: `${t('promoBarText')} ${PROMO_CODE} ${t('promoBarDiscount')}`,
    icon: '🛍️',
    duration: 3500
  });

  // 4. Open in new tab after a tiny delay so user reads the notification
  setTimeout(() => {
    window.open(trackedUrl, '_blank', 'noopener,noreferrer');
  }, 400);
}

export function copyPromoCode(btnElement) {
  navigator.clipboard.writeText(PROMO_CODE).then(() => {
    showToast({
      title: "PROMO CODE COPIED",
      message: `Code "${PROMO_CODE}" copied to clipboard! Paste at Olive Young Global checkout.`,
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

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
