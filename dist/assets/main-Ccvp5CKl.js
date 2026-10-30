import{A as ue,C as A,D as pe,E as te,s as L,F as l,u as ye,m as ge,I as se,o as ve,i as C,B as fe,H as J,x as ie,G as he,K as Ee,J as ae,c as be,L as Ie,l as xe,w as Be}from"./affiliate-DWzbOA_n.js";/* empty css             */import{u as $e}from"./seo-DZt5Fohp.js";let M="all",q="all",P="",D="all",ce="",le="latest",K="cards",u=1;const F=6;let f=null,T=null;function Le(){ue(),ke(),we(),Ce(),ze(),de(),Ae(),me()}function ke(){const n=document.getElementById("lang-select");n&&(n.value=A(),n.addEventListener("change",t=>{pe(t.target.value),de(),me()}));const o=document.getElementById("promo-code-btn");o&&o.addEventListener("click",()=>te(o));const e=document.getElementById("sidebar-promo-copy-btn");e&&e.addEventListener("click",()=>te(e));const s=document.getElementById("search-input");s&&s.addEventListener("input",t=>{P=t.target.value.toLowerCase().trim(),S()}),document.querySelectorAll(".filter-pill[data-category]").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-category]").forEach(i=>i.classList.remove("active")),t.classList.add("active"),M=t.dataset.category,S()})}),document.querySelectorAll(".filter-pill[data-skintype]").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".filter-pill[data-skintype]").forEach(i=>i.classList.remove("active")),t.classList.add("active"),q=t.dataset.skintype,S()})})}function we(){const n=document.getElementById("newsletter-form");n&&n.addEventListener("submit",o=>{o.preventDefault(),document.getElementById("newsletter-email").value&&(L({title:"Welcome to The K-Glow Edit",message:"Your exclusive 10% Olive Young promo code GLOW10 has been dispatched to your inbox."}),n.reset())})}function Ce(){const n=document.getElementById("btn-run-routine");n&&n.addEventListener("click",()=>{De()})}function de(){Se(),fe(),Te(),S(),Pe()}function Pe(){const n=document.getElementById("sidebar-community-list");if(!n)return;const s=[...C().filter(t=>t.status!=="hidden")].sort((t,i)=>{const c=new Date(t.createdAt||t.date).getTime()||0;return(new Date(i.createdAt||i.date).getTime()||0)-c}).slice(0,5);if(s.length===0){n.innerHTML=`
      <li class="sidebar-comm-empty">
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">${l("noDiscussionsFound")||"No discussions yet."}</span>
      </li>
    `;return}n.innerHTML=s.map((t,i)=>`
    <li class="sidebar-comm-item">
      <a href="/community.html?postId=${encodeURIComponent(t.id)}" class="sidebar-comm-link" title="${p(t.title)}">
        <span class="sidebar-comm-index">${i+1}</span>
        <span class="sidebar-comm-title">${p(t.title)}</span>
        <span class="sidebar-comm-arrow" aria-hidden="true">→</span>
      </a>
    </li>
  `).join("")}function Se(){document.querySelectorAll("[data-i18n]").forEach(n=>{const o=n.dataset.i18n;o&&(n.textContent=l(o))}),document.querySelectorAll("[data-i18n-placeholder]").forEach(n=>{const o=n.dataset.i18nPlaceholder;o&&n.setAttribute("placeholder",l(o))})}function Te(){const n=document.getElementById("featured-story-wrap");if(!n)return;const o=J(),e=o.find(a=>a.featured)||o[0];if(!e)return;const s=A(),t=e.title[s]||e.title.en,i=e.excerpt[s]||e.excerpt.en,c=`/article.html?slug=${encodeURIComponent(e.slug)}`;n.innerHTML=`
    <div class="featured-story-card" id="featured-${e.id}">
      <div class="featured-img-wrap">
        <a href="${c}">
          <img src="${e.coverImage}" alt="${t}" class="featured-img" loading="eager" />
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
          <a href="${c}" style="color: inherit; text-decoration: none;">${t}</a>
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
          <a href="${c}" class="btn-primary" style="padding: 10px 22px; font-size: 0.9rem; text-decoration: none; display: inline-flex;">
            ${l("readFullArticle")} →
          </a>
        </div>
      </div>
    </div>
  `}function S(){const n=document.getElementById("articles-grid");if(!n)return;const o=A(),s=J().filter(t=>{const i=M==="all"||t.category===M,c=q==="all"||t.skinType===q||t.skinType==="all",a=(t.title[o]||t.title.en||"").toLowerCase(),r=(t.excerpt[o]||t.excerpt.en||"").toLowerCase(),E=!P||a.includes(P)||r.includes(P);return i&&c&&E});if(s.length===0){n.innerHTML=`
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 8px;">No guides found matching your filter criteria.</p>
        <button class="btn-secondary" id="reset-filter-btn" style="padding: 8px 18px; font-size: 0.85rem;">Clear Filters</button>
      </div>
    `;const t=document.getElementById("reset-filter-btn");t&&t.addEventListener("click",()=>{M="all",q="all",P="",document.querySelectorAll(".filter-pill").forEach(i=>i.classList.remove("active")),document.querySelectorAll('.filter-pill[data-category="all"], .filter-pill[data-skintype="all"]').forEach(i=>i.classList.add("active")),S()});return}n.innerHTML=s.map(t=>{const i=t.title[o]||t.title.en,c=t.excerpt[o]||t.excerpt.en,a=`/article.html?slug=${encodeURIComponent(t.slug)}`;return`
      <article class="article-card" data-article-id="${t.id}">
        <a href="${a}" style="text-decoration: none; color: inherit; display: block;">
          <div class="article-thumb-wrap">
            <img src="${t.coverImage}" alt="${i}" class="article-thumb" loading="lazy" />
            <span class="category-tag-float">${Ne(t.category)}</span>
          </div>
          <div class="article-body">
            <div class="meta-row" style="font-size: 0.78rem;">
              <span>${t.readTime} ${l("readTime")}</span>
              <span>•</span>
              <span>${t.publishDate}</span>
            </div>
            <h3 class="article-title">${i}</h3>
            <p class="article-snippet">${c}</p>
            <div class="article-footer">
              <span>${t.views.toLocaleString()} ${l("views")}</span>
              <span class="read-more-link">${l("readFullArticle")} →</span>
            </div>
          </div>
        </a>
      </article>
    `}).join("")}function Ae(){const n=window.location.hash.replace("#","");if(!n)return;const e=J().find(s=>s.slug===n||s.id===n);e&&(window.location.href=`/article.html?slug=${encodeURIComponent(e.slug)}`)}function ze(){const n=document.getElementById("community-new-post-box");if(!n)return;const o=document.getElementById("btn-open-new-post"),e=document.getElementById("btn-cancel-post"),s=document.getElementById("btn-close-post-box"),t=document.getElementById("community-post-form"),i=document.getElementById("comm-form-heading"),c=document.getElementById("btn-submit-comm-post"),a=document.getElementById("comm-edit-post-id");o&&n&&o.addEventListener("click",()=>{var m;a&&(a.value=""),t==null||t.reset(),i&&(i.textContent=l("postModalTitle")||"Start a Discussion in the Community"),c&&(c.textContent=l("submitPostBtn")||"Publish Post"),n.classList.toggle("open"),n.classList.contains("open")&&((m=document.getElementById("comm-post-title"))==null||m.focus(),n.scrollIntoView({behavior:"smooth",block:"start"}))});const r=()=>{n==null||n.classList.remove("open"),a&&(a.value=""),t==null||t.reset()};e==null||e.addEventListener("click",r),s==null||s.addEventListener("click",r),t&&t.addEventListener("submit",m=>{m.preventDefault();const g=a&&a.value.trim(),h=document.getElementById("comm-post-title").value.trim(),H=document.getElementById("comm-post-category").value,w=document.getElementById("comm-post-content").value.trim(),$=document.getElementById("comm-post-author").value.trim();let b=document.getElementById("comm-post-country").value.trim()||"Global";const X=document.getElementById("comm-post-password").value.trim(),Z=document.getElementById("comm-post-tags").value.trim();if(!h||!w||!$)return;!b.startsWith("🇺🇸")&&!b.startsWith("🇯🇵")&&!b.startsWith("🇰🇷")&&!b.startsWith("🇬🇧")&&!b.startsWith("🇨🇦")&&(b=`🌍 ${b}`);const ee=Z?Z.split(/[,#\s]+/).filter(Boolean).map(Y=>Y.startsWith("#")?Y:`#${Y}`):[];g?(ye(g,{title:h,category:H,content:w,author:$,country:b,tags:ee,password:X||void 0}),L({title:"Discussion Updated",message:l("postEditSuccess")||"Your discussion has been updated."}),f===g&&N(g)):(ge({title:h,category:H,content:w,author:$,country:b,password:X||"1234",tags:ee,status:"published"}),L({title:"Discussion Published",message:l("postSuccessToast")||"Your discussion post has been published!"}),u=1),r(),v()}),document.querySelectorAll(".comm-filter-pill").forEach(m=>{m.addEventListener("click",()=>{document.querySelectorAll(".comm-filter-pill").forEach(g=>g.classList.remove("active")),m.classList.add("active"),D=m.dataset.commCategory||"all",u=1,v()})});const E=document.getElementById("comm-search-input");if(E){let m;E.addEventListener("input",g=>{clearTimeout(m),m=setTimeout(()=>{ce=g.target.value.trim(),u=1,v()},250)})}const I=document.getElementById("comm-sort-select");I&&I.addEventListener("change",m=>{le=m.target.value,u=1,v()});const d=document.getElementById("btn-view-cards"),x=document.getElementById("btn-view-table");d&&x&&(d.addEventListener("click",()=>{K="cards",d.classList.add("active"),x.classList.remove("active"),v()}),x.addEventListener("click",()=>{K="table",x.classList.add("active"),d.classList.remove("active"),v()}));const y=document.getElementById("comm-detail-modal"),k=document.getElementById("btn-close-detail-modal");k==null||k.addEventListener("click",()=>{y==null||y.classList.remove("open")}),y==null||y.addEventListener("click",m=>{m.target===y&&y.classList.remove("open")});const R=document.getElementById("btn-detail-like");R==null||R.addEventListener("click",()=>{if(!f)return;const m=se(f);document.getElementById("comm-detail-likes-count").textContent=m.likes,document.getElementById("comm-detail-likes-top").textContent=m.likes;const g=document.getElementById("comm-detail-heart-icon");g&&(g.style.transform="scale(1.3)"),setTimeout(()=>{g&&(g.style.transform="scale(1)")},200),v()});const V=document.getElementById("btn-detail-share");V==null||V.addEventListener("click",()=>{if(!f)return;const m=`${window.location.origin}${window.location.pathname}#post-${f}`;navigator.clipboard?navigator.clipboard.writeText(m).then(()=>{L({title:"Link Copied",message:l("linkCopiedToast")||"Link copied to clipboard!"})}):L({title:"Link Copied",message:m})});const j=document.getElementById("btn-detail-edit");j==null||j.addEventListener("click",()=>{f&&Q({type:"edit-post",postId:f})});const U=document.getElementById("btn-detail-delete");U==null||U.addEventListener("click",()=>{f&&Q({type:"delete-post",postId:f})});const z=document.getElementById("comm-reply-form");z==null||z.addEventListener("submit",m=>{if(m.preventDefault(),!f)return;const g=document.getElementById("comm-reply-author").value.trim();let h=document.getElementById("comm-reply-country").value.trim()||"Global";const H=document.getElementById("comm-reply-password").value.trim(),w=document.getElementById("comm-reply-content").value.trim();if(!g||!w)return;!h.startsWith("🇺🇸")&&!h.startsWith("🇯🇵")&&!h.startsWith("🇰🇷")&&!h.startsWith("🇬🇧")&&!h.startsWith("🇨🇦")&&(h=`🌍 ${h}`),ve(f,{author:g,country:h,password:H||"1234",content:w}),z.reset(),L({title:"Reply Posted",message:l("replySuccessToast")||"Reply posted successfully!"});const $=C().find(b=>b.id===f);$&&(_($),document.getElementById("comm-detail-comments-top").textContent=($.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=($.replies||[]).length),v()});const B=document.getElementById("comm-pass-modal"),W=document.getElementById("btn-cancel-pass-modal"),O=document.getElementById("btn-confirm-pass-modal"),G=document.getElementById("comm-input-verify-password");W==null||W.addEventListener("click",()=>{B==null||B.classList.remove("open"),T=null}),B==null||B.addEventListener("click",m=>{m.target===B&&(B.classList.remove("open"),T=null)}),O==null||O.addEventListener("click",ne),G==null||G.addEventListener("keydown",m=>{m.key==="Enter"&&ne()})}function Q(n){T=n;const o=document.getElementById("comm-pass-modal"),e=document.getElementById("comm-input-verify-password"),s=document.getElementById("comm-pass-error"),t=document.getElementById("comm-pass-title"),i=document.getElementById("comm-pass-desc");!o||!e||(e.value="",s&&(s.style.display="none",s.textContent=""),n.type==="edit-post"?(t&&(t.textContent=l("passwordPromptTitle")||"Enter Post Passcode"),i&&(i.textContent="Please enter your 4-digit passcode to edit this discussion.")):n.type==="delete-post"?(t&&(t.textContent=l("deletePostBtn")||"Delete Post"),i&&(i.textContent="Please enter your passcode to permanently delete this discussion.")):n.type==="delete-comment"&&(t&&(t.textContent="Delete Reply"),i&&(i.textContent="Please enter the passcode you set when leaving this reply.")),o.classList.add("open"),e.focus())}function ne(){var r,E;if(!T)return;const n=document.getElementById("comm-input-verify-password"),o=document.getElementById("comm-pass-error"),e=document.getElementById("comm-pass-modal"),s=n?n.value.trim():"";if(!s){o&&(o.textContent="Please enter passcode.",o.style.display="block");return}const{type:t,postId:i,commentId:c}=T,a=C().find(I=>I.id===i);if(t==="edit-post"||t==="delete-post"){if(!a){e==null||e.classList.remove("open");return}if(a.password&&a.password!==s){o&&(o.textContent=l("passwordIncorrect")||"Incorrect passcode. Please try again.",o.style.display="block");return}e==null||e.classList.remove("open"),t==="delete-post"?(xe(i),(r=document.getElementById("comm-detail-modal"))==null||r.classList.remove("open"),L({title:"Deleted",message:l("postDeleteSuccess")||"Post deleted successfully."}),v()):t==="edit-post"&&((E=document.getElementById("comm-detail-modal"))==null||E.classList.remove("open"),He(a))}else if(t==="delete-comment"){const I=Be(i,c,s);if(!I.success){o&&(o.textContent=I.message||"Incorrect passcode.",o.style.display="block");return}e==null||e.classList.remove("open"),L({title:"Deleted",message:l("commentDeleteSuccess")||"Reply deleted successfully."});const d=C().find(x=>x.id===i);d&&(_(d),document.getElementById("comm-detail-comments-top").textContent=(d.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=(d.replies||[]).length),v()}}function He(n){const o=document.getElementById("community-new-post-box"),e=document.getElementById("comm-form-heading"),s=document.getElementById("btn-submit-comm-post"),t=document.getElementById("comm-edit-post-id");o&&(t&&(t.value=n.id),document.getElementById("comm-post-title").value=n.title||"",document.getElementById("comm-post-category").value=n.category||"Routine Advice",document.getElementById("comm-post-content").value=n.content||"",document.getElementById("comm-post-author").value=n.author||"",document.getElementById("comm-post-country").value=n.country||"",document.getElementById("comm-post-password").value=n.password||"",document.getElementById("comm-post-tags").value=(n.tags||[]).join(", "),e&&(e.textContent=l("editPostBtn")||"Edit Discussion"),s&&(s.textContent="Update Post"),o.classList.add("open"),o.scrollIntoView({behavior:"smooth",block:"start"}))}function v(){const n=document.getElementById("comm-posts-view-container"),o=document.getElementById("comm-pinned-notices");if(!n)return;const e=C().filter(a=>a.status!=="hidden");if(o){const a=e.filter(r=>r.isPinned||r.category==="Notice");a.length>0&&(D==="all"||D==="Notice")?(o.style.display="flex",o.innerHTML=a.map(r=>`
        <div class="comm-pinned-card" data-post-id="${r.id}">
          <div class="comm-pinned-title">
            <span class="comm-notice-badge">📌 ${l("pinnedNoticeBadge")||"NOTICE"}</span>
            <span>${p(r.title)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 14px; font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap;">
            <span>👁️ ${r.views||0}</span>
            <span>💬 ${(r.replies||[]).length}</span>
            <span>${r.date}</span>
          </div>
        </div>
      `).join(""),o.querySelectorAll(".comm-pinned-card").forEach(r=>{r.addEventListener("click",()=>{N(r.dataset.postId)})})):(o.style.display="none",o.innerHTML="")}const s=be({includeHidden:!1,category:D,searchQuery:ce,sortBy:le});if(s.length===0){n.innerHTML=`
      <div style="text-align: center; padding: 48px 24px; color: var(--color-text-muted); background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-card-border);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🌸</div>
        <p style="font-size: 1.05rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 6px;">${l("noPostsFound")||"No discussions found matching your filter."}</p>
        <p style="font-size: 0.88rem; margin-bottom: 16px;">Be the first to share your K-Beauty holy grail discoveries or ask for routine advice!</p>
        <button class="btn-primary" onclick="document.getElementById('btn-open-new-post').click();" style="padding: 9px 20px; font-size: 0.88rem;">${l("askQuestionBtn")||"+ Start a Discussion"}</button>
      </div>
    `,oe(0);return}const t=Math.ceil(s.length/F)||1;u=Math.min(Math.max(1,u),t);const i=(u-1)*F,c=s.slice(i,i+F);K==="table"?qe(c,n):Me(c,n),oe(t)}function Me(n,o){o.innerHTML=`
    <div class="community-posts-list">
      ${n.map(e=>{const s=(e.replies||[]).length,t=ae(e.id);return`
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
                ${e.tags.map(i=>`<span class="comm-tag-chip">${p(i)}</span>`).join("")}
              </div>
            `:""}

            <div class="community-actions-bar">
              <div class="comm-actions-left">
                <button class="community-action-btn btn-card-like ${t?"active":""}" data-post-id="${e.id}">
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
  `,o.querySelectorAll(".community-card").forEach(e=>{e.addEventListener("click",s=>{s.target.closest(".btn-card-like")||N(e.dataset.postId)})}),o.querySelectorAll(".btn-card-like").forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const t=e.dataset.postId,i=se(t);e.querySelector(".like-count").textContent=i.likes,i.isLiked?e.classList.add("active"):e.classList.remove("active")})})}function qe(n,o){o.innerHTML=`
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
          ${n.map(e=>{const s=(e.replies||[]).length;return`
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
  `,o.querySelectorAll(".comm-table-row").forEach(e=>{e.addEventListener("click",()=>{N(e.dataset.postId)})})}function oe(n){var s,t,i,c;const o=document.getElementById("comm-pagination-bar");if(!o)return;if(n<=1){o.innerHTML="";return}let e=`
    <button class="comm-page-btn" id="btn-page-first" ${u===1?"disabled":""} title="First Page">«</button>
    <button class="comm-page-btn" id="btn-page-prev" ${u===1?"disabled":""} title="Previous Page">‹</button>
  `;for(let a=1;a<=n;a++)e+=`
      <button class="comm-page-btn ${a===u?"active":""}" data-page="${a}">
        ${a}
      </button>
    `;e+=`
    <button class="comm-page-btn" id="btn-page-next" ${u===n?"disabled":""} title="Next Page">›</button>
    <button class="comm-page-btn" id="btn-page-last" ${u===n?"disabled":""} title="Last Page">»</button>
  `,o.innerHTML=e,o.querySelectorAll(".comm-page-btn[data-page]").forEach(a=>{a.addEventListener("click",()=>{var r;u=parseInt(a.dataset.page,10),v(),(r=document.getElementById("community"))==null||r.scrollIntoView({behavior:"smooth",block:"start"})})}),(s=document.getElementById("btn-page-first"))==null||s.addEventListener("click",()=>{var a;u>1&&(u=1,v(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))}),(t=document.getElementById("btn-page-prev"))==null||t.addEventListener("click",()=>{var a;u>1&&(u--,v(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))}),(i=document.getElementById("btn-page-next"))==null||i.addEventListener("click",()=>{var a;u<n&&(u++,v(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))}),(c=document.getElementById("btn-page-last"))==null||c.addEventListener("click",()=>{var a;u<n&&(u=n,v(),(a=document.getElementById("community"))==null||a.scrollIntoView({behavior:"smooth",block:"start"}))})}function N(n){f=n,Ee(n);const o=C().find(c=>c.id===n);if(!o)return;const e=document.getElementById("comm-detail-modal");if(!e)return;document.getElementById("comm-detail-cat-badge").textContent=o.category,document.getElementById("comm-detail-date").textContent=o.date,document.getElementById("comm-detail-title").textContent=o.title,document.getElementById("comm-detail-avatar").textContent=re(o.author),document.getElementById("comm-detail-author").textContent=o.author,document.getElementById("comm-detail-country").textContent=o.country,document.getElementById("comm-detail-views").textContent=o.views||0,document.getElementById("comm-detail-likes-top").textContent=o.likes||0,document.getElementById("comm-detail-comments-top").textContent=(o.replies||[]).length,document.getElementById("comm-detail-content").textContent=o.content;const s=document.getElementById("comm-detail-tags");s&&(o.tags&&o.tags.length>0?(s.innerHTML=o.tags.map(c=>`<span class="comm-tag-chip">${p(c)}</span>`).join(""),s.style.display="flex"):(s.innerHTML="",s.style.display="none"));const t=ae(n),i=document.getElementById("btn-detail-like");document.getElementById("comm-detail-likes-count").textContent=o.likes||0,i&&(t?i.classList.add("active"):i.classList.remove("active")),_(o),e.classList.add("open")}function _(n){const o=document.getElementById("comm-detail-comments-list"),e=document.getElementById("comm-detail-replies-count");if(!o)return;const s=n.replies||[];if(e&&(e.textContent=s.length),s.length===0){o.innerHTML=`
      <div style="text-align: center; padding: 24px; color: var(--color-text-muted); font-size: 0.88rem; background: var(--color-bg-alt); border-radius: var(--radius-sm);">
        No replies yet. Be the first to share your thoughts!
      </div>
    `;return}o.innerHTML=s.map(t=>`
    <div class="comm-comment-item" id="comm-reply-${t.id}">
      <div class="comm-comment-header">
        <div class="comm-comment-author-info">
          <span style="font-size: 1rem;">💬</span>
          <span>${p(t.author)}</span>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: normal;">${p(t.country||"")}</span>
        </div>
        <div style="color: var(--color-text-muted); font-size: 0.78rem;">
          ${t.date}
        </div>
      </div>
      <div class="comm-comment-content">${p(t.content)}</div>
      <div class="comm-comment-footer">
        <button type="button" class="comm-comment-btn btn-like-comment" data-comment-id="${t.id}">
          <span>❤️</span>
          <span class="comment-like-count">${t.likes||0}</span>
        </button>
        <button type="button" class="comm-comment-btn delete btn-delete-comment" data-comment-id="${t.id}">
          <span>🗑️ Delete</span>
        </button>
      </div>
    </div>
  `).join(""),o.querySelectorAll(".btn-like-comment").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.commentId,c=Ie(n.id,i);t.querySelector(".comment-like-count").textContent=c.likes})}),o.querySelectorAll(".btn-delete-comment").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.commentId;Q({type:"delete-comment",postId:n.id,commentId:i})})})}function re(n){if(!n)return"K";const o=n.trim().split(" ");return o.length>=2?`${o[0][0]}${o[1][0]}`.toUpperCase():n.slice(0,2).toUpperCase()}function p(n){return n?String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}function De(){const n=document.getElementById("routine-skin-select"),o=document.getElementById("routine-goal-select"),e=document.getElementById("routine-results-container"),s=document.getElementById("routine-steps-grid");if(!n||!o||!e||!s)return;n.value;const t=o.value,i=A(),c=ie();let a=c.find(d=>d.id==="anua-heartleaf-toner"),r=c.find(d=>d.id==="torriden-dive-in-serum"),E=c.find(d=>d.id==="round-lab-birch-sunscreen");t==="glow"?(r=c.find(d=>d.id==="cosrx-snail-mucin-essence")||r,E=c.find(d=>d.id==="beauty-of-joseon-sunscreen")||E):t==="calm"&&(a=c.find(d=>d.id==="mediheal-madecassoside-pad")||a);const I=[{title:"Step 1: Low-pH Toner & Prep",product:a,note:"Balances skin mantle and opens cellular hydration channels."},{title:"Step 2: Active Repair Ampoule",product:r,note:"Infuses multi-depth moisture and reinforces damaged barrier lipids."},{title:"Step 3: Lightweight Daily Sun Shield",product:E,note:"Broad-spectrum SPF 50+ essential to prevent hyperpigmentation."}];s.innerHTML=I.map((d,x)=>{const y=d.product,k=y.name[i]||y.name.en;return`
      <div class="step-box">
        <span class="step-number">${d.title}</span>
        <div style="font-size: 0.82rem; color: var(--color-text-secondary); line-height: 1.4;">${d.note}</div>
        <img src="${y.image}" alt="${k}" style="height: 130px; object-fit: contain; margin: 10px 0; border-radius: var(--radius-sm);" />
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-olive-young);">${y.brand}</div>
        <div style="font-size: 0.9rem; font-weight: 600; line-height: 1.35;">${k}</div>
        <div style="font-size: 0.8rem; color: var(--color-olive-young); font-weight: 500; margin-top: auto;">✓ Olive Young Global Stock</div>
        <a href="${y.oliveYoungUrl}" class="btn-primary" data-product-id="${y.id}" data-url="${y.oliveYoungUrl}" style="padding: 8px 12px; font-size: 0.8rem; margin-top: 10px; border-radius: var(--radius-sm); justify-content: center; text-decoration: none;">
          ${l("viewOnOliveYoung")}
        </a>
      </div>
    `}).join(""),s.querySelectorAll(".btn-primary").forEach(d=>{d.addEventListener("click",x=>{he(x,d.dataset.productId,d.dataset.url,"routine_diagnostic")})}),e.classList.add("visible"),e.scrollIntoView({behavior:"smooth",block:"nearest"})}function me(){const n=A(),o={en:"Curated K-Beauty intelligence, glass skin routines, and Olive Young Global shopping guides with exclusive promo code discounts.",zh:"首尔正统韩系护肤专栏、水光肌公式与 Olive Young Global 全球直邮省钱指南，独家专享海淘优惠码。",ja:"ソウル発の最新韓国スキンケアトレンド、水光肌ルーティン、オリーブヤンググローバル公式通販の購入ガイド。"};$e({title:`${l("brandName")} | ${l("brandTagline")}`,description:o[n]||o.en,products:ie()})}function Ne(n){return{awards:l("filterAwards"),"glass-skin":l("filterGlassSkin"),"sun-care":l("filterSunCare"),trouble:l("filterTrouble")}[n]||n}document.addEventListener("DOMContentLoaded",()=>{Le()});
