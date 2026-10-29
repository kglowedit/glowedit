import{w as ue,x as S,y as pe,z as te,s as $,A as l,u as ge,l as ye,E as se,n as ve,h as C,D as J,B as ie,C as fe,G as he,F as ae,c as Ee,H as be,k as Ie,v as xe}from"./affiliate-BEGb2eZn.js";/* empty css             */import{u as Be}from"./seo-LisWa4dZ.js";let M="all",D="all",P="",q="all",ce="",le="latest",K="cards",u=1;const Y=6;let f=null,A=null;function Le(){ue(),$e(),we(),ke(),Ae(),de(),Te(),me()}function $e(){const t=document.getElementById("lang-select");t&&(t.value=S(),t.addEventListener("change",i=>{pe(i.target.value),de(),me()}));const n=document.getElementById("promo-code-btn");n&&n.addEventListener("click",()=>te(n));const e=document.getElementById("sidebar-promo-copy-btn");e&&e.addEventListener("click",()=>te(e));const s=document.getElementById("search-input");s&&s.addEventListener("input",i=>{P=i.target.value.toLowerCase().trim(),T()});const o=document.getElementById("seo-diagnostics-fab"),a=document.getElementById("seo-drawer"),c=document.getElementById("seo-drawer-close");o&&a&&o.addEventListener("click",()=>{a.classList.toggle("open"),a.classList.contains("open")&&qe()}),c&&a&&c.addEventListener("click",()=>a.classList.remove("open")),document.querySelectorAll(".filter-pill[data-category]").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-category]").forEach(d=>d.classList.remove("active")),i.classList.add("active"),M=i.dataset.category,T()})}),document.querySelectorAll(".filter-pill[data-skintype]").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-skintype]").forEach(d=>d.classList.remove("active")),i.classList.add("active"),D=i.dataset.skintype,T()})})}function we(){const t=document.getElementById("newsletter-form");t&&t.addEventListener("submit",n=>{n.preventDefault(),document.getElementById("newsletter-email").value&&($({title:"Welcome to K-beuty Glow Edit",message:"Your exclusive 10% Olive Young promo code GLOW10 has been dispatched to your inbox."}),t.reset())})}function ke(){const t=document.getElementById("btn-run-routine");t&&t.addEventListener("click",()=>{De()})}function de(){Se(),Pe(),T(),Ce()}function Ce(){const t=document.getElementById("sidebar-community-list");if(!t)return;const s=[...C().filter(o=>o.status!=="hidden")].sort((o,a)=>{const c=new Date(o.createdAt||o.date).getTime()||0;return(new Date(a.createdAt||a.date).getTime()||0)-c}).slice(0,5);if(s.length===0){t.innerHTML=`
      <li class="sidebar-comm-empty">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">${l("noDiscussionsFound")||"No discussions yet."}</span>
      </li>
    `;return}t.innerHTML=s.map((o,a)=>`
    <li class="sidebar-comm-item">
      <a href="/community.html?postId=${encodeURIComponent(o.id)}" class="sidebar-comm-link" title="${p(o.title)}">
        <span class="sidebar-comm-index">${a+1}</span>
        <span class="sidebar-comm-title">${p(o.title)}</span>
        <span class="sidebar-comm-arrow" aria-hidden="true">→</span>
      </a>
    </li>
  `).join("")}function Se(){document.querySelectorAll("[data-i18n]").forEach(t=>{const n=t.dataset.i18n;n&&(t.textContent=l(n))}),document.querySelectorAll("[data-i18n-placeholder]").forEach(t=>{const n=t.dataset.i18nPlaceholder;n&&t.setAttribute("placeholder",l(n))})}function Pe(){const t=document.getElementById("featured-story-wrap");if(!t)return;const n=J(),e=n.find(i=>i.featured)||n[0];if(!e)return;const s=S(),o=e.title[s]||e.title.en,a=e.excerpt[s]||e.excerpt.en,c=`/article.html?slug=${encodeURIComponent(e.slug)}`;t.innerHTML=`
    <div class="featured-story-card" id="featured-${e.id}">
      <div class="featured-img-wrap">
        <a href="${c}">
          <img src="${e.coverImage}" alt="${o}" class="featured-img" loading="eager" />
        </a>
      </div>
      <div class="featured-content">
        <div class="meta-row">
          <span class="badge-featured">${l("featuredBadge")}</span>
          <span>•</span>
          <span>${e.readTime} ${l("readTime")}</span>
          <span>•</span>
          <span>${e.views.toLocaleString()} ${l("views")}</span>
        </div>
        <h2 class="featured-headline">
          <a href="${c}" style="color: inherit; text-decoration: none;">${o}</a>
        </h2>
        <p class="featured-excerpt">${a}</p>
        <div class="author-bar">
          <img src="${e.author.avatar}" alt="${e.author.name}" class="author-avatar" />
          <div>
            <div class="author-name">${e.author.name}</div>
            <div class="author-role">${e.author.role}</div>
          </div>
        </div>
        <div style="margin-top: 10px;">
          <a href="${c}" class="btn-primary" style="padding: 10px 22px; font-size: 0.9rem; text-decoration: none; display: inline-flex;">
            ${l("readFullArticle")} →
          </a>
        </div>
      </div>
    </div>
  `}function T(){const t=document.getElementById("articles-grid");if(!t)return;const n=S(),s=J().filter(o=>{const a=M==="all"||o.category===M,c=D==="all"||o.skinType===D||o.skinType==="all",i=(o.title[n]||o.title.en||"").toLowerCase(),d=(o.excerpt[n]||o.excerpt.en||"").toLowerCase(),E=!P||i.includes(P)||d.includes(P);return a&&c&&E});if(s.length===0){t.innerHTML=`
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">No guides found matching your filter criteria.</p>
        <button class="btn-secondary" id="reset-filter-btn" style="padding: 8px 18px; font-size: 0.85rem;">Clear Filters</button>
      </div>
    `;const o=document.getElementById("reset-filter-btn");o&&o.addEventListener("click",()=>{M="all",D="all",P="",document.querySelectorAll(".filter-pill").forEach(a=>a.classList.remove("active")),document.querySelectorAll('.filter-pill[data-category="all"], .filter-pill[data-skintype="all"]').forEach(a=>a.classList.add("active")),T()});return}t.innerHTML=s.map(o=>{const a=o.title[n]||o.title.en,c=o.excerpt[n]||o.excerpt.en,i=`/article.html?slug=${encodeURIComponent(o.slug)}`;return`
      <article class="article-card" data-article-id="${o.id}">
        <a href="${i}" style="text-decoration: none; color: inherit; display: block;">
          <div class="article-thumb-wrap">
            <img src="${o.coverImage}" alt="${a}" class="article-thumb" loading="lazy" />
            <span class="category-tag-float">${je(o.category)}</span>
          </div>
          <div class="article-body">
            <div class="meta-row" style="font-size: 0.78rem;">
              <span>${o.readTime} ${l("readTime")}</span>
              <span>•</span>
              <span>${o.publishDate}</span>
            </div>
            <h3 class="article-title">${a}</h3>
            <p class="article-snippet">${c}</p>
            <div class="article-footer">
              <span>${o.views.toLocaleString()} ${l("views")}</span>
              <span class="read-more-link">${l("readFullArticle")} →</span>
            </div>
          </div>
        </a>
      </article>
    `}).join("")}function Te(){const t=window.location.hash.replace("#","");if(!t)return;const e=J().find(s=>s.slug===t||s.id===t);e&&(window.location.href=`/article.html?slug=${encodeURIComponent(e.slug)}`)}function Ae(){const t=document.getElementById("community-new-post-box");if(!t)return;const n=document.getElementById("btn-open-new-post"),e=document.getElementById("btn-cancel-post"),s=document.getElementById("btn-close-post-box"),o=document.getElementById("community-post-form"),a=document.getElementById("comm-form-heading"),c=document.getElementById("btn-submit-comm-post"),i=document.getElementById("comm-edit-post-id");n&&t&&n.addEventListener("click",()=>{var m;i&&(i.value=""),o==null||o.reset(),a&&(a.textContent=l("postModalTitle")||"Start a Discussion in the Community"),c&&(c.textContent=l("submitPostBtn")||"Publish Post"),t.classList.toggle("open"),t.classList.contains("open")&&((m=document.getElementById("comm-post-title"))==null||m.focus(),t.scrollIntoView({behavior:"smooth",block:"start"}))});const d=()=>{t==null||t.classList.remove("open"),i&&(i.value=""),o==null||o.reset()};e==null||e.addEventListener("click",d),s==null||s.addEventListener("click",d),o&&o.addEventListener("submit",m=>{m.preventDefault();const y=i&&i.value.trim(),h=document.getElementById("comm-post-title").value.trim(),H=document.getElementById("comm-post-category").value,k=document.getElementById("comm-post-content").value.trim(),L=document.getElementById("comm-post-author").value.trim();let b=document.getElementById("comm-post-country").value.trim()||"Global";const X=document.getElementById("comm-post-password").value.trim(),Z=document.getElementById("comm-post-tags").value.trim();if(!h||!k||!L)return;!b.startsWith("🇺🇸")&&!b.startsWith("🇯🇵")&&!b.startsWith("🇰🇷")&&!b.startsWith("🇬🇧")&&!b.startsWith("🇨🇦")&&(b=`🌍 ${b}`);const ee=Z?Z.split(/[,#\s]+/).filter(Boolean).map(F=>F.startsWith("#")?F:`#${F}`):[];y?(ge(y,{title:h,category:H,content:k,author:L,country:b,tags:ee,password:X||void 0}),$({title:"Discussion Updated",message:l("postEditSuccess")||"Your discussion has been updated."}),f===y&&j(y)):(ye({title:h,category:H,content:k,author:L,country:b,password:X||"1234",tags:ee,status:"published"}),$({title:"Discussion Published",message:l("postSuccessToast")||"Your discussion post has been published!"}),u=1),d(),v()}),document.querySelectorAll(".comm-filter-pill").forEach(m=>{m.addEventListener("click",()=>{document.querySelectorAll(".comm-filter-pill").forEach(y=>y.classList.remove("active")),m.classList.add("active"),q=m.dataset.commCategory||"all",u=1,v()})});const E=document.getElementById("comm-search-input");if(E){let m;E.addEventListener("input",y=>{clearTimeout(m),m=setTimeout(()=>{ce=y.target.value.trim(),u=1,v()},250)})}const I=document.getElementById("comm-sort-select");I&&I.addEventListener("change",m=>{le=m.target.value,u=1,v()});const r=document.getElementById("btn-view-cards"),x=document.getElementById("btn-view-table");r&&x&&(r.addEventListener("click",()=>{K="cards",r.classList.add("active"),x.classList.remove("active"),v()}),x.addEventListener("click",()=>{K="table",x.classList.add("active"),r.classList.remove("active"),v()}));const g=document.getElementById("comm-detail-modal"),w=document.getElementById("btn-close-detail-modal");w==null||w.addEventListener("click",()=>{g==null||g.classList.remove("open")}),g==null||g.addEventListener("click",m=>{m.target===g&&g.classList.remove("open")});const N=document.getElementById("btn-detail-like");N==null||N.addEventListener("click",()=>{if(!f)return;const m=se(f);document.getElementById("comm-detail-likes-count").textContent=m.likes,document.getElementById("comm-detail-likes-top").textContent=m.likes;const y=document.getElementById("comm-detail-heart-icon");y&&(y.style.transform="scale(1.3)"),setTimeout(()=>{y&&(y.style.transform="scale(1)")},200),v()});const R=document.getElementById("btn-detail-share");R==null||R.addEventListener("click",()=>{if(!f)return;const m=`${window.location.origin}${window.location.pathname}#post-${f}`;navigator.clipboard?navigator.clipboard.writeText(m).then(()=>{$({title:"Link Copied",message:l("linkCopiedToast")||"Link copied to clipboard!"})}):$({title:"Link Copied",message:m})});const U=document.getElementById("btn-detail-edit");U==null||U.addEventListener("click",()=>{f&&Q({type:"edit-post",postId:f})});const V=document.getElementById("btn-detail-delete");V==null||V.addEventListener("click",()=>{f&&Q({type:"delete-post",postId:f})});const z=document.getElementById("comm-reply-form");z==null||z.addEventListener("submit",m=>{if(m.preventDefault(),!f)return;const y=document.getElementById("comm-reply-author").value.trim();let h=document.getElementById("comm-reply-country").value.trim()||"Global";const H=document.getElementById("comm-reply-password").value.trim(),k=document.getElementById("comm-reply-content").value.trim();if(!y||!k)return;!h.startsWith("🇺🇸")&&!h.startsWith("🇯🇵")&&!h.startsWith("🇰🇷")&&!h.startsWith("🇬🇧")&&!h.startsWith("🇨🇦")&&(h=`🌍 ${h}`),ve(f,{author:y,country:h,password:H||"1234",content:k}),z.reset(),$({title:"Reply Posted",message:l("replySuccessToast")||"Reply posted successfully!"});const L=C().find(b=>b.id===f);L&&(_(L),document.getElementById("comm-detail-comments-top").textContent=(L.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=(L.replies||[]).length),v()});const B=document.getElementById("comm-pass-modal"),G=document.getElementById("btn-cancel-pass-modal"),W=document.getElementById("btn-confirm-pass-modal"),O=document.getElementById("comm-input-verify-password");G==null||G.addEventListener("click",()=>{B==null||B.classList.remove("open"),A=null}),B==null||B.addEventListener("click",m=>{m.target===B&&(B.classList.remove("open"),A=null)}),W==null||W.addEventListener("click",ne),O==null||O.addEventListener("keydown",m=>{m.key==="Enter"&&ne()})}function Q(t){A=t;const n=document.getElementById("comm-pass-modal"),e=document.getElementById("comm-input-verify-password"),s=document.getElementById("comm-pass-error"),o=document.getElementById("comm-pass-title"),a=document.getElementById("comm-pass-desc");!n||!e||(e.value="",s&&(s.style.display="none",s.textContent=""),t.type==="edit-post"?(o&&(o.textContent=l("passwordPromptTitle")||"Enter Post Passcode"),a&&(a.textContent="Please enter your 4-digit passcode to edit this discussion.")):t.type==="delete-post"?(o&&(o.textContent=l("deletePostBtn")||"Delete Post"),a&&(a.textContent="Please enter your passcode to permanently delete this discussion.")):t.type==="delete-comment"&&(o&&(o.textContent="Delete Reply"),a&&(a.textContent="Please enter the passcode you set when leaving this reply.")),n.classList.add("open"),e.focus())}function ne(){var d,E;if(!A)return;const t=document.getElementById("comm-input-verify-password"),n=document.getElementById("comm-pass-error"),e=document.getElementById("comm-pass-modal"),s=t?t.value.trim():"";if(!s){n&&(n.textContent="Please enter passcode.",n.style.display="block");return}const{type:o,postId:a,commentId:c}=A,i=C().find(I=>I.id===a);if(o==="edit-post"||o==="delete-post"){if(!i){e==null||e.classList.remove("open");return}if(i.password&&i.password!==s){n&&(n.textContent=l("passwordIncorrect")||"Incorrect passcode. Please try again.",n.style.display="block");return}e==null||e.classList.remove("open"),o==="delete-post"?(Ie(a),(d=document.getElementById("comm-detail-modal"))==null||d.classList.remove("open"),$({title:"Deleted",message:l("postDeleteSuccess")||"Post deleted successfully."}),v()):o==="edit-post"&&((E=document.getElementById("comm-detail-modal"))==null||E.classList.remove("open"),ze(i))}else if(o==="delete-comment"){const I=xe(a,c,s);if(!I.success){n&&(n.textContent=I.message||"Incorrect passcode.",n.style.display="block");return}e==null||e.classList.remove("open"),$({title:"Deleted",message:l("commentDeleteSuccess")||"Reply deleted successfully."});const r=C().find(x=>x.id===a);r&&(_(r),document.getElementById("comm-detail-comments-top").textContent=(r.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=(r.replies||[]).length),v()}}function ze(t){const n=document.getElementById("community-new-post-box"),e=document.getElementById("comm-form-heading"),s=document.getElementById("btn-submit-comm-post"),o=document.getElementById("comm-edit-post-id");n&&(o&&(o.value=t.id),document.getElementById("comm-post-title").value=t.title||"",document.getElementById("comm-post-category").value=t.category||"Routine Advice",document.getElementById("comm-post-content").value=t.content||"",document.getElementById("comm-post-author").value=t.author||"",document.getElementById("comm-post-country").value=t.country||"",document.getElementById("comm-post-password").value=t.password||"",document.getElementById("comm-post-tags").value=(t.tags||[]).join(", "),e&&(e.textContent=l("editPostBtn")||"Edit Discussion"),s&&(s.textContent="Update Post"),n.classList.add("open"),n.scrollIntoView({behavior:"smooth",block:"start"}))}function v(){const t=document.getElementById("comm-posts-view-container"),n=document.getElementById("comm-pinned-notices");if(!t)return;const e=C().filter(i=>i.status!=="hidden");if(n){const i=e.filter(d=>d.isPinned||d.category==="Notice");i.length>0&&(q==="all"||q==="Notice")?(n.style.display="flex",n.innerHTML=i.map(d=>`
        <div class="comm-pinned-card" data-post-id="${d.id}">
          <div class="comm-pinned-title">
            <span class="comm-notice-badge">📌 ${l("pinnedNoticeBadge")||"NOTICE"}</span>
            <span>${p(d.title)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 14px; font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap;">
            <span>👁️ ${d.views||0}</span>
            <span>💬 ${(d.replies||[]).length}</span>
            <span>${d.date}</span>
          </div>
        </div>
      `).join(""),n.querySelectorAll(".comm-pinned-card").forEach(d=>{d.addEventListener("click",()=>{j(d.dataset.postId)})})):(n.style.display="none",n.innerHTML="")}const s=Ee({includeHidden:!1,category:q,searchQuery:ce,sortBy:le});if(s.length===0){t.innerHTML=`
      <div style="text-align: center; padding: 48px 24px; color: var(--color-text-muted); background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-card-border);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🌸</div>
        <p style="font-size: 1.05rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 6px;">${l("noPostsFound")||"No discussions found matching your filter."}</p>
        <p style="font-size: 0.88rem; margin-bottom: 16px;">Be the first to share your K-Beauty holy grail discoveries or ask for routine advice!</p>
        <button class="btn-primary" onclick="document.getElementById('btn-open-new-post').click();" style="padding: 9px 20px; font-size: 0.88rem;">${l("askQuestionBtn")||"+ Start a Discussion"}</button>
      </div>
    `,oe(0);return}const o=Math.ceil(s.length/Y)||1;u=Math.min(Math.max(1,u),o);const a=(u-1)*Y,c=s.slice(a,a+Y);K==="table"?Me(c,t):He(c,t),oe(o)}function He(t,n){n.innerHTML=`
    <div class="community-posts-list">
      ${t.map(e=>{const s=(e.replies||[]).length,o=ae(e.id);return`
          <div class="community-card" id="comm-card-${e.id}" data-post-id="${e.id}">
            <div class="community-card-header">
              <div class="community-author-row">
                <span class="community-avatar">${re(e.author)}</span>
                <div>
                  <div class="community-author-name">
                    ${p(e.author)}
                    <span class="community-author-country">${p(e.country)}</span>
                  </div>
                  <div class="community-post-date">${e.date}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                ${e.isPinned?'<span class="comm-notice-badge">📌 NOTICE</span>':""}
                <span class="community-cat-badge">${p(e.category)}</span>
              </div>
            </div>

            <h3 class="community-post-title">${p(e.title)}</h3>
            <p class="community-post-content">${p(e.content)}</p>

            ${e.tags&&e.tags.length>0?`
              <div class="community-tags-row">
                ${e.tags.map(a=>`<span class="comm-tag-chip">${p(a)}</span>`).join("")}
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
  `,n.querySelectorAll(".community-card").forEach(e=>{e.addEventListener("click",s=>{s.target.closest(".btn-card-like")||j(e.dataset.postId)})}),n.querySelectorAll(".btn-card-like").forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const o=e.dataset.postId,a=se(o);e.querySelector(".like-count").textContent=a.likes,a.isLiked?e.classList.add("active"):e.classList.remove("active")})})}function Me(t,n){n.innerHTML=`
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
                    ${p(e.category)}
                  </span>
                </td>
                <td>
                  <div class="comm-table-title">
                    <span>${p(e.title)}</span>
                    ${s>0?`<span class="comm-reply-count-badge">[${s}]</span>`:""}
                  </div>
                </td>
                <td>
                  <div style="font-weight: 500; color: var(--color-text-main); font-size: 0.84rem;">
                    ${p(e.author)}
                  </div>
                  <div style="font-size: 0.72rem; color: var(--color-text-muted);">
                    ${p(e.country)}
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
  `,n.querySelectorAll(".comm-table-row").forEach(e=>{e.addEventListener("click",()=>{j(e.dataset.postId)})})}function oe(t){var s,o,a,c;const n=document.getElementById("comm-pagination-bar");if(!n)return;if(t<=1){n.innerHTML="";return}let e=`
    <button class="comm-page-btn" id="btn-page-first" ${u===1?"disabled":""} title="First Page">«</button>
    <button class="comm-page-btn" id="btn-page-prev" ${u===1?"disabled":""} title="Previous Page">‹</button>
  `;for(let i=1;i<=t;i++)e+=`
      <button class="comm-page-btn ${i===u?"active":""}" data-page="${i}">
        ${i}
      </button>
    `;e+=`
    <button class="comm-page-btn" id="btn-page-next" ${u===t?"disabled":""} title="Next Page">›</button>
    <button class="comm-page-btn" id="btn-page-last" ${u===t?"disabled":""} title="Last Page">»</button>
  `,n.innerHTML=e,n.querySelectorAll(".comm-page-btn[data-page]").forEach(i=>{i.addEventListener("click",()=>{var d;u=parseInt(i.dataset.page,10),v(),(d=document.getElementById("community"))==null||d.scrollIntoView({behavior:"smooth",block:"start"})})}),(s=document.getElementById("btn-page-first"))==null||s.addEventListener("click",()=>{var i;u>1&&(u=1,v(),(i=document.getElementById("community"))==null||i.scrollIntoView({behavior:"smooth",block:"start"}))}),(o=document.getElementById("btn-page-prev"))==null||o.addEventListener("click",()=>{var i;u>1&&(u--,v(),(i=document.getElementById("community"))==null||i.scrollIntoView({behavior:"smooth",block:"start"}))}),(a=document.getElementById("btn-page-next"))==null||a.addEventListener("click",()=>{var i;u<t&&(u++,v(),(i=document.getElementById("community"))==null||i.scrollIntoView({behavior:"smooth",block:"start"}))}),(c=document.getElementById("btn-page-last"))==null||c.addEventListener("click",()=>{var i;u<t&&(u=t,v(),(i=document.getElementById("community"))==null||i.scrollIntoView({behavior:"smooth",block:"start"}))})}function j(t){f=t,he(t);const n=C().find(c=>c.id===t);if(!n)return;const e=document.getElementById("comm-detail-modal");if(!e)return;document.getElementById("comm-detail-cat-badge").textContent=n.category,document.getElementById("comm-detail-date").textContent=n.date,document.getElementById("comm-detail-title").textContent=n.title,document.getElementById("comm-detail-avatar").textContent=re(n.author),document.getElementById("comm-detail-author").textContent=n.author,document.getElementById("comm-detail-country").textContent=n.country,document.getElementById("comm-detail-views").textContent=n.views||0,document.getElementById("comm-detail-likes-top").textContent=n.likes||0,document.getElementById("comm-detail-comments-top").textContent=(n.replies||[]).length,document.getElementById("comm-detail-content").textContent=n.content;const s=document.getElementById("comm-detail-tags");s&&(n.tags&&n.tags.length>0?(s.innerHTML=n.tags.map(c=>`<span class="comm-tag-chip">${p(c)}</span>`).join(""),s.style.display="flex"):(s.innerHTML="",s.style.display="none"));const o=ae(t),a=document.getElementById("btn-detail-like");document.getElementById("comm-detail-likes-count").textContent=n.likes||0,a&&(o?a.classList.add("active"):a.classList.remove("active")),_(n),e.classList.add("open")}function _(t){const n=document.getElementById("comm-detail-comments-list"),e=document.getElementById("comm-detail-replies-count");if(!n)return;const s=t.replies||[];if(e&&(e.textContent=s.length),s.length===0){n.innerHTML=`
      <div style="text-align: center; padding: 24px; color: var(--color-text-muted); font-size: 0.88rem; background: var(--color-bg-alt); border-radius: var(--radius-sm);">
        No replies yet. Be the first to share your thoughts!
      </div>
    `;return}n.innerHTML=s.map(o=>`
    <div class="comm-comment-item" id="comm-reply-${o.id}">
      <div class="comm-comment-header">
        <div class="comm-comment-author-info">
          <span style="font-size: 1rem;">💬</span>
          <span>${p(o.author)}</span>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: normal;">${p(o.country||"")}</span>
        </div>
        <div style="color: var(--color-text-muted); font-size: 0.78rem;">
          ${o.date}
        </div>
      </div>
      <div class="comm-comment-content">${p(o.content)}</div>
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
  `).join(""),n.querySelectorAll(".btn-like-comment").forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.commentId,c=be(t.id,a);o.querySelector(".comment-like-count").textContent=c.likes})}),n.querySelectorAll(".btn-delete-comment").forEach(o=>{o.addEventListener("click",()=>{const a=o.dataset.commentId;Q({type:"delete-comment",postId:t.id,commentId:a})})})}function re(t){if(!t)return"K";const n=t.trim().split(" ");return n.length>=2?`${n[0][0]}${n[1][0]}`.toUpperCase():t.slice(0,2).toUpperCase()}function p(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function De(){const t=document.getElementById("routine-skin-select"),n=document.getElementById("routine-goal-select"),e=document.getElementById("routine-results-container"),s=document.getElementById("routine-steps-grid");if(!t||!n||!e||!s)return;t.value;const o=n.value,a=S(),c=ie();let i=c.find(r=>r.id==="anua-heartleaf-toner"),d=c.find(r=>r.id==="torriden-dive-in-serum"),E=c.find(r=>r.id==="round-lab-birch-sunscreen");o==="glow"?(d=c.find(r=>r.id==="cosrx-snail-mucin-essence")||d,E=c.find(r=>r.id==="beauty-of-joseon-sunscreen")||E):o==="calm"&&(i=c.find(r=>r.id==="mediheal-madecassoside-pad")||i);const I=[{title:"Step 1: Low-pH Toner & Prep",product:i,note:"Balances skin mantle and opens cellular hydration channels."},{title:"Step 2: Active Repair Ampoule",product:d,note:"Infuses multi-depth moisture and reinforces damaged barrier lipids."},{title:"Step 3: Lightweight Daily Sun Shield",product:E,note:"Broad-spectrum SPF 50+ essential to prevent hyperpigmentation."}];s.innerHTML=I.map((r,x)=>{const g=r.product,w=g.name[a]||g.name.en;return`
      <div class="step-box">
        <span class="step-number">${r.title}</span>
        <div style="font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.4;">${r.note}</div>
        <img src="${g.image}" alt="${w}" style="height: 130px; object-fit: contain; margin: 10px 0; border-radius: var(--radius-sm);" />
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${g.brand}</div>
        <div style="font-size: 0.9rem; font-weight: 600; line-height: 1.35;">${w}</div>
        <div style="font-size: 0.8rem; color: var(--color-olive-young); font-weight: 500; margin-top: auto;">✓ Olive Young Global Stock</div>
        <a href="${g.oliveYoungUrl}" class="btn-primary" data-product-id="${g.id}" data-url="${g.oliveYoungUrl}" style="padding: 8px 12px; font-size: 0.8rem; margin-top: 10px; border-radius: var(--radius-sm); justify-content: center; text-decoration: none;">
          ${l("viewOnOliveYoung")}
        </a>
      </div>
    `}).join(""),s.querySelectorAll(".btn-primary").forEach(r=>{r.addEventListener("click",x=>{fe(x,r.dataset.productId,r.dataset.url,"routine_diagnostic")})}),e.classList.add("visible"),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function me(){const t=S(),n={en:"Curated K-Beauty intelligence, glass skin routines, and Olive Young Global shopping guides with exclusive promo code discounts.",zh:"首尔正统韩系护肤专栏、水光肌公式与 Olive Young Global 全球直邮省钱指南，独家专享海淘优惠码。",ja:"ソウル発の最新韓国スキンケアトレンド、水光肌ルーティン、オリーブヤンググローバル公式通販の購入ガイド。"};Be({title:`${l("brandName")} | ${l("brandTagline")}`,description:n[t]||n.en,products:ie()})}function qe(){const t=document.getElementById("seo-inspector-data");if(!t)return;const n=S(),e=window.location.origin+window.location.pathname,s=document.getElementById("seo-json-ld"),o=s?s.textContent:"Generating...";t.innerHTML=`
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
  `}function je(t){return{awards:l("filterAwards"),"glass-skin":l("filterGlassSkin"),"sun-care":l("filterSunCare"),trouble:l("filterTrouble")}[t]||t}document.addEventListener("DOMContentLoaded",()=>{Le()});
