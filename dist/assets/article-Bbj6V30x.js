import{A as f,B as p,C as d,D as h,E as x,F as l,g as b,x as $,G as w,H as E}from"./affiliate-DTiuOQeh.js";/* empty css             */import{u as I}from"./seo-pkP-Edg8.js";let t=null;document.addEventListener("DOMContentLoaded",()=>{f(),p(),B(),y()});function B(){const n=document.getElementById("lang-select");n&&(n.value=d(),n.addEventListener("change",e=>{h(e.target.value),p(),y()}));const i=document.getElementById("promo-code-btn");i&&i.addEventListener("click",()=>x(i));const r=document.getElementById("btn-share-article");r&&r.addEventListener("click",()=>{navigator.clipboard.writeText(window.location.href).then(()=>{alert(l("linkCopied"))})});const o=document.getElementById("article-comment-form");o&&o.addEventListener("submit",C)}function y(){var c,m,g;const n=d(),r=new URLSearchParams(window.location.search).get("slug"),o=b();if(t=o.find(u=>u.slug===r||u.id===r)||o[0],!t){document.getElementById("article-main-content").innerHTML=`
      <div style="text-align: center; padding: 60px 20px;">
        <h2>Article Not Found</h2>
        <a href="/" class="btn-primary" style="margin-top: 16px;">Back to All Stories</a>
      </div>
    `;return}if(t.status==="draft"){document.getElementById("article-main-content").innerHTML=`
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
    `;return}const e=t.title[n]||t.title.en,a=t.excerpt[n]||t.excerpt.en,s=t.content[n]||t.content.en;document.title=`${e} | The K-Glow Edit`,I({title:`${e} | The K-Glow Edit`,description:a,image:t.coverImage,type:"article",article:t}),document.getElementById("post-category-tag").textContent=t.category.toUpperCase(),document.getElementById("post-read-time").textContent=`${t.readTime} ${l("readTime")}`,document.getElementById("post-views").textContent=`${(t.views||12e3).toLocaleString()} ${l("views")}`,document.getElementById("post-title").textContent=e,document.getElementById("post-date").textContent=t.publishDate||"2026-10-18",document.getElementById("post-author-name").textContent=((c=t.author)==null?void 0:c.name)||"Min-Ji Kang",document.getElementById("post-author-role").textContent=((m=t.author)==null?void 0:m.role)||"Beauty Editor",document.getElementById("post-author-avatar").src=((g=t.author)==null?void 0:g.avatar)||"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",document.getElementById("post-cover-image").src=t.coverImage,document.getElementById("post-cover-image").alt=e,document.getElementById("post-body-prose").innerHTML=k(s),F(),v(),L()}function F(){const n=document.getElementById("post-embedded-products");if(!n||!t)return;const i=d(),r=$(),o=(t.products||[]).map(e=>r.find(a=>a.id===e)).filter(Boolean);if(o.length===0){n.innerHTML="";return}n.innerHTML=`
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
        ${o.map(e=>{const a=e.name[i]||e.name.en,s=e.badge[i]||e.badge.en;return`
            <div style="background: #FFFFFF; border: 1px solid var(--color-card-border); border-radius: var(--radius-md); padding: 18px; display: grid; grid-template-columns: 88px 1fr auto; gap: 18px; align-items: center;">
              <img src="${e.image}" alt="${a}" style="width: 88px; height: 88px; object-fit: contain; background: #FDFBFA; border-radius: var(--radius-xs); padding: 4px;" />
              <div>
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${e.brand} • ${s}</div>
                <div style="font-size: 1rem; font-weight: 600; color: var(--color-text-main); line-height: 1.35; margin: 3px 0;">${a}</div>
                <div style="font-size: 0.8rem; color: var(--color-olive-young); font-weight: 500;">✓ Official Olive Young Global Store</div>
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
  `,n.querySelectorAll(".btn-primary").forEach(e=>{e.addEventListener("click",a=>{w(a,e.dataset.productId,e.dataset.url,"article_page")})})}function v(){const n=document.getElementById("article-comments-list");if(!n||!t)return;const i=`comments_${t.id}`,r=JSON.parse(localStorage.getItem(i)||"[]"),e=[...[{author:"Emily Watson",country:"🇺🇸 USA",date:"Yesterday",text:"This guide completely changed how I look at Korean skincare steps. Ordering the Round Lab sunscreen right now with code GLOW10!"},{author:"Yuki Tanaka",country:"🇯🇵 Japan",date:"2 days ago",text:"とても参考になりました。特に水分の重ね塗りの解説がわかりやすいです。"}],...r];n.innerHTML=e.map(a=>`
    <div style="background: #FFFFFF; border: 1px solid var(--color-card-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; font-size: 0.82rem;">
        <span style="font-weight: 600; color: var(--color-text-main);">${a.author} <span style="font-weight: 400; color: var(--color-text-muted);">(${a.country})</span></span>
        <span style="color: var(--color-text-muted);">${a.date}</span>
      </div>
      <p style="font-size: 0.9rem; color: var(--color-text-secondary); line-height: 1.5;">${a.text}</p>
    </div>
  `).join("")}function C(n){n.preventDefault();const i=document.getElementById("comment-author"),r=document.getElementById("comment-country"),o=document.getElementById("comment-text");if(!i||!o||!o.value.trim())return;const e=`comments_${t.id}`,a=JSON.parse(localStorage.getItem(e)||"[]");a.unshift({author:i.value.trim()||"Anonymous Reader",country:r?r.value.trim():"Global",date:"Just now",text:o.value.trim()}),localStorage.setItem(e,JSON.stringify(a)),o.value="",v()}function L(){const n=document.getElementById("related-articles-grid");if(!n||!t)return;const i=d(),r=E().filter(o=>o.id!==t.id).slice(0,3);n.innerHTML=r.map(o=>{const e=o.title[i]||o.title.en;return`
      <a href="/article.html?slug=${o.slug}" class="article-card" style="text-decoration: none;">
        <div class="article-thumb-wrap" style="height: 160px;">
          <img src="${o.coverImage}" alt="${e}" class="article-thumb" />
        </div>
        <div class="article-body" style="padding: 16px;">
          <div style="font-size: 0.75rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase;">${o.category}</div>
          <h4 style="font-family: var(--font-serif); font-size: 1.05rem; line-height: 1.35; margin: 4px 0 8px; color: var(--color-text-main);">${e}</h4>
          <span style="font-size: 0.78rem; color: var(--color-text-muted);">${o.readTime} ${l("readTime")}</span>
        </div>
      </a>
    `}).join("")}function k(n){return n?n.replace(/^### (.*$)/gim,"<h3>$1</h3>").replace(/^## (.*$)/gim,"<h2>$1</h2>").replace(/!\[(.*?)\]\((.*?)\)/gim,(i,r,o)=>{const e=r?`<figcaption class="article-body-figcaption">${r}</figcaption>`:"";return`</p><figure class="article-body-figure"><img src="${o}" alt="${r||"K-Glow Editorial"}" class="article-body-inline-img" loading="lazy" />${e}</figure><p>`}).replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*)\*/gim,"<em>$1</em>").replace(/\n\n/gim,"</p><p>").replace(/^• (.*$)/gim,"<li>$1</li>"):""}
