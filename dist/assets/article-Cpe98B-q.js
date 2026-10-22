import{w as x,x as c,y as h,z as b,A as l,g as E,B as I,C as $,D as w,E as B,F as C}from"./affiliate-BxmYfbm8.js";/* empty css             */import{u as F}from"./seo-Bkyl5X7b.js";let d="USD",n=null;document.addEventListener("DOMContentLoaded",()=>{x();const t=localStorage.getItem("kbeauty_currency");t&&C[t]&&(d=t),L(),y()});function L(){const t=document.getElementById("lang-select");t&&(t.value=c(),t.addEventListener("change",o=>{h(o.target.value),y()}));const i=document.getElementById("currency-select");i&&(i.value=d,i.addEventListener("change",o=>{d=o.target.value,localStorage.setItem("kbeauty_currency",d),v()}));const a=document.getElementById("promo-code-btn");a&&a.addEventListener("click",()=>b(a));const r=document.getElementById("btn-share-article");r&&r.addEventListener("click",()=>{navigator.clipboard.writeText(window.location.href).then(()=>{alert(l("linkCopied"))})});const e=document.getElementById("article-comment-form");e&&e.addEventListener("submit",k)}function y(){var s,u,g;const t=c(),a=new URLSearchParams(window.location.search).get("slug"),r=E();if(n=r.find(p=>p.slug===a||p.id===a)||r[0],!n){document.getElementById("article-main-content").innerHTML=`
      <div style="text-align: center; padding: 60px 20px;">
        <h2>Article Not Found</h2>
        <a href="/" class="btn-primary" style="margin-top: 16px;">Back to All Stories</a>
      </div>
    `;return}if(n.status==="draft"){document.getElementById("article-main-content").innerHTML=`
      <div style="text-align: center; padding: 70px 20px; max-width: 600px; margin: 0 auto;">
        <div style="font-size: 3.5rem; margin-bottom: 16px;">🔒</div>
        <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); color: #F59E0B; border: 1px solid rgba(245, 158, 11, 0.35); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; margin-bottom: 14px;">
          임시 저장 (비공개) 문서
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 1.8rem; margin-bottom: 12px; color: var(--color-text-main);">이 글은 현재 비공개 상태입니다</h2>
        <p style="color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 24px;">
          작성자가 글을 임시 저장하였거나 비공개 처리하여 일반 독자에게 노출되지 않습니다. 관리자 스튜디오에서 [발행] 상태로 변경하면 정상적으로 열람하실 수 있습니다.
        </p>
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
          <a href="/" class="btn-secondary" style="padding: 10px 22px;">← 블로그 홈으로 이동</a>
          <a href="/admin.html" class="btn-primary" style="padding: 10px 22px;">🛠️ 관리자 스튜디오로 이동</a>
        </div>
      </div>
    `;return}const e=n.title[t]||n.title.en,o=n.excerpt[t]||n.excerpt.en,m=n.content[t]||n.content.en;document.title=`${e} | K-beuty Glow Edit`,F({title:`${e} | K-beuty Glow Edit`,description:o,image:n.coverImage,type:"article",article:n}),document.getElementById("post-category-tag").textContent=n.category.toUpperCase(),document.getElementById("post-read-time").textContent=`${n.readTime} ${l("readTime")}`,document.getElementById("post-views").textContent=`${(n.views||12e3).toLocaleString()} ${l("views")}`,document.getElementById("post-title").textContent=e,document.getElementById("post-date").textContent=n.publishDate||"2026-10-18",document.getElementById("post-author-name").textContent=((s=n.author)==null?void 0:s.name)||"Min-Ji Kang",document.getElementById("post-author-role").textContent=((u=n.author)==null?void 0:u.role)||"Beauty Editor",document.getElementById("post-author-avatar").src=((g=n.author)==null?void 0:g.avatar)||"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",document.getElementById("post-cover-image").src=n.coverImage,document.getElementById("post-cover-image").alt=e,document.getElementById("post-body-prose").innerHTML=A(m),v(),f(),S()}function v(){const t=document.getElementById("post-embedded-products");if(!t||!n)return;const i=c(),a=I(),r=(n.products||[]).map(e=>a.find(o=>o.id===e)).filter(Boolean);if(r.length===0){t.innerHTML="";return}t.innerHTML=`
    <div style="background: #FAF7F5; border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); padding: 28px; margin: 40px 0;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span style="font-size: 1.2rem;">✨</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--color-text-main);">
          ${l("relatedProductsInArticle")}
        </h3>
      </div>
      <p style="font-size: 0.88rem; color: var(--color-text-secondary); margin-bottom: 20px; line-height: 1.5;">
        Formulations rigorously analyzed and tested by our Seoul beauty desk. Available worldwide via Olive Young Global with international tracking.
      </p>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${r.map(e=>{const o=e.name[i]||e.name.en,m=e.badge[i]||e.badge.en,s=$(e.priceUSD,d);return`
            <div style="background: #FFFFFF; border: 1px solid var(--color-card-border); border-radius: var(--radius-md); padding: 18px; display: grid; grid-template-columns: 88px 1fr auto; gap: 18px; align-items: center;">
              <img src="${e.image}" alt="${o}" style="width: 88px; height: 88px; object-fit: contain; background: #FDFBFA; border-radius: var(--radius-xs); padding: 4px;" />
              <div>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${e.brand} • ${m}</div>
                <div style="font-size: 1rem; font-weight: 600; color: var(--color-text-main); line-height: 1.35; margin: 3px 0;">${o}</div>
                <div style="font-size: 0.82rem; color: var(--color-text-muted);">Olive Young Global Ref: <strong>${s}</strong></div>
              </div>
              <div>
                <a href="${e.oliveYoungUrl}" 
                   class="btn-primary" 
                   data-product-id="${e.id}" 
                   data-url="${e.oliveYoungUrl}"
                   style="padding: 10px 18px; font-size: 0.85rem; border-radius: var(--radius-sm); white-space: nowrap;">
                  <span>${l("viewOnOliveYoung")}</span>
                </a>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `,t.querySelectorAll(".btn-primary").forEach(e=>{e.addEventListener("click",o=>{w(o,e.dataset.productId,e.dataset.url,"article_page")})})}function f(){const t=document.getElementById("article-comments-list");if(!t||!n)return;const i=`comments_${n.id}`,a=JSON.parse(localStorage.getItem(i)||"[]"),e=[...[{author:"Emily Watson",country:"🇺🇸 USA",date:"Yesterday",text:"This guide completely changed how I look at Korean skincare steps. Ordering the Round Lab sunscreen right now with code GLOW10!"},{author:"Yuki Tanaka",country:"🇯🇵 Japan",date:"2 days ago",text:"とても参考になりました。特に水分の重ね塗りの解説がわかりやすいです。"}],...a];t.innerHTML=e.map(o=>`
    <div style="background: #FFFFFF; border: 1px solid var(--color-card-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 0.82rem;">
        <span style="font-weight: 600; color: var(--color-text-main);">${o.author} <span style="font-weight: 400; color: var(--color-text-muted);">(${o.country})</span></span>
        <span style="color: var(--color-text-muted);">${o.date}</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5;">${o.text}</p>
    </div>
  `).join("")}function k(t){t.preventDefault();const i=document.getElementById("comment-author"),a=document.getElementById("comment-country"),r=document.getElementById("comment-text");if(!i||!r||!r.value.trim())return;const e=`comments_${n.id}`,o=JSON.parse(localStorage.getItem(e)||"[]");o.unshift({author:i.value.trim()||"Anonymous Reader",country:a?a.value.trim():"Global",date:"Just now",text:r.value.trim()}),localStorage.setItem(e,JSON.stringify(o)),r.value="",f()}function S(){const t=document.getElementById("related-articles-grid");if(!t||!n)return;const i=c(),a=B().filter(r=>r.id!==n.id).slice(0,3);t.innerHTML=a.map(r=>{const e=r.title[i]||r.title.en;return`
      <a href="/article.html?slug=${r.slug}" class="article-card" style="text-decoration: none;">
        <div class="article-thumb-wrap" style="height: 160px;">
          <img src="${r.coverImage}" alt="${e}" class="article-thumb" />
        </div>
        <div class="article-body" style="padding: 16px;">
          <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${r.category}</div>
          <h4 style="font-family: var(--font-serif); font-size: 1.05rem; line-height: 1.35; margin: 4px 0 8px; color: var(--color-text-main);">${e}</h4>
          <span style="font-size: 0.78rem; color: var(--color-text-muted);">${r.readTime} ${l("readTime")}</span>
        </div>
      </a>
    `}).join("")}function A(t){return t?t.replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*)\*/gim,"<em>$1</em>").replace(/\n\n/gim,"</p><p>").replace(/^• (.*$)/gim,"<li>$1</li>"):""}
