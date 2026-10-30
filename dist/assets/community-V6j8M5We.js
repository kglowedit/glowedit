import{z as ot,A as Z,D as st,B as it,C as ct,E as r,u as at,s as x,m as dt,I as _,o as mt,i as $,l as lt,w as rt,c as ut,J as F,K as pt,L as yt}from"./affiliate-B461V4p0.js";/* empty css             */let z="all",tt="",et="latest",U="cards",m=1;const j=6;let y=null,P=null;document.addEventListener("DOMContentLoaded",()=>{gt()});function gt(){var o;ot(),vt(),ft(),ht(),l();const n=new URLSearchParams(window.location.search),e=n.get("postId"),t=n.get("write");if(e)setTimeout(()=>{L(e)},200);else if(t){const i=document.getElementById("community-new-post-box");i&&(i.classList.add("open"),(o=document.getElementById("comm-post-title"))==null||o.focus())}const s=window.location.hash;if(s&&s.startsWith("#post-")){const i=s.replace("#post-","");setTimeout(()=>{L(i)},200)}}function vt(){Z();const n=document.getElementById("promo-code-btn");n==null||n.addEventListener("click",()=>{st(n)})}function ft(){const n=document.getElementById("lang-select");n&&(n.value=it(),n.addEventListener("change",e=>{ct(e.target.value),Et(),Z(),l(),y&&L(y)}))}function Et(){document.querySelectorAll("[data-i18n]").forEach(n=>{const e=n.dataset.i18n;e&&(n.textContent=r(e))}),document.querySelectorAll("[data-i18n-placeholder]").forEach(n=>{const e=n.dataset.i18nPlaceholder;e&&n.setAttribute("placeholder",r(e))})}function ht(){const n=document.getElementById("btn-open-new-post"),e=document.getElementById("btn-cancel-post"),t=document.getElementById("btn-close-post-box"),s=document.getElementById("community-new-post-box"),o=document.getElementById("community-post-form"),i=document.getElementById("comm-form-heading"),u=document.getElementById("btn-submit-comm-post"),c=document.getElementById("comm-edit-post-id");n&&s&&n.addEventListener("click",()=>{var a;c&&(c.value=""),o==null||o.reset(),i&&(i.textContent=r("postModalTitle")||"Start a Discussion in the Community"),u&&(u.textContent=r("submitPostBtn")||"Publish Post"),s.classList.toggle("open"),s.classList.contains("open")&&((a=document.getElementById("comm-post-title"))==null||a.focus(),s.scrollIntoView({behavior:"smooth",block:"start"}))});const d=()=>{s==null||s.classList.remove("open"),c&&(c.value=""),o==null||o.reset()};e==null||e.addEventListener("click",d),t==null||t.addEventListener("click",d),o&&o.addEventListener("submit",a=>{a.preventDefault();const p=c&&c.value.trim(),v=document.getElementById("comm-post-title").value.trim(),S=document.getElementById("comm-post-category").value,w=document.getElementById("comm-post-content").value.trim(),I=document.getElementById("comm-post-author").value.trim();let f=document.getElementById("comm-post-country").value.trim()||"Global";const Q=document.getElementById("comm-post-password").value.trim(),G=document.getElementById("comm-post-tags").value.trim();if(!v||!w||!I)return;!f.startsWith("🇺🇸")&&!f.startsWith("🇯🇵")&&!f.startsWith("🇰🇷")&&!f.startsWith("🇬🇧")&&!f.startsWith("🇨🇦")&&(f=`🌍 ${f}`);const Y=G?G.split(/[,#\s]+/).filter(Boolean).map(R=>R.startsWith("#")?R:`#${R}`):[];p?(at(p,{title:v,category:S,content:w,author:I,country:f,tags:Y,password:Q||void 0}),x({title:"Discussion Updated",message:r("postEditSuccess")||"Your discussion has been updated."}),y===p&&L(p)):(dt({title:v,category:S,content:w,author:I,country:f,password:Q||"1234",tags:Y,status:"published"}),x({title:"Discussion Published",message:r("postSuccessToast")||"Your discussion post has been published!"}),m=1),d(),l()}),document.querySelectorAll(".comm-filter-pill").forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".comm-filter-pill").forEach(p=>p.classList.remove("active")),a.classList.add("active"),z=a.dataset.commCategory||"all",m=1,l()})});const C=document.getElementById("comm-search-input");if(C){let a;C.addEventListener("input",p=>{clearTimeout(a),a=setTimeout(()=>{tt=p.target.value.trim(),m=1,l()},250)})}const B=document.getElementById("comm-sort-select");B&&B.addEventListener("change",a=>{et=a.target.value,m=1,l()});const E=document.getElementById("btn-view-cards"),k=document.getElementById("btn-view-table");E&&k&&(E.addEventListener("click",()=>{U="cards",E.classList.add("active"),k.classList.remove("active"),l()}),k.addEventListener("click",()=>{U="table",k.classList.add("active"),E.classList.remove("active"),l()}));const h=document.getElementById("comm-detail-modal"),A=document.getElementById("btn-close-detail-modal");A==null||A.addEventListener("click",()=>{h==null||h.classList.remove("open")}),h==null||h.addEventListener("click",a=>{a.target===h&&h.classList.remove("open")});const H=document.getElementById("btn-detail-like");H==null||H.addEventListener("click",()=>{if(!y)return;const a=_(y);document.getElementById("comm-detail-likes-count").textContent=a.likes,document.getElementById("comm-detail-likes-top").textContent=a.likes;const p=document.getElementById("comm-detail-heart-icon");p&&(p.style.transform="scale(1.3)"),setTimeout(()=>{p&&(p.style.transform="scale(1)")},200),l()});const q=document.getElementById("btn-detail-share");q==null||q.addEventListener("click",()=>{if(!y)return;const a=`${window.location.origin}/community.html?postId=${y}`;navigator.clipboard?navigator.clipboard.writeText(a).then(()=>{x({title:"Link Copied",message:r("linkCopiedToast")||"Link copied to clipboard!"})}):x({title:"Link Copied",message:a})});const D=document.getElementById("btn-detail-edit");D==null||D.addEventListener("click",()=>{y&&O({type:"edit-post",postId:y})});const M=document.getElementById("btn-detail-delete");M==null||M.addEventListener("click",()=>{y&&O({type:"delete-post",postId:y})});const T=document.getElementById("comm-reply-form");T==null||T.addEventListener("submit",a=>{if(a.preventDefault(),!y)return;const p=document.getElementById("comm-reply-author").value.trim();let v=document.getElementById("comm-reply-country").value.trim()||"Global";const S=document.getElementById("comm-reply-password").value.trim(),w=document.getElementById("comm-reply-content").value.trim();if(!p||!w)return;!v.startsWith("🇺🇸")&&!v.startsWith("🇯🇵")&&!v.startsWith("🇰🇷")&&!v.startsWith("🇬🇧")&&!v.startsWith("🇨🇦")&&(v=`🌍 ${v}`),mt(y,{author:p,country:v,password:S||"1234",content:w}),T.reset(),x({title:"Reply Posted",message:r("replySuccessToast")||"Reply posted successfully!"});const I=$().find(f=>f.id===y);I&&(K(I),document.getElementById("comm-detail-comments-top").textContent=(I.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=(I.replies||[]).length),l()});const b=document.getElementById("comm-pass-modal"),V=document.getElementById("btn-cancel-pass-modal"),W=document.getElementById("btn-confirm-pass-modal"),N=document.getElementById("comm-input-verify-password");V==null||V.addEventListener("click",()=>{b==null||b.classList.remove("open"),P=null}),b==null||b.addEventListener("click",a=>{a.target===b&&(b.classList.remove("open"),P=null)}),W==null||W.addEventListener("click",J),N==null||N.addEventListener("keydown",a=>{a.key==="Enter"&&J()})}function O(n){P=n;const e=document.getElementById("comm-pass-modal"),t=document.getElementById("comm-input-verify-password"),s=document.getElementById("comm-pass-error"),o=document.getElementById("comm-pass-title"),i=document.getElementById("comm-pass-desc");!e||!t||(t.value="",s&&(s.style.display="none",s.textContent=""),n.type==="edit-post"?(o&&(o.textContent=r("passwordPromptTitle")||"Enter Post Passcode"),i&&(i.textContent="Please enter your 4-digit passcode to edit this discussion.")):n.type==="delete-post"?(o&&(o.textContent=r("deletePostBtn")||"Delete Post"),i&&(i.textContent="Please enter your passcode to permanently delete this discussion.")):n.type==="delete-comment"&&(o&&(o.textContent="Delete Reply"),i&&(i.textContent="Please enter the passcode you set when leaving this reply.")),e.classList.add("open"),t.focus())}function J(){var d,C;if(!P)return;const n=document.getElementById("comm-input-verify-password"),e=document.getElementById("comm-pass-error"),t=document.getElementById("comm-pass-modal"),s=n?n.value.trim():"";if(!s){e&&(e.textContent="Please enter passcode.",e.style.display="block");return}const{type:o,postId:i,commentId:u}=P,c=$().find(B=>B.id===i);if(o==="edit-post"||o==="delete-post"){if(!c){t==null||t.classList.remove("open");return}if(c.password&&c.password!==s){e&&(e.textContent=r("passwordIncorrect")||"Incorrect passcode. Please try again.",e.style.display="block");return}t==null||t.classList.remove("open"),o==="delete-post"?(lt(i),(d=document.getElementById("comm-detail-modal"))==null||d.classList.remove("open"),x({title:"Deleted",message:r("postDeleteSuccess")||"Post deleted successfully."}),l()):o==="edit-post"&&((C=document.getElementById("comm-detail-modal"))==null||C.classList.remove("open"),bt(c))}else if(o==="delete-comment"){const B=rt(i,u,s);if(!B.success){e&&(e.textContent=B.message||"Incorrect passcode.",e.style.display="block");return}t==null||t.classList.remove("open"),x({title:"Deleted",message:r("commentDeleteSuccess")||"Reply deleted successfully."});const E=$().find(k=>k.id===i);E&&(K(E),document.getElementById("comm-detail-comments-top").textContent=(E.replies||[]).length,document.getElementById("comm-detail-replies-count").textContent=(E.replies||[]).length),l()}}function bt(n){const e=document.getElementById("community-new-post-box"),t=document.getElementById("comm-form-heading"),s=document.getElementById("btn-submit-comm-post"),o=document.getElementById("comm-edit-post-id");e&&(o&&(o.value=n.id),document.getElementById("comm-post-title").value=n.title||"",document.getElementById("comm-post-category").value=n.category||"Routine Advice",document.getElementById("comm-post-content").value=n.content||"",document.getElementById("comm-post-author").value=n.author||"",document.getElementById("comm-post-country").value=n.country||"",document.getElementById("comm-post-password").value=n.password||"",document.getElementById("comm-post-tags").value=(n.tags||[]).join(", "),t&&(t.textContent=r("editPostBtn")||"Edit Discussion"),s&&(s.textContent="Update Post"),e.classList.add("open"),e.scrollIntoView({behavior:"smooth",block:"start"}))}function l(){const n=document.getElementById("comm-posts-view-container"),e=document.getElementById("comm-pinned-notices");if(!n)return;const t=$().filter(c=>c.status!=="hidden");if(e){const c=t.filter(d=>d.isPinned||d.category==="Notice");c.length>0&&(z==="all"||z==="Notice")?(e.style.display="flex",e.innerHTML=c.map(d=>`
        <div class="comm-pinned-card" data-post-id="${d.id}">
          <div class="comm-pinned-title">
            <span class="comm-notice-badge">📌 ${r("pinnedNoticeBadge")||"NOTICE"}</span>
            <span>${g(d.title)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 14px; font-size: 0.8rem; color: var(--color-text-muted); white-space: nowrap;">
            <span>👁️ ${d.views||0}</span>
            <span>💬 ${(d.replies||[]).length}</span>
            <span>${d.date}</span>
          </div>
        </div>
      `).join(""),e.querySelectorAll(".comm-pinned-card").forEach(d=>{d.addEventListener("click",()=>{L(d.dataset.postId)})})):(e.style.display="none",e.innerHTML="")}const s=ut({includeHidden:!1,category:z,searchQuery:tt,sortBy:et});if(s.length===0){n.innerHTML=`
      <div style="text-align: center; padding: 48px 24px; color: var(--color-text-muted); background: var(--color-surface); border-radius: var(--radius-md); border: 1px solid var(--color-card-border);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🌸</div>
        <p style="font-size: 1.05rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 6px;">${r("noPostsFound")||"No discussions found matching your filter."}</p>
        <p style="font-size: 0.88rem; margin-bottom: 16px;">Be the first to share your K-Beauty holy grail discoveries or ask for routine advice!</p>
        <button class="btn-primary" onclick="document.getElementById('btn-open-new-post').click();" style="padding: 9px 20px; font-size: 0.88rem;">${r("askQuestionBtn")||"+ Start a Discussion"}</button>
      </div>
    `,X(0);return}const o=Math.ceil(s.length/j)||1;m=Math.min(Math.max(1,m),o);const i=(m-1)*j,u=s.slice(i,i+j);U==="table"?Bt(u,n):It(u,n),X(o)}function It(n,e){e.innerHTML=`
    <div class="community-posts-list">
      ${n.map(t=>{const s=(t.replies||[]).length,o=F(t.id);return`
          <div class="community-card" id="comm-card-${t.id}" data-post-id="${t.id}">
            <div class="community-card-header">
              <div class="community-author-row">
                <span class="community-avatar">${nt(t.author)}</span>
                <div>
                  <div class="community-author-name">
                    ${g(t.author)}
                    <span class="community-author-country">${g(t.country)}</span>
                  </div>
                  <div class="community-post-date">${t.date}</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                ${t.isPinned?'<span class="comm-notice-badge">📌 NOTICE</span>':""}
                <span class="community-cat-badge">${g(t.category)}</span>
              </div>
            </div>

            <h3 class="community-post-title">${g(t.title)}</h3>
            <p class="community-post-content">${g(t.content)}</p>

            ${t.tags&&t.tags.length>0?`
              <div class="community-tags-row">
                ${t.tags.map(i=>`<span class="comm-tag-chip">${g(i)}</span>`).join("")}
              </div>
            `:""}

            <div class="community-actions-bar">
              <div class="comm-actions-left">
                <button class="community-action-btn btn-card-like ${o?"active":""}" data-post-id="${t.id}">
                  <span>❤️</span>
                  <span class="like-count">${t.likes||0}</span>
                </button>
                <div style="color: var(--color-text-muted); display: inline-flex; align-items: center; gap: 5px;">
                  <span>💬</span>
                  <span>${s}</span>
                </div>
                <div style="color: var(--color-text-muted); display: inline-flex; align-items: center; gap: 5px;">
                  <span>👁️</span>
                  <span>${t.views||0}</span>
                </div>
              </div>
              <button class="btn-secondary btn-card-read-more" data-post-id="${t.id}" style="padding: 6px 14px; font-size: 0.82rem;">
                <span>View & Reply ↗</span>
              </button>
            </div>
          </div>
        `}).join("")}
    </div>
  `,e.querySelectorAll(".community-card").forEach(t=>{t.addEventListener("click",s=>{s.target.closest(".btn-card-like")||L(t.dataset.postId)})}),e.querySelectorAll(".btn-card-like").forEach(t=>{t.addEventListener("click",s=>{s.stopPropagation();const o=t.dataset.postId,i=_(o);t.querySelector(".like-count").textContent=i.likes,i.isLiked?t.classList.add("active"):t.classList.remove("active")})})}function Bt(n,e){e.innerHTML=`
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
          ${n.map(t=>{const s=(t.replies||[]).length;return`
              <tr class="comm-table-row" data-post-id="${t.id}">
                <td style="text-align: center; color: var(--color-text-muted); font-size: 0.8rem;">
                  ${t.isPinned?"📌":t.postNo||"#"}
                </td>
                <td>
                  <span class="community-cat-badge" style="font-size: 0.72rem; padding: 2px 7px;">
                    ${g(t.category)}
                  </span>
                </td>
                <td>
                  <div class="comm-table-title">
                    <span>${g(t.title)}</span>
                    ${s>0?`<span class="comm-reply-count-badge">[${s}]</span>`:""}
                  </div>
                </td>
                <td>
                  <div style="font-weight: 500; color: var(--color-text-main); font-size: 0.84rem;">
                    ${g(t.author)}
                  </div>
                  <div style="font-size: 0.72rem; color: var(--color-text-muted);">
                    ${g(t.country)}
                  </div>
                </td>
                <td style="font-size: 0.8rem; color: var(--color-text-muted);">
                  ${t.date}
                </td>
                <td style="text-align: center; font-size: 0.82rem; color: var(--color-text-muted);">
                  ${t.views||0}
                </td>
                <td style="text-align: center; font-size: 0.82rem; color: var(--color-primary); font-weight: 600;">
                  ${t.likes||0}
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
    </div>
  `,e.querySelectorAll(".comm-table-row").forEach(t=>{t.addEventListener("click",()=>{L(t.dataset.postId)})})}function X(n){var s,o,i,u;const e=document.getElementById("comm-pagination-bar");if(!e)return;if(n<=1){e.innerHTML="";return}let t=`
    <button class="comm-page-btn" id="btn-page-first" ${m===1?"disabled":""} title="First Page">«</button>
    <button class="comm-page-btn" id="btn-page-prev" ${m===1?"disabled":""} title="Previous Page">‹</button>
  `;for(let c=1;c<=n;c++)t+=`
      <button class="comm-page-btn ${c===m?"active":""}" data-page="${c}">
        ${c}
      </button>
    `;t+=`
    <button class="comm-page-btn" id="btn-page-next" ${m===n?"disabled":""} title="Next Page">›</button>
    <button class="comm-page-btn" id="btn-page-last" ${m===n?"disabled":""} title="Last Page">»</button>
  `,e.innerHTML=t,e.querySelectorAll(".comm-page-btn[data-page]").forEach(c=>{c.addEventListener("click",()=>{var d;m=parseInt(c.dataset.page,10),l(),(d=document.getElementById("community-board-root"))==null||d.scrollIntoView({behavior:"smooth",block:"start"})})}),(s=document.getElementById("btn-page-first"))==null||s.addEventListener("click",()=>{var c;m>1&&(m=1,l(),(c=document.getElementById("community-board-root"))==null||c.scrollIntoView({behavior:"smooth",block:"start"}))}),(o=document.getElementById("btn-page-prev"))==null||o.addEventListener("click",()=>{var c;m>1&&(m--,l(),(c=document.getElementById("community-board-root"))==null||c.scrollIntoView({behavior:"smooth",block:"start"}))}),(i=document.getElementById("btn-page-next"))==null||i.addEventListener("click",()=>{var c;m<n&&(m++,l(),(c=document.getElementById("community-board-root"))==null||c.scrollIntoView({behavior:"smooth",block:"start"}))}),(u=document.getElementById("btn-page-last"))==null||u.addEventListener("click",()=>{var c;m<n&&(m=n,l(),(c=document.getElementById("community-board-root"))==null||c.scrollIntoView({behavior:"smooth",block:"start"}))})}function L(n){y=n,pt(n);const e=$().find(u=>u.id===n);if(!e)return;const t=document.getElementById("comm-detail-modal");if(!t)return;document.getElementById("comm-detail-cat-badge").textContent=e.category,document.getElementById("comm-detail-date").textContent=e.date,document.getElementById("comm-detail-title").textContent=e.title,document.getElementById("comm-detail-avatar").textContent=nt(e.author),document.getElementById("comm-detail-author").textContent=e.author,document.getElementById("comm-detail-country").textContent=e.country,document.getElementById("comm-detail-views").textContent=e.views||0,document.getElementById("comm-detail-likes-top").textContent=e.likes||0,document.getElementById("comm-detail-comments-top").textContent=(e.replies||[]).length,document.getElementById("comm-detail-content").textContent=e.content;const s=document.getElementById("comm-detail-tags");s&&(e.tags&&e.tags.length>0?(s.innerHTML=e.tags.map(u=>`<span class="comm-tag-chip">${g(u)}</span>`).join(""),s.style.display="flex"):(s.innerHTML="",s.style.display="none"));const o=F(n),i=document.getElementById("btn-detail-like");document.getElementById("comm-detail-likes-count").textContent=e.likes||0,i&&(o?i.classList.add("active"):i.classList.remove("active")),K(e),t.classList.add("open")}function K(n){const e=document.getElementById("comm-detail-comments-list"),t=document.getElementById("comm-detail-replies-count");if(!e)return;const s=n.replies||[];if(t&&(t.textContent=s.length),s.length===0){e.innerHTML=`
      <div style="text-align: center; padding: 24px; color: var(--color-text-muted); font-size: 0.88rem; background: var(--color-bg-alt); border-radius: var(--radius-sm);">
        No replies yet. Be the first to share your thoughts!
      </div>
    `;return}e.innerHTML=s.map(o=>`
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
  `).join(""),e.querySelectorAll(".btn-like-comment").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.commentId,u=yt(n.id,i);o.querySelector(".comment-like-count").textContent=u.likes})}),e.querySelectorAll(".btn-delete-comment").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.commentId;O({type:"delete-comment",postId:n.id,commentId:i})})})}function nt(n){if(!n)return"K";const e=n.trim().split(" ");return e.length>=2?`${e[0][0]}${e[1][0]}`.toUpperCase():n.slice(0,2).toUpperCase()}function g(n){return n?String(n).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}
