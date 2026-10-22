import{l as P,m as g,n as q,o as R,s as S,x as U,w as L,q as B,p as c,u as D,v as j,c as k,y as H,z as M,C as G}from"./affiliate-Xnskpm3r.js";import{u as O}from"./seo-BdTqqitd.js";let h="all",b="all",y="",v="USD",E="all";function F(){P();const e=localStorage.getItem("kbeauty_currency");e&&G[e]&&(v=e),W(),Y(),N(),Q(),C(),_(),T()}function W(){const e=document.getElementById("lang-select");e&&(e.value=g(),e.addEventListener("change",s=>{q(s.target.value),C(),T()}));const a=document.getElementById("currency-select");a&&(a.value=v,a.addEventListener("change",s=>{v=s.target.value,localStorage.setItem("kbeauty_currency",v),X()}));const o=document.getElementById("promo-code-btn");o&&o.addEventListener("click",()=>R(o));const t=document.getElementById("search-input");t&&t.addEventListener("input",s=>{y=s.target.value.toLowerCase().trim(),f()});const n=document.getElementById("seo-diagnostics-fab"),i=document.getElementById("seo-drawer"),r=document.getElementById("seo-drawer-close");n&&i&&n.addEventListener("click",()=>{i.classList.toggle("open"),i.classList.contains("open")&&Z()}),r&&i&&r.addEventListener("click",()=>i.classList.remove("open")),document.querySelectorAll(".filter-pill[data-category]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-category]").forEach(d=>d.classList.remove("active")),s.classList.add("active"),h=s.dataset.category,f()})}),document.querySelectorAll(".filter-pill[data-skintype]").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-skintype]").forEach(d=>d.classList.remove("active")),s.classList.add("active"),b=s.dataset.skintype,f()})})}function Y(){const e=document.getElementById("newsletter-form");e&&e.addEventListener("submit",a=>{a.preventDefault(),document.getElementById("newsletter-email").value&&(S({title:"Welcome to K-beuty Glow Edit",message:"Your exclusive 10% Olive Young promo code GLOW10 has been dispatched to your inbox."}),e.reset())})}function N(){const e=document.getElementById("btn-run-routine");e&&e.addEventListener("click",()=>{A()})}function C(){K(),J(),f(),x()}function K(){document.querySelectorAll("[data-i18n]").forEach(e=>{const a=e.dataset.i18n;a&&(e.textContent=c(a))}),document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{const a=e.dataset.i18nPlaceholder;a&&e.setAttribute("placeholder",c(a))})}function J(){const e=document.getElementById("featured-story-wrap");if(!e)return;const a=L(),o=a.find(s=>s.featured)||a[0];if(!o)return;const t=g(),n=o.title[t]||o.title.en,i=o.excerpt[t]||o.excerpt.en,r=`/article.html?slug=${encodeURIComponent(o.slug)}`;e.innerHTML=`
    <div class="featured-story-card" id="featured-${o.id}">
      <div class="featured-img-wrap">
        <a href="${r}">
          <img src="${o.coverImage}" alt="${n}" class="featured-img" loading="eager" />
        </a>
      </div>
      <div class="featured-content">
        <div class="meta-row">
          <span class="badge-featured">${c("featuredBadge")}</span>
          <span>•</span>
          <span>${o.readTime} ${c("readTime")}</span>
          <span>•</span>
          <span>${o.views.toLocaleString()} ${c("views")}</span>
        </div>
        <h2 class="featured-headline">
          <a href="${r}" style="color: inherit; text-decoration: none;">${n}</a>
        </h2>
        <p class="featured-excerpt">${i}</p>
        <div class="author-bar">
          <img src="${o.author.avatar}" alt="${o.author.name}" class="author-avatar" />
          <div>
            <div class="author-name">${o.author.name}</div>
            <div class="author-role">${o.author.role}</div>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <a href="${r}" class="btn-primary" style="padding: 10px 22px; font-size: 0.9rem; text-decoration: none; display: inline-flex;">
            ${c("readFullArticle")} →
          </a>
        </div>
      </div>
    </div>
  `}function f(){const e=document.getElementById("articles-grid");if(!e)return;const a=g(),t=L().filter(n=>{const i=h==="all"||n.category===h,r=b==="all"||n.skinType===b||n.skinType==="all",s=(n.title[a]||n.title.en||"").toLowerCase(),d=(n.excerpt[a]||n.excerpt.en||"").toLowerCase(),u=!y||s.includes(y)||d.includes(y);return i&&r&&u});if(t.length===0){e.innerHTML=`
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">No guides found matching your filter criteria.</p>
        <button class="btn-secondary" id="reset-filter-btn" style="padding: 8px 18px; font-size: 0.85rem;">Clear Filters</button>
      </div>
    `;const n=document.getElementById("reset-filter-btn");n&&n.addEventListener("click",()=>{h="all",b="all",y="",document.querySelectorAll(".filter-pill").forEach(i=>i.classList.remove("active")),document.querySelectorAll('.filter-pill[data-category="all"], .filter-pill[data-skintype="all"]').forEach(i=>i.classList.add("active")),f()});return}e.innerHTML=t.map(n=>{const i=n.title[a]||n.title.en,r=n.excerpt[a]||n.excerpt.en,s=`/article.html?slug=${encodeURIComponent(n.slug)}`;return`
      <article class="article-card" data-article-id="${n.id}">
        <a href="${s}" style="text-decoration: none; color: inherit; display: block;">
          <div class="article-thumb-wrap">
            <img src="${n.coverImage}" alt="${i}" class="article-thumb" loading="lazy" />
            <span class="category-tag-float">${ee(n.category)}</span>
          </div>
          <div class="article-body">
            <div class="meta-row" style="font-size: 0.78rem;">
              <span>${n.readTime} ${c("readTime")}</span>
              <span>•</span>
              <span>${n.publishDate}</span>
            </div>
            <h3 class="article-title">${i}</h3>
            <p class="article-snippet">${r}</p>
            <div class="article-footer">
              <span>${n.views.toLocaleString()} ${c("views")}</span>
              <span class="read-more-link">${c("readFullArticle")} →</span>
            </div>
          </div>
        </a>
      </article>
    `}).join("")}function _(){const e=window.location.hash.replace("#","");if(!e)return;const o=L().find(t=>t.slug===e||t.id===e);o&&(window.location.href=`/article.html?slug=${encodeURIComponent(o.slug)}`)}function Q(){const e=document.getElementById("btn-open-new-post"),a=document.getElementById("btn-cancel-post"),o=document.getElementById("community-new-post-box"),t=document.getElementById("community-post-form");e&&o&&e.addEventListener("click",()=>{var n;o.classList.toggle("open"),o.classList.contains("open")&&((n=document.getElementById("comm-post-title"))==null||n.focus())}),a&&o&&a.addEventListener("click",()=>{o.classList.remove("open"),t==null||t.reset()}),t&&t.addEventListener("submit",n=>{n.preventDefault();const i=document.getElementById("comm-post-title").value.trim(),r=document.getElementById("comm-post-category").value,s=document.getElementById("comm-post-content").value.trim(),d=document.getElementById("comm-post-author").value.trim();let u=document.getElementById("comm-post-country").value.trim()||"Global";if(!u.startsWith("🇺🇸")&&!u.startsWith("🇯🇵")&&!u.startsWith("🇰🇷")&&!u.startsWith("🇬🇧")&&!u.startsWith("🇨🇦")&&(u=`🌍 ${u}`),!i||!s||!d)return;const $={id:`post-${Date.now()}`,title:i,category:r,content:s,author:d,country:u,date:"Just now",likes:1,replies:[]};U($),t.reset(),o.classList.remove("open"),S({title:"Discussion Published",message:"Your topic has been posted to the global K-Beauty community."}),x()}),document.querySelectorAll(".comm-filter-pill").forEach(n=>{n.addEventListener("click",()=>{document.querySelectorAll(".comm-filter-pill").forEach(i=>i.classList.remove("active")),n.classList.add("active"),E=n.dataset.commCategory||"all",x()})})}function x(){const e=document.getElementById("community-posts-list");if(!e)return;const o=k().filter(t=>E==="all"?!0:t.category===E);if(o.length===0){e.innerHTML=`
      <div style="text-align: center; padding: 40px; color: var(--color-text-muted); background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-card-border);">
        <p style="font-size: 1rem; margin-bottom: 8px;">No discussions found under this category yet.</p>
        <button class="btn-primary" onclick="document.getElementById('btn-open-new-post').click();" style="padding: 8px 16px; font-size: 0.85rem;">Be the first to ask!</button>
      </div>
    `;return}e.innerHTML=o.map(t=>{const n=(t.replies||[]).length;return`
      <div class="community-card" id="comm-card-${t.id}">
        <div class="community-card-header">
          <div class="community-author-row">
            <span class="community-avatar">${V(t.author)}</span>
            <div>
              <div class="community-author-name">
                ${m(t.author)}
                <span class="community-author-country">${m(t.country)}</span>
              </div>
              <div class="community-post-date">${t.date}</div>
            </div>
          </div>
          <span class="community-cat-badge">${m(t.category)}</span>
        </div>

        <h3 class="community-post-title">${m(t.title)}</h3>
        <p class="community-post-content">${m(t.content)}</p>

        <div class="community-actions-bar">
          <button class="community-action-btn btn-like-post" data-post-id="${t.id}">
            <span>❤️</span>
            <span class="like-count">${t.likes||0}</span>
          </button>
          <button class="community-action-btn btn-toggle-replies" data-post-id="${t.id}">
            <span>💬</span>
            <span>${n} ${n===1?"Reply":"Replies"}</span>
          </button>
        </div>

        <!-- Replies Drawer -->
        <div class="community-replies-drawer" id="replies-${t.id}" style="display: none; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--color-card-border);">
          <div class="replies-list" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
            ${(t.replies||[]).map(i=>`
              <div style="background: rgba(0,0,0,0.02); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.85rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-weight: 600; color: var(--color-text-main);">
                  <span>${m(i.author)} <small style="color: var(--color-text-muted); font-weight: normal;">${m(i.country||"")}</small></span>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted);">${i.date}</span>
                </div>
                <div style="color: var(--color-text-secondary); line-height: 1.4;">${m(i.content)}</div>
              </div>
            `).join("")}
          </div>

          <!-- Add reply form -->
          <form class="inline-reply-form" data-post-id="${t.id}" style="display: flex; gap: 8px;">
            <input type="text" class="custom-select reply-input" placeholder="Write a reply..." required style="flex: 1; padding: 8px 12px; font-size: 0.85rem;" />
            <button type="submit" class="btn-primary" style="padding: 8px 14px; font-size: 0.82rem; white-space: nowrap;">Reply</button>
          </form>
        </div>
      </div>
    `}).join(""),e.querySelectorAll(".btn-like-post").forEach(t=>{t.addEventListener("click",n=>{const i=t.dataset.postId;H(i);const r=k().find(s=>s.id===i);r&&(t.querySelector(".like-count").textContent=r.likes,t.style.color="#EC4899")})}),e.querySelectorAll(".btn-toggle-replies").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.postId,i=document.getElementById(`replies-${n}`);i&&(i.style.display=i.style.display==="none"?"block":"none")})}),e.querySelectorAll(".inline-reply-form").forEach(t=>{t.addEventListener("submit",n=>{n.preventDefault();const i=t.dataset.postId,s=t.querySelector(".reply-input").value.trim();if(!s)return;M(i,{author:"Skincare Lover",country:"Global Reader",date:"Just now",content:s}),x();const d=document.getElementById(`replies-${i}`);d&&(d.style.display="block")})})}function V(e){if(!e)return"K";const a=e.trim().split(" ");return a.length>=2?`${a[0][0]}${a[1][0]}`.toUpperCase():e.slice(0,2).toUpperCase()}function m(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function A(){const e=document.getElementById("routine-skin-select"),a=document.getElementById("routine-goal-select"),o=document.getElementById("routine-results-container"),t=document.getElementById("routine-steps-grid");if(!e||!a||!o||!t)return;e.value;const n=a.value,i=g(),r=B();let s=r.find(l=>l.id==="anua-heartleaf-toner"),d=r.find(l=>l.id==="torriden-dive-in-serum"),u=r.find(l=>l.id==="round-lab-birch-sunscreen");n==="glow"?(d=r.find(l=>l.id==="cosrx-snail-mucin-essence")||d,u=r.find(l=>l.id==="beauty-of-joseon-sunscreen")||u):n==="calm"&&(s=r.find(l=>l.id==="mediheal-madecassoside-pad")||s);const $=[{title:"Step 1: Low-pH Toner & Prep",product:s,note:"Balances skin mantle and opens cellular hydration channels."},{title:"Step 2: Active Repair Ampoule",product:d,note:"Infuses multi-depth moisture and reinforces damaged barrier lipids."},{title:"Step 3: Lightweight Daily Sun Shield",product:u,note:"Broad-spectrum SPF 50+ essential to prevent hyperpigmentation."}];t.innerHTML=$.map((l,w)=>{const p=l.product,I=p.name[i]||p.name.en,z=D(p.priceUSD,v);return`
      <div class="step-box">
        <span class="step-number">${l.title}</span>
        <div style="font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.4;">${l.note}</div>
        <img src="${p.image}" alt="${I}" style="height: 130px; object-fit: contain; margin: 10px 0; border-radius: var(--radius-sm);" />
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${p.brand}</div>
        <div style="font-size: 0.9rem; font-weight: 600; line-height: 1.35;">${I}</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: auto;">Tested reference: ${z}</div>
        <a href="${p.oliveYoungUrl}" class="btn-primary" data-product-id="${p.id}" data-url="${p.oliveYoungUrl}" style="padding: 8px 12px; font-size: 0.8rem; margin-top: 10px; border-radius: var(--radius-sm); justify-content: center; text-decoration: none;">
          ${c("viewOnOliveYoung")}
        </a>
      </div>
    `}).join(""),t.querySelectorAll(".btn-primary").forEach(l=>{l.addEventListener("click",w=>{j(w,l.dataset.productId,l.dataset.url,"routine_diagnostic")})}),o.classList.add("visible"),o.scrollIntoView({behavior:"smooth",block:"nearest"})}function X(){const e=document.getElementById("routine-results-container");e&&e.classList.contains("visible")&&A()}function T(){const e=g(),a={en:"Curated K-Beauty intelligence, glass skin routines, and Olive Young Global shopping guides with exclusive promo code discounts.",zh:"首尔正统韩系护肤专栏、水光肌公式与 Olive Young Global 全球直邮省钱指南，独家专享海淘优惠码。",ja:"ソウル発の最新韓国スキンケアトレンド、水光肌ルーティン、オリーブヤンググローバル公式通販の購入ガイド。"};O({title:`${c("brandName")} | ${c("brandTagline")}`,description:a[e]||a.en,products:B()})}function Z(){const e=document.getElementById("seo-inspector-data");if(!e)return;const a=g(),o=window.location.origin+window.location.pathname,t=document.getElementById("seo-json-ld"),n=t?t.textContent:"Generating...";e.innerHTML=`
    <div>
      <strong>Active Language:</strong> <code>${a}</code>
    </div>
    <div>
      <strong>Canonical Tag:</strong> <code>${o}</code>
    </div>
    <div>
      <strong>Hreflang Targets:</strong>
      <ul style="padding-left: 20px; margin-top: 6px;">
        <li><code>en</code>: ${o}?hl=en</li>
        <li><code>zh</code>: ${o}?hl=zh</li>
        <li><code>ja</code>: ${o}?hl=ja</li>
        <li><code>x-default</code>: ${o}?hl=en</li>
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
      <pre class="seo-code-box">${n}</pre>
    </div>
  `}function ee(e){return{awards:c("filterAwards"),"glass-skin":c("filterGlassSkin"),"sun-care":c("filterSunCare"),trouble:c("filterTrouble")}[e]||e}document.addEventListener("DOMContentLoaded",()=>{F()});
