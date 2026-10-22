import{w as ge,x as S,y as ye,z as ne,s as $,A as d,u as ve,l as fe,G as ie,n as he,h as C,E as _,B as ae,C as Ee,D as be,I as Ie,H as ce,c as xe,J as Be,k as Le,v as $e,F as we}from"./affiliate-BxmYfbm8.js";/* empty css             */import{u as ke}from"./seo-Bkyl5X7b.js";let q="all",R="all",T="",A="USD",U="all",le="",de="latest",Q="cards",u=1;const K=6;let h=null,H=null;function Ce(){ge();const t=localStorage.getItem("kbeauty_currency");t&&we[t]&&(A=t),Se(),Pe(),Te(),Me(),re(),De(),pe()}function Se(){const t=document.getElementById("lang-select");t&&(t.value=S(),t.addEventListener("change",c=>{ye(c.target.value),re(),pe()}));const n=document.getElementById("currency-select");n&&(n.value=A,n.addEventListener("change",c=>{A=c.target.value,localStorage.setItem("kbeauty_currency",A),je()}));const e=document.getElementById("promo-code-btn");e&&e.addEventListener("click",()=>ne(e));const s=document.getElementById("sidebar-promo-copy-btn");s&&s.addEventListener("click",()=>ne(s));const o=document.getElementById("search-input");o&&o.addEventListener("input",c=>{T=c.target.value.toLowerCase().trim(),z()});const i=document.getElementById("seo-diagnostics-fab"),l=document.getElementById("seo-drawer"),a=document.getElementById("seo-drawer-close");i&&l&&i.addEventListener("click",()=>{l.classList.toggle("open"),l.classList.contains("open")&&Ne()}),a&&l&&a.addEventListener("click",()=>l.classList.remove("open")),document.querySelectorAll(".filter-pill[data-category]").forEach(c=>{c.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-category]").forEach(v=>v.classList.remove("active")),c.classList.add("active"),q=c.dataset.category,z()})}),document.querySelectorAll(".filter-pill[data-skintype]").forEach(c=>{c.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-skintype]").forEach(v=>v.classList.remove("active")),c.classList.add("active"),R=c.dataset.skintype,z()})})}function Pe(){const t=document.getElementById("newsletter-form");t&&t.addEventListener("submit",n=>{n.preventDefault(),document.getElementById("newsletter-email").value&&($({title:"Welcome to K-beuty Glow Edit",message:"Your exclusive 10% Olive Young promo code GLOW10 has been dispatched to your inbox."}),t.reset())})}function Te(){const t=document.getElementById("btn-run-routine");t&&t.addEventListener("click",()=>{ue()})}function re(){ze(),He(),z(),Ae()}function Ae(){const t=document.getElementById("sidebar-community-list");if(!t)return;const s=[...C().filter(o=>o.status!=="hidden")].sort((o,i)=>{const l=new Date(o.createdAt||o.date).getTime()||0;return(new Date(i.createdAt||i.date).getTime()||0)-l}).slice(0,5);if(s.length===0){t.innerHTML=`
      <li class="sidebar-comm-empty">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">${d("noDiscussionsFound")||"No discussions yet."}</span>
      </li>
    `;return}t.innerHTML=s.map((o,i)=>`
    <li class="sidebar-comm-item">
      <a href="/community.html?postId=${encodeURIComponent(o.id)}" class="sidebar-comm-link" title="${g(o.title)}">
        <span class="sidebar-comm-index">${i+1}</span>
        <span class="sidebar-comm-title">${g(o.title)}</span>
        <span class="sidebar-comm-arrow" aria-hidden="true">→</span>
      </a>
    </li>
  `).join("")}function ze(){document.querySelectorAll("[data-i18n]").forEach(t=>{const n=t.dataset.i18n;n&&(t.textContent=d(n))}),document.querySelectorAll("[data-i18n-placeholder]").forEach(t=>{const n=t.dataset.i18nPlaceholder;n&&t.setAttribute("placeholder",d(n))})}function He(){const t=document.getElementById("featured-story-wrap");if(!t)return;const n=_(),e=n.find(a=>a.featured)||n[0];if(!e)return;const s=S(),o=e.title[s]||e.title.en,i=e.excerpt[s]||e.excerpt.en,l=`/article.html?slug=${encodeURIComponent(e.slug)}`;t.innerHTML=`
    <div class="featured-story-card" id="featured-${e.id}">
      <div class="featured-img-wrap">
        <a href="${l}">
          <img src="${e.coverImage}" alt="${o}" class="featured-img" loading="eager" />
        </a>
      </div>
      <div class="featured-content">
        <div class="meta-row">
          <span class="badge-featured">${d("featuredBadge")}</span>
          <span>•</span>
          <span>${e.readTime} ${d("readTime")}</span>
          <span>•</span>
          <span>${e.views.toLocaleString()} ${d("views")}</span>
        </div>
        <h2 class="featured-headline">
          <a href="${l}" style="color: inherit; text-decoration: none;">${o}</a>
        </h2>
        <p class="featured-excerpt">${i}</p>
        <div class="author-bar">
          <img src="${e.author.avatar}" alt="${e.author.name}" class="author-avatar" />
          <div>
            <div class="author-name">${e.author.name}</div>
            <div class="author-role">${e.author.role}</div>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <a href="${l}" class="btn-primary" style="padding: 10px 22px; font-size: 0.9rem; text-decoration: none; display: inline-flex;">
            ${d("readFullArticle")} →
          </a>
        </div>
      </div>
    </div>
  `}function z(){const t=document.getElementById("articles-grid");if(!t)return;const n=S(),s=_().filter(o=>{const i=q==="all"||o.category===q,l=R==="all"||o.skinType===R||o.skinType==="all",a=(o.title[n]||o.title.en||"").toLowerCase(),c=(o.excerpt[n]||o.excerpt.en||"").toLowerCase(),v=!T||a.includes(T)||c.includes(T);return i&&l&&v});if(s.length===0){t.innerHTML=`
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">No guides found matching your filter criteria.</p>
        <button class="btn-secondary" id="reset-filter-btn" style="padding: 8px 18px; font-size: 0.85rem;">Clear Filters</button>
      </div>
    `;const o=document.getElementById("reset-filter-btn");o&&o.addEventListener("click",()=>{q="all",R="all",T="",document.querySelectorAll(".filter-pill").forEach(i=>i.classList.remove("active")),document.querySelectorAll('.filter-pill[data-category="all"], .filter-pill[data-skintype="all"]').forEach(i=>i.classList.add("active")),z()});return}t.innerHTML=s.map(o=>{const i=o.title[n]||o.title.en,l=o.excerpt[n]||o.excerpt.en,a=`/article.html?slug=${encodeURIComponent(o.slug)}`;return`
      <article class="article-card" data-article-id="${o.id}">
        <a href="${a}" style="text-decoration: none; color: inherit; display: block;">
          <div class="article-thumb-wrap">
            <img src="${o.coverImage}" alt="${i}" class="article-thumb" loading="lazy" />
            <span class="category-tag-float">${Ve(o.category)}</span>
          </div>
          <div class="article-body">
            <div class="meta-row" style="font-size: 0.78rem;">
              <span>${o.readTime} ${d("readTime")}</span>
              <span>•</span>
              <span>${o.publishDate}</span>
            </div>
            <h3 class="article-title">${i}</h3>
            <p class="article-snippet">${l}</p>
            <div class="article-footer">
              <span>${o.views.toLocaleString()} ${d("views")}</span>
              <span class="read-more-link">${d("readFullArticle")} →</span>
            </div>
          </div>
        </a>
      </article>
    `}).join("")}function De(){const t=window.location.hash.replace("#","");if(!t)return;const e=_().find(s=>s.slug===t||s.id===t);e&&(window.location.href=`/article.html?slug=${encodeURIComponent(e.slug)}`)}function Me(){const t=document.getElementById("community-new-post-box");if(!t)return;const n=document.getElementById("btn-open-new-post"),e=document.getElementById("btn-cancel-post"),s=document.getElementById("btn-close-post-box"),o=document.getElementById("community-post-form"),i=document.getElementById("comm-form-heading"),l=document.getElementById("btn-submit-comm-post"),a=document.getElementById("comm-edit-post-id");n&&t&&n.addEventListener("click",()=>{var m;a&&(a.value=""),o==null||o.reset(),i&&(i.textContent=d("postModalTitle")||"Start a Discussion in the Community"),l&&(l.textContent=d("submitPostBtn")||"Publish Post"),t.classList.toggle("open"),t.classList.contains("open")&&((m=document.getElementById("comm-post-title"))==null||m.focus(),t.scrollIntoView({behavior:"smooth",block:"start"}))});const c=()=>{t==null||t.classList.remove("open"),a&&(a.value=""),o==null||o.reset()};e==null||e.addEventListener("click",c),s==null||s.addEventListener("click",c),o&&o.addEventListener("submit",m=>{m.preventDefault();const y=a&&a.value.trim(),E=document.getElementById("comm-post-title").value.trim(),M=document.getElementById("comm-post-category").value,k=document.getElementById("comm-post-content").value.trim(),L=document.getElementById("comm-post-author").value.trim();let b=document.getElementById("comm-post-country").value.trim()||"Global";const Z=document.getElementById("comm-post-password").value.trim(),ee=document.getElementById("comm-post-tags").value.trim();if(!E||!k||!L)return;!b.startsWith("🇺🇸")&&!b.startsWith("🇯🇵")&&!b.startsWith("🇰🇷")&&!b.startsWith("🇬🇧")&&!b.startsWith("🇨🇦")&&(b=`🌍 ${b}`);const te=ee?ee.split(/[,#\s]+/).filter(Boolean).map(Y=>Y.startsWith("#")?Y:`#${Y}`):[];y?(ve(y,{title:E,category:M,content:k,author:L,country:b,tags:te,password:Z||void 0}),$({title:"Discussion Updated",message:d("postEditSuccess")||"Your discussion has been updated."}),h===y&&j(y)):(fe({title:E,category:M,content:k,author:L,country:b,password:Z||"1234",tags:te,status:"published"}),$({title:"Discussion Published",message:d("postSuccessToast")||"Your discussion post has been published!"}),u=1),c(),f()}),document.querySelectorAll(".comm-filter-pill").forEach(m=>{m.addEventListener("click",()=>{document.querySelectorAll(".comm-filter-pill").forEach(y=>y.classList.remove("active")),m.classList.add("active"),U=m.dataset.commCategory||"all",u=1,f()})});const v=document.getElementById("comm-search-input");if(v){let m;v.addEventListener("input",y=>{clearTimeout(m),m=setTimeout(()=>{le=y.target.value.trim(),u=1,f()},250)})}const I=document.getElementById("comm-sort-select");I&&I.addEventListener("change",m=>{de=m.target.value,u=1,f()});const r=document.getElementById("btn-view-cards"),x=document.getElementById("btn-view-table");r&&x&&(r.addEventListener("click",()=>{Q="cards",r.classList.add("active"),x.classList.remove("active"),f()}),x.addEventListener("click",()=>{Q="table",x.classList.add("active"),r.classList.remove("active"),f()}));const p=document.getElementById("comm-detail-modal"),w=document.getElementById("btn-close-detail-modal");w==null||w.addEventListener("click",()=>{p==null||p.classList.remove("open")}),p==null||p.addEventListener("click",m=>{m.target===p&&p.classList.remove("open")});const P=document.getElementById("btn-detail-like");P==null||P.addEventListener("click",()=>{if(!h)return;const m=ie(h);document.getElementById("comm-detail-likes-count").textContent=m.likes,document.getElementById("comm-detail-likes-top").textContent=m.likes;const y=document.getElementById("comm-detail-heart-icon");y&&(y.style.transform="scale(1.3)"),setTimeout(()=>{y&&(y.style.transform="scale(1)")},200),f()});const N=document.getElementById("btn-detail-share");N==null||N.addEventListener("click",()=>{if(!h)return;const m=`${window.location.origin}${window.location.pathname}#post-${h}`;navigator.clipboard?navigator.clipboard.writeText(m).then(()=>{$({title:"Link Copied",message:d("linkCopiedToast")||"Link copied to clipboard!"})}):$({title:"Link Copied",message:m})});const V=document.getElementById("btn-detail-edit");V==null||V.addEventListener("click",()=>{h&&J({type:"edit-post",postId:h})});const W=document.getElementById("btn-detail-delete");W==null||W.addEventListener("click",()=>{h&&J({type:"delete-post",postId:h})});const D=document.getElementById("comm-reply-form");D==null||D.addEventListener("submit",m=>{if(m.preventDefault(),!h)return;const y=document.getElementById("comm-reply-author").value.trim();let E=document.getElementById("comm-reply-country").value.trim()||"Global";const M=document.getElementById("comm-reply-password").value.trim(),k=document.getElementById("comm-reply-content").value.trim();if(!y||!k)return;!E.startsWith("🇺🇸")&&!E.startsWith("🇯🇵")&&!E.startsWith("🇰🇷")&&!E.startsWith("🇬🇧")&&!E.startsWith("🇨🇦")&&(E=`🌍 ${E}`),he(h,{author:y,country:E,password:M||"1234",content:k}),D.reset(),$({title:"Reply Posted",message:d("replySuccessToast")||"Reply posted successfully!"});const L=C().find(b=>b.id===h);L&&(X(L),document.getElementById("comm-detail-comments-top").textContent=(L.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=(L.replies||[]).length),f()});const B=document.getElementById("comm-pass-modal"),G=document.getElementById("btn-cancel-pass-modal"),O=document.getElementById("btn-confirm-pass-modal"),F=document.getElementById("comm-input-verify-password");G==null||G.addEventListener("click",()=>{B==null||B.classList.remove("open"),H=null}),B==null||B.addEventListener("click",m=>{m.target===B&&(B.classList.remove("open"),H=null)}),O==null||O.addEventListener("click",oe),F==null||F.addEventListener("keydown",m=>{m.key==="Enter"&&oe()})}function J(t){H=t;const n=document.getElementById("comm-pass-modal"),e=document.getElementById("comm-input-verify-password"),s=document.getElementById("comm-pass-error"),o=document.getElementById("comm-pass-title"),i=document.getElementById("comm-pass-desc");!n||!e||(e.value="",s&&(s.style.display="none",s.textContent=""),t.type==="edit-post"?(o&&(o.textContent=d("passwordPromptTitle")||"Enter Post Passcode"),i&&(i.textContent="Please enter your 4-digit passcode to edit this discussion.")):t.type==="delete-post"?(o&&(o.textContent=d("deletePostBtn")||"Delete Post"),i&&(i.textContent="Please enter your passcode to permanently delete this discussion.")):t.type==="delete-comment"&&(o&&(o.textContent="Delete Reply"),i&&(i.textContent="Please enter the passcode you set when leaving this reply.")),n.classList.add("open"),e.focus())}function oe(){var c,v;if(!H)return;const t=document.getElementById("comm-input-verify-password"),n=document.getElementById("comm-pass-error"),e=document.getElementById("comm-pass-modal"),s=t?t.value.trim():"";if(!s){n&&(n.textContent="Please enter passcode.",n.style.display="block");return}const{type:o,postId:i,commentId:l}=H,a=C().find(I=>I.id===i);if(o==="edit-post"||o==="delete-post"){if(!a){e==null||e.classList.remove("open");return}if(a.password&&a.password!==s){n&&(n.textContent=d("passwordIncorrect")||"Incorrect passcode. Please try again.",n.style.display="block");return}e==null||e.classList.remove("open"),o==="delete-post"?(Le(i),(c=document.getElementById("comm-detail-modal"))==null||c.classList.remove("open"),$({title:"Deleted",message:d("postDeleteSuccess")||"Post deleted successfully."}),f()):o==="edit-post"&&((v=document.getElementById("comm-detail-modal"))==null||v.classList.remove("open"),qe(a))}else if(o==="delete-comment"){const I=$e(i,l,s);if(!I.success){n&&(n.textContent=I.message||"Incorrect passcode.",n.style.display="block");return}e==null||e.classList.remove("open"),$({title:"Deleted",message:d("commentDeleteSuccess")||"Reply deleted successfully."});const r=C().find(x=>x.id===i);r&&(X(r),document.getElementById("comm-detail-comments-top").textContent=(r.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=(r.replies||[]).length),f()}}function qe(t){const n=document.getElementById("community-new-post-box"),e=document.getElementById("comm-form-heading"),s=document.getElementById("btn-submit-comm-post"),o=document.getElementById("comm-edit-post-id");n&&(o&&(o.value=t.id),document.getElementById("comm-post-title").value=t.title||"",document.getElementById("comm-post-category").value=t.category||"Routine Advice",document.getElementById("comm-post-content").value=t.content||"",document.getElementById("comm-post-author").value=t.author||"",document.getElementById("comm-post-country").value=t.country||"",document.getElementById("comm-post-password").value=t.password||"",document.getElementById("comm-post-tags").value=(t.tags||[]).join(", "),e&&(e.textContent=d("editPostBtn")||"Edit Discussion"),s&&(s.textContent="Update Post"),n.classList.add("open"),n.scrollIntoView({behavior:"smooth",block:"start"}))}function f(){const t=document.getElementById("comm-posts-view-container"),n=document.getElementById("comm-pinned-notices");if(!t)return;const e=C().filter(a=>a.status!=="hidden");if(n){const a=e.filter(c=>c.isPinned||c.category==="Notice");a.length>0&&(U==="all"||U==="Notice")?(n.style.display="flex",n.innerHTML=a.map(c=>`
        <div class="comm-pinned-card" data-post-id="${c.id}">
          <div class="comm-pinned-title">
            <span class="comm-notice-badge">📌 ${d("pinnedNoticeBadge")||"NOTICE"}</span>
            <span>${g(c.title)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 14px; font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap;">
            <span>👁️ ${c.views||0}</span>
            <span>💬 ${(c.replies||[]).length}</span>
            <span>${c.date}</span>
          </div>
        </div>
      `).join(""),n.querySelectorAll(".comm-pinned-card").forEach(c=>{c.addEventListener("click",()=>{j(c.dataset.postId)})})):(n.style.display="none",n.innerHTML="")}const s=xe({includeHidden:!1,category:U,searchQuery:le,sortBy:de});if(s.length===0){t.innerHTML=`
      <div style="text-align: center; padding: 48px 24px; color: var(--color-text-muted); background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-card-border);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🌸</div>
        <p style="font-size: 1.05rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 6px;">${d("noPostsFound")||"No discussions found matching your filter."}</p>
        <p style="font-size: 0.88rem; margin-bottom: 16px;">Be the first to share your K-Beauty holy grail discoveries or ask for routine advice!</p>
        <button class="btn-primary" onclick="document.getElementById('btn-open-new-post').click();" style="padding: 9px 20px; font-size: 0.88rem;">${d("askQuestionBtn")||"+ Start a Discussion"}</button>
      </div>
    `,se(0);return}const o=Math.ceil(s.length/K)||1;u=Math.min(Math.max(1,u),o);const i=(u-1)*K,l=s.slice(i,i+K);Q==="table"?Ue(l,t):Re(l,t),se(o)}function Re(t,n){n.innerHTML=`
    <div class="community-posts-list">
      ${t.map(e=>{const s=(e.replies||[]).length,o=ce(e.id);return`
          <div class="community-card" id="comm-card-${e.id}" data-post-id="${e.id}">
            <div class="community-card-header">
              <div class="community-author-row">
                <span class="community-avatar">${me(e.author)}</span>
                <div>
                  <div class="community-author-name">
                    ${g(e.author)}
                    <span class="community-author-country">${g(e.country)}</span>
                  </div>
                  <div class="community-post-date">${e.date}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                ${e.isPinned?'<span class="comm-notice-badge">📌 NOTICE</span>':""}
                <span class="community-cat-badge">${g(e.category)}</span>
              </div>
            </div>

            <h3 class="community-post-title">${g(e.title)}</h3>
            <p class="community-post-content">${g(e.content)}</p>

            ${e.tags&&e.tags.length>0?`
              <div class="community-tags-row">
                ${e.tags.map(i=>`<span class="comm-tag-chip">${g(i)}</span>`).join("")}
              </div>
            `:""}

            <div class="community-actions-bar">
              <div class="comm-actions-left">
                <button class="community-action-btn btn-card-like ${o?"active":""}" data-post-id="${e.id}">
                  <span>❤️</span>
                  <span class="like-count">${e.likes||0}</span>
                </button>
                <div style="color: var(--color-text-muted); display: inline-flex; align-items: center; gap: 5px;">
                  <span>💬</span>
                  <span>${s}</span>
                </div>
                <div style="color: var(--color-text-muted); display: inline-flex; align-items: center; gap: 5px;">
                  <span>👁️</span>
                  <span>${e.views||0}</span>
                </div>
              </div>
              <button class="btn-secondary btn-card-read-more" data-post-id="${e.id}" style="padding: 6px 14px; font-size: 0.82rem;">
                <span>View & Reply ↗</span>
              </button>
            </div>
          </div>
        `}).join("")}
    </div>
  `,n.querySelectorAll(".community-card").forEach(e=>{e.addEventListener("click",s=>{s.target.closest(".btn-card-like")||j(e.dataset.postId)})}),n.querySelectorAll(".btn-card-like").forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const o=e.dataset.postId,i=ie(o);e.querySelector(".like-count").textContent=i.likes,i.isLiked?e.classList.add("active"):e.classList.remove("active")})})}function Ue(t,n){n.innerHTML=`
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
          ${t.map(e=>{const s=(e.replies||[]).length;return`
              <tr class="comm-table-row" data-post-id="${e.id}">
                <td style="text-align: center; color: var(--color-text-muted); font-size: 0.8rem;">
                  ${e.isPinned?"📌":e.postNo||"#"}
                </td>
                <td>
                  <span class="community-cat-badge" style="font-size: 0.72rem; padding: 2px 7px;">
                    ${g(e.category)}
                  </span>
                </td>
                <td>
                  <div class="comm-table-title">
                    <span>${g(e.title)}</span>
                    ${s>0?`<span class="comm-reply-count-badge">[${s}]</span>`:""}
                  </div>
                </td>
                <td>
                  <div style="font-weight: 500; color: var(--color-text-main); font-size: 0.84rem;">
                    ${g(e.author)}
                  </div>
                  <div style="font-size: 0.72rem; color: var(--color-text-muted);">
                    ${g(e.country)}
                  </div>
                </td>
                <td style="font-size: 0.8rem; color: var(--color-text-muted);">
                  ${e.date}
                </td>
                <td style="text-align: center; font-size: 0.82rem; color: var(--color-text-muted);">
                  ${e.views||0}
                </td>
                <td style="text-align: center; font-size: 0.82rem; color: var(--color-primary); font-weight: 600;">
                  ${e.likes||0}
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `,n.querySelectorAll(".comm-table-row").forEach(e=>{e.addEventListener("click",()=>{j(e.dataset.postId)})})}function se(t){var s,o,i,l;const n=document.getElementById("comm-pagination-bar");if(!n)return;if(t<=1){n.innerHTML="";return}let e=`
    <button class="comm-page-btn" id="btn-page-first" ${u===1?"disabled":""} title="First Page">«</button>
    <button class="comm-page-btn" id="btn-page-prev" ${u===1?"disabled":""} title="Previous Page">‹</button>
  `;for(let a=1;a<=t;a++)e+=`
      <button class="comm-page-btn ${a===u?"active":""}" data-page="${a}">
        ${a}
      </button>
    `;e+=`
    <button class="comm-page-btn" id="btn-page-next" ${u===t?"disabled":""} title="Next Page">›</button>
    <button class="comm-page-btn" id="btn-page-last" ${u===t?"disabled":""} title="Last Page">»</button>
  `,n.innerHTML=e,n.querySelectorAll(".comm-page-btn[data-page]").forEach(a=>{a.addEventListener("click",()=>{var c;u=parseInt(a.dataset.page,10),f(),(c=document.getElementById("community"))==null||c.scrollIntoView({behavior:"smooth",block:"start"})})}),(s=document.getElementById("btn-page-first"))==null||s.addEventListener("click",()=>{var a;u>1&&(u=1,f(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))}),(o=document.getElementById("btn-page-prev"))==null||o.addEventListener("click",()=>{var a;u>1&&(u--,f(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))}),(i=document.getElementById("btn-page-next"))==null||i.addEventListener("click",()=>{var a;u<t&&(u++,f(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))}),(l=document.getElementById("btn-page-last"))==null||l.addEventListener("click",()=>{var a;u<t&&(u=t,f(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))})}function j(t){h=t,Ie(t);const n=C().find(l=>l.id===t);if(!n)return;const e=document.getElementById("comm-detail-modal");if(!e)return;document.getElementById("comm-detail-cat-badge").textContent=n.category,document.getElementById("comm-detail-date").textContent=n.date,document.getElementById("comm-detail-title").textContent=n.title,document.getElementById("comm-detail-avatar").textContent=me(n.author),document.getElementById("comm-detail-author").textContent=n.author,document.getElementById("comm-detail-country").textContent=n.country,document.getElementById("comm-detail-views").textContent=n.views||0,document.getElementById("comm-detail-likes-top").textContent=n.likes||0,document.getElementById("comm-detail-comments-top").textContent=(n.replies||[]).length,document.getElementById("comm-detail-content").textContent=n.content;const s=document.getElementById("comm-detail-tags");s&&(n.tags&&n.tags.length>0?(s.innerHTML=n.tags.map(l=>`<span class="comm-tag-chip">${g(l)}</span>`).join(""),s.style.display="flex"):(s.innerHTML="",s.style.display="none"));const o=ce(t),i=document.getElementById("btn-detail-like");document.getElementById("comm-detail-likes-count").textContent=n.likes||0,i&&(o?i.classList.add("active"):i.classList.remove("active")),X(n),e.classList.add("open")}function X(t){const n=document.getElementById("comm-detail-comments-list"),e=document.getElementById("comm-detail-replies-count");if(!n)return;const s=t.replies||[];if(e&&(e.textContent=s.length),s.length===0){n.innerHTML=`
      <div style="text-align: center; padding: 24px; color: var(--color-text-muted); font-size: 0.88rem; background: var(--color-bg-alt); border-radius: var(--radius-sm);">
        No replies yet. Be the first to share your thoughts!
      </div>
    `;return}n.innerHTML=s.map(o=>`
    <div class="comm-comment-item" id="comm-reply-${o.id}">
      <div class="comm-comment-header">
        <div class="comm-comment-author-info">
          <span style="font-size: 1rem;">💬</span>
          <span>${g(o.author)}</span>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: normal;">${g(o.country||"")}</span>
        </div>
        <div style="color: var(--color-text-muted); font-size: 0.78rem;">
          ${o.date}
        </div>
      </div>
      <div class="comm-comment-content">${g(o.content)}</div>
      <div class="comm-comment-footer">
        <button type="button" class="comm-comment-btn btn-like-comment" data-comment-id="${o.id}">
          <span>❤️</span>
          <span class="comment-like-count">${o.likes||0}</span>
        </button>
        <button type="button" class="comm-comment-btn delete btn-delete-comment" data-comment-id="${o.id}">
          <span>🗑️ Delete</span>
        </button>
      </div>
    </div>
  `).join(""),n.querySelectorAll(".btn-like-comment").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.commentId,l=Be(t.id,i);o.querySelector(".comment-like-count").textContent=l.likes})}),n.querySelectorAll(".btn-delete-comment").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.commentId;J({type:"delete-comment",postId:t.id,commentId:i})})})}function me(t){if(!t)return"K";const n=t.trim().split(" ");return n.length>=2?`${n[0][0]}${n[1][0]}`.toUpperCase():t.slice(0,2).toUpperCase()}function g(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function ue(){const t=document.getElementById("routine-skin-select"),n=document.getElementById("routine-goal-select"),e=document.getElementById("routine-results-container"),s=document.getElementById("routine-steps-grid");if(!t||!n||!e||!s)return;t.value;const o=n.value,i=S(),l=ae();let a=l.find(r=>r.id==="anua-heartleaf-toner"),c=l.find(r=>r.id==="torriden-dive-in-serum"),v=l.find(r=>r.id==="round-lab-birch-sunscreen");o==="glow"?(c=l.find(r=>r.id==="cosrx-snail-mucin-essence")||c,v=l.find(r=>r.id==="beauty-of-joseon-sunscreen")||v):o==="calm"&&(a=l.find(r=>r.id==="mediheal-madecassoside-pad")||a);const I=[{title:"Step 1: Low-pH Toner & Prep",product:a,note:"Balances skin mantle and opens cellular hydration channels."},{title:"Step 2: Active Repair Ampoule",product:c,note:"Infuses multi-depth moisture and reinforces damaged barrier lipids."},{title:"Step 3: Lightweight Daily Sun Shield",product:v,note:"Broad-spectrum SPF 50+ essential to prevent hyperpigmentation."}];s.innerHTML=I.map((r,x)=>{const p=r.product,w=p.name[i]||p.name.en,P=Ee(p.priceUSD,A);return`
      <div class="step-box">
        <span class="step-number">${r.title}</span>
        <div style="font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.4;">${r.note}</div>
        <img src="${p.image}" alt="${w}" style="height: 130px; object-fit: contain; margin: 10px 0; border-radius: var(--radius-sm);" />
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${p.brand}</div>
        <div style="font-size: 0.9rem; font-weight: 600; line-height: 1.35;">${w}</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: auto;">Tested reference: ${P}</div>
        <a href="${p.oliveYoungUrl}" class="btn-primary" data-product-id="${p.id}" data-url="${p.oliveYoungUrl}" style="padding: 8px 12px; font-size: 0.8rem; margin-top: 10px; border-radius: var(--radius-sm); justify-content: center; text-decoration: none;">
          ${d("viewOnOliveYoung")}
        </a>
      </div>
    `}).join(""),s.querySelectorAll(".btn-primary").forEach(r=>{r.addEventListener("click",x=>{be(x,r.dataset.productId,r.dataset.url,"routine_diagnostic")})}),e.classList.add("visible"),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function je(){const t=document.getElementById("routine-results-container");t&&t.classList.contains("visible")&&ue()}function pe(){const t=S(),n={en:"Curated K-Beauty intelligence, glass skin routines, and Olive Young Global shopping guides with exclusive promo code discounts.",zh:"首尔正统韩系护肤专栏、水光肌公式与 Olive Young Global 全球直邮省钱指南，独家专享海淘优惠码。",ja:"ソウル発の最新韓国スキンケアトレンド、水光肌ルーティン、オリーブヤンググローバル公式通販の購入ガイド。"};ke({title:`${d("brandName")} | ${d("brandTagline")}`,description:n[t]||n.en,products:ae()})}function Ne(){const t=document.getElementById("seo-inspector-data");if(!t)return;const n=S(),e=window.location.origin+window.location.pathname,s=document.getElementById("seo-json-ld"),o=s?s.textContent:"Generating...";t.innerHTML=`
    <div>
      <strong>Active Language:</strong> <code>${n}</code>
    </div>
    <div>
      <strong>Canonical Tag:</strong> <code>${e}</code>
    </div>
    <div>
      <strong>Hreflang Targets:</strong>
      <ul style="padding-left: 20px; margin-top: 6px;">
        <li><code>en</code>: ${e}?hl=en</li>
        <li><code>zh</code>: ${e}?hl=zh</li>
        <li><code>ja</code>: ${e}?hl=ja</li>
        <li><code>x-default</code>: ${e}?hl=en</li>
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
      <pre class="seo-code-box">${o}</pre>
    </div>
  `}function Ve(t){return{awards:d("filterAwards"),"glass-skin":d("filterGlassSkin"),"sun-care":d("filterSunCare"),trouble:d("filterTrouble")}[t]||t}document.addEventListener("DOMContentLoaded",()=>{Ce()});
