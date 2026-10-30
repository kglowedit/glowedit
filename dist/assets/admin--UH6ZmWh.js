import{g as ae,a as X,b as xe,c as De,d as Ce,t as je,s as I,e as Pe,f as Me,h as Oe,i as ve,j as Re,k as qe,l as Ne,u as He,m as _e,n as Ue,o as Je,p as We,q as Ye,r as Ve,v as Ke,w as Ze,x as Qe,y as Xe,z as et}from"./affiliate-DTiuOQeh.js";import{g as tt}from"./seo-pkP-Edg8.js";const de="kbeauty_gemini_api_key",se="kbeauty_gemini_active_model",he="kbeauty_gemini_api_version",we="kbeauty_translation_engine",Le="kbeauty_auto_fallback";function ee(){const e=localStorage.getItem(we);return e==="google"||e==="gemini"?e:Ae()?"gemini":"google"}function $e(e){(e==="google"||e==="gemini")&&localStorage.setItem(we,e)}function Ee(){return localStorage.getItem(Le)!=="false"}function nt(e){localStorage.setItem(Le,String(!!e))}function J(){return(localStorage.getItem(de)||"").trim()}function ot(e){!e||!e.trim()?(localStorage.removeItem(de),localStorage.removeItem(se),localStorage.removeItem(he)):localStorage.setItem(de,e.trim())}function Ae(){return!!J()}function U(){return localStorage.getItem(se)||"gemini-3.8-flash"}function Se(e){if(!e)return null;const t=e.match(/update your code to use (?:models\/)?([a-zA-Z0-9.-]+)/i);return t?t[1]:null}function it(e){return[...e].sort((t,a)=>{const n=i=>{const c=i.match(/gemini-(\d+(?:\.\d+)?)/i);return c?parseFloat(c[1]):0},s=t.toLowerCase().includes("flash")?100:0;return(a.toLowerCase().includes("flash")?100:0)+n(a)-(s+n(t))})}async function Fe(e){var s;const t=(e||J()).trim();if(!t)throw new Error("API 키를 입력해주세요.");const a=["v1beta","v1"];let n=null;for(const o of a)try{const i=`https://generativelanguage.googleapis.com/${o}/models?key=${t}`,c=await fetch(i),d=await c.json();if(!c.ok){n=((s=d.error)==null?void 0:s.message)||`Google API 오류 (${c.status})`;continue}if(Array.isArray(d.models)){const l=d.models.filter(m=>Array.isArray(m.supportedGenerationMethods)&&m.supportedGenerationMethods.includes("generateContent")).map(m=>m.name.replace(/^models\//,""));if(l.length>0)return{models:it(l),apiVersion:o}}}catch(i){n=i.message}throw new Error(n||"API 키로 사용 가능한 Gemini 모델을 찾을 수 없습니다.")}async function at(e){var a,n;const t=(e||J()).trim();if(!t)return{success:!1,error:"API 키를 입력해주세요."};try{const{models:s,apiVersion:o}=await Fe(t);let i=s[0]||"gemini-3.8-flash",c=`https://generativelanguage.googleapis.com/${o}/models/${i}:generateContent?key=${t}`,d=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:"Hello! Reply with 'OK'."}]}]})}),l=await d.json();if(!d.ok){const m=Se((a=l.error)==null?void 0:a.message);m&&(i=m,c=`https://generativelanguage.googleapis.com/${o}/models/${i}:generateContent?key=${t}`,d=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:"Hello! Reply with 'OK'."}]}]})}),l=await d.json())}return d.ok?(localStorage.setItem(se,i),localStorage.setItem(he,o),{success:!0,message:`Google Gemini 연결 성공! (최신 AI 모델: ${i}, API: ${o})`,model:i}):{success:!1,error:((n=l.error)==null?void 0:n.message)||`테스트 호출 실패 (${d.status})`}}catch(s){return{success:!1,error:s.message||"연결 확인 실패"}}}async function st({titleKo:e,excerptKo:t,contentKo:a,apiKey:n}){var p,r,f,y,h,b,B,k,x,w,L,F,j,C,S,O,P;const s=(n||J()).trim();if(!s)throw new Error("Gemini API 키가 설정되지 않았습니다.");let o=U(),i=localStorage.getItem(he)||"v1beta";try{const M=await Fe(s);M.models.length>0&&(o=M.models[0]),i=M.apiVersion}catch{console.warn("Could not refresh models list, using cached model:",o)}const c=`
You are an expert bilingual/multilingual K-Beauty skincare editor and translator for the global digital publication "The K-Glow Edit".
Translate the following Korean article into:
1) English (en)
2) Chinese Simplified (zh)
3) Japanese (ja)

Source Content (Korean):
- Title: ${e}
- Excerpt: ${t||e}
- Markdown Content:
${a||e}

Requirements:
1. Editorial Quality: Write in an elegant, engaging, and professional tone suitable for global skincare connoisseurs.
2. Terminology: Use authentic dermatological and K-Beauty terms (e.g., Glass Skin for 물광/유리알 피부, Olive Young Awards for 올리브영 어워즈, Birch Juice for 자작나무 수액, Heartleaf for 어성초, Centella / Cica for 병풀/시카, Inner Dryness for 속건조).
3. Markdown Preservation: Retain all Markdown elements (headers ### or ##, bold **, bullet points •, spacing) exactly.
4. Slug: Generate a clean, SEO-optimized URL slug in lowercase English with hyphens only (max 65 chars, no special characters).

Return strictly valid JSON with this exact schema:
{
  "en": {
    "title": "string",
    "excerpt": "string",
    "content": "string"
  },
  "zh": {
    "title": "string",
    "excerpt": "string",
    "content": "string"
  },
  "ja": {
    "title": "string",
    "excerpt": "string",
    "content": "string"
  },
  "slug": "string"
}
`;let d=`https://generativelanguage.googleapis.com/${i}/models/${o}:generateContent?key=${s}`,l=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:c}]}],generationConfig:{temperature:.2,responseMimeType:"application/json"}})}),m=await l.json();if(!l.ok){const M=Se((p=m.error)==null?void 0:p.message);M&&(o=M,d=`https://generativelanguage.googleapis.com/${i}/models/${o}:generateContent?key=${s}`,l=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:c}]}],generationConfig:{temperature:.2,responseMimeType:"application/json"}})}),m=await l.json())}if(!l.ok)throw new Error(((r=m.error)==null?void 0:r.message)||`Gemini API Error (${l.status})`);const g=(B=(b=(h=(y=(f=m.candidates)==null?void 0:f[0])==null?void 0:y.content)==null?void 0:h.parts)==null?void 0:b[0])==null?void 0:B.text;if(!g)throw new Error("Gemini 응답에서 번역 텍스트를 파싱할 수 없습니다.");const u=lt(g);return localStorage.setItem(se,o),{en:{title:((k=u.en)==null?void 0:k.title)||e,excerpt:((x=u.en)==null?void 0:x.excerpt)||t||e,content:((w=u.en)==null?void 0:w.content)||a||e},zh:{title:((L=u.zh)==null?void 0:L.title)||e,excerpt:((F=u.zh)==null?void 0:F.excerpt)||t||e,content:((j=u.zh)==null?void 0:j.content)||a||e},ja:{title:((C=u.ja)==null?void 0:C.title)||e,excerpt:((S=u.ja)==null?void 0:S.excerpt)||t||e,content:((O=u.ja)==null?void 0:O.content)||a||e},slug:u.slug||ie(((P=u.en)==null?void 0:P.title)||e),engine:`Google Gemini (${o})`}}function lt(e){try{return JSON.parse(e)}catch(t){const a=e.match(/\{[\s\S]*\}/);if(a)return JSON.parse(a[0]);throw t}}const rt=[{ko:/물광\s*피부|유리알\s*피부/gi,en:"Glass Skin",zh:"水光肌",ja:"水光肌"},{ko:/올리브영\s*어워즈/gi,en:"Olive Young Awards",zh:"Olive Young 年度大赏",ja:"オリーブヤングアワード"},{ko:/올리브영/gi,en:"Olive Young",zh:"Olive Young",ja:"オリーブヤング"},{ko:/선크림|자외선\s*차단제/gi,en:"Sunscreen",zh:"防晒霜",ja:"日焼け止め"},{ko:/토너\s*패드/gi,en:"Toner Pad",zh:"爽肤棉片",ja:"トナーパッド"},{ko:/속건조/gi,en:"Inner Dryness",zh:"深层缺水",ja:"인나ード라이"},{ko:/진정\s*앰플/gi,en:"Calming Ampoule",zh:"舒缓镇静安瓶",ja:"鎮静アンプル"},{ko:/피부\s*장벽/gi,en:"Skin Barrier",zh:"皮肤屏障",ja:"肌バリア機能"},{ko:/자작나무\s*수액/gi,en:"Birch Juice",zh:"白桦树汁",ja:"白樺樹液"},{ko:/어성초/gi,en:"Heartleaf",zh:"鱼腥草",ja:"ドクダミ"},{ko:/시카|병풀/gi,en:"Centella (Cica)",zh:"积雪草",ja:"CICA・ツボクサ"}];async function R(e,t){if(!e||!e.trim())return"";const n={en:"en",zh:"zh-CN",ja:"ja"}[t]||t,s=e.split(`

`),o=[];for(const i of s){if(!i.trim()){o.push("");continue}try{const c=`https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=ko&tl=${n}&q=${encodeURIComponent(i)}`,d=await fetch(c);if(d.ok){const l=await d.json();let m=Array.isArray(l)?l.join(""):String(l);o.push(m)}else{const l=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=${n}&dt=t&q=${encodeURIComponent(i)}`,m=await fetch(l);if(m.ok){const u=((await m.json())[0]||[]).map(p=>p[0]).join("");o.push(u)}else o.push(i)}}catch{let d=i;rt.forEach(l=>{d=d.replace(l.ko,l[t]||l.en)}),o.push(d)}}return o.join(`

`)}async function ze({titleKo:e,excerptKo:t,contentKo:a,engine:n}){if(!e||!e.trim())throw new Error("한국어 제목을 입력해주세요.");const s=n||ee(),o=Ee();let i=null;if(s==="gemini"){const h=J();if(h)try{return{...await st({titleKo:e,excerptKo:t,contentKo:a,apiKey:h}),isFallback:!1}}catch(b){if(console.warn("Gemini API call failed, evaluating auto-fallback:",b),!o)throw b;i=b.message||"연결 오류"}else{if(!o)throw new Error("Gemini API 키가 설정되지 않았습니다. [Gemini API 키 설정]에서 등록해주세요.");i="API 키 미설정"}}const[c,d,l,m,g,u,p,r,f]=await Promise.all([R(e,"en"),R(t,"en"),R(a,"en"),R(e,"zh"),R(t,"zh"),R(a,"zh"),R(e,"ja"),R(t,"ja"),R(a,"ja")]),y=ie(c||e);return{en:{title:c.trim(),excerpt:(d||c).trim(),content:(l||c).trim()},zh:{title:m.trim(),excerpt:(g||m).trim(),content:(u||m).trim()},ja:{title:p.trim(),excerpt:(r||p).trim(),content:(f||p).trim()},slug:y,engine:i?"기본 구글 번역 (Gemini 대체)":"기본 구글 번역 (Google Translate)",isFallback:!!i,fallbackReason:i}}function ie(e){return e?e.toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,65):`article-${Date.now()}`}let Y="all",E=null,z="ko",q="en",$=[],v={ko:{title:"",excerpt:"",content:""},en:{title:"",excerpt:"",content:""},zh:{title:"",excerpt:"",content:""},ja:{title:"",excerpt:"",content:""}};function ct(){mt(),dt(),T(),N(),te(),ne(),G(),It(),gt(),bt(),Bt(),ft(),yt(),ut(),xt()}function T(){const e=ae(),t=X(),a=xe(),n=De(),s=Ce(),o=e.filter(h=>(h.status||"published")==="published"),i=e.filter(h=>h.status==="draft"),c=document.getElementById("stat-articles-count"),d=document.getElementById("stat-published-count"),l=document.getElementById("stat-drafts-count"),m=document.getElementById("stat-categories-count"),g=document.getElementById("stat-tags-count"),u=document.getElementById("stat-community-count"),p=document.getElementById("stat-promo-status");if(c&&(c.textContent=e.length),d&&(d.textContent=o.length),l&&(l.textContent=i.length),m&&(m.textContent=t.length),g&&(g.textContent=a.length),u&&(u.textContent=n.length),p){const h=s.topBanner.enabled?"상단ON":"상단OFF",b=s.eventCoupon.enabled?"쿠폰ON":"쿠폰OFF";p.textContent=`${h} · ${b}`,p.style.color=s.topBanner.enabled||s.eventCoupon.enabled?"#F472B6":"#94A3B8"}const r=document.getElementById("count-filter-all"),f=document.getElementById("count-filter-published"),y=document.getElementById("count-filter-draft");r&&(r.textContent=e.length),f&&(f.textContent=o.length),y&&(y.textContent=i.length)}function dt(){document.querySelectorAll(".status-filter-btn").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".status-filter-btn").forEach(t=>t.classList.remove("active")),e.classList.add("active"),Y=e.dataset.statusFilter||"all",N()})})}function mt(){document.querySelectorAll(".admin-tab-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;document.querySelectorAll(".admin-tab-btn").forEach(n=>n.classList.remove("active")),document.querySelectorAll(".admin-panel").forEach(n=>n.classList.remove("active")),e.classList.add("active");const a=document.getElementById(`panel-${t}`);a&&a.classList.add("active"),T(),t==="articles"&&N(),t==="categories"&&te(),t==="tags"&&ne(),t==="community"&&G(),t==="promotions"&&le()})})}function ut(){const e=document.getElementById("btn-reset-demo");e&&e.addEventListener("click",()=>{confirm("기본 데모 데이터(글, 카테고리, 태그, 커뮤니티 게시글, 배너/쿠폰 설정)를 초기 상태로 복원하시겠습니까?")&&(Ke(),T(),N(),te(),ne(),G(),le(),I({title:"초기화 완료",message:"기본 데모 콘텐츠와 배너/쿠폰 설정이 복구되었습니다."}))})}function N(){const e=document.getElementById("articles-table-body");if(!e)return;const t=ae(),a=X();let n=t;if(Y==="published"?n=t.filter(s=>(s.status||"published")==="published"):Y==="draft"&&(n=t.filter(s=>s.status==="draft")),n.length===0){const s=Y==="published"?"발행된 글이 없습니다.":Y==="draft"?"임시 저장된 글이 없습니다.":"등록된 글이 없습니다. [새 글 작성하기]를 눌러 첫 번째 에디토리얼을 작성해보세요.";e.innerHTML=`
      <tr>
        <td colspan="8" style="text-align: center; padding: 32px; color: #94A3B8;">
          ${s}
        </td>
      </tr>
    `;return}e.innerHTML=n.map(s=>{var u,p;const o=s.title.en||s.title.ko||"Untitled",i=a.find(r=>r.id===s.category),c=((u=i==null?void 0:i.name)==null?void 0:u.en)||s.category,d=`/article.html?slug=${encodeURIComponent(s.slug)}`,l=s.status==="draft",m=l?'<span class="badge-status-draft">🟡 임시 저장</span>':'<span class="badge-status-published">🟢 발행됨</span>',g=l?`<button class="btn-action-icon btn-toggle-status" data-id="${s.id}" data-target-status="published" title="사이트에 즉시 공개 발행" style="color: #10B981; border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.1); margin-right: 4px;">
           🚀 즉시 발행
         </button>`:`<button class="btn-action-icon btn-toggle-status" data-id="${s.id}" data-target-status="draft" title="발행 취소 및 임시 저장(비공개)으로 전환" style="color: #FBBF24; border-color: rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.1); margin-right: 4px;">
           🔒 비공개 전환
         </button>`;return`
      <tr style="${l?"background: rgba(245, 158, 11, 0.03);":""}">
        <td>
          <img src="${s.coverImage}" alt="${o}" style="width: 56px; height: 42px; object-fit: cover; border-radius: var(--radius-xs); border: 1px solid #334155;" />
        </td>
        <td>
          <div style="font-weight: 600; color: #FFFFFF; font-size: 0.92rem;">
            ${A(o)}
            ${l?'<span style="font-size: 0.72rem; color: #FCD34D; font-weight: 600; margin-left: 6px;">[비공개]</span>':""}
          </div>
          <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 2px;">
            ${s.featured?'<span style="color: #F59E0B; font-weight: 700; margin-right: 6px;">[⭐ 메인추천]</span>':""}
            ${((p=s.author)==null?void 0:p.name)||"Editor"} • ${s.readTime}분 분량
          </div>
        </td>
        <td>
          ${m}
        </td>
        <td>
          <a href="${d}" target="_blank" style="color: #38BDF8; font-family: monospace; font-size: 0.8rem; text-decoration: none;">
            ${A(s.slug)} ↗
          </a>
        </td>
        <td>
          <span style="background: rgba(56, 189, 248, 0.15); color: #38BDF8; padding: 3px 8px; border-radius: var(--radius-xs); font-size: 0.78rem; font-weight: 600;">
            ${A(c)}
          </span>
        </td>
        <td style="color: #CBD5E1;">${(s.views||0).toLocaleString()}회</td>
        <td style="color: #94A3B8; font-size: 0.82rem;">${s.publishDate||"2026-10-15"}</td>
        <td style="text-align: right; white-space: nowrap;">
          ${g}
          <a href="${d}" target="_blank" class="btn-action-icon" style="text-decoration: none; display: inline-block; margin-right: 4px;" title="개별 글 페이지 열람">
            보기
          </a>
          <button class="btn-action-icon btn-edit-article" data-id="${s.id}" style="margin-right: 4px;" title="글 수정">
            수정
          </button>
          <button class="btn-action-icon btn-delete-article" data-id="${s.id}" style="color: #F87171;" title="글 삭제">
            삭제
          </button>
        </td>
      </tr>
    `}).join(""),e.querySelectorAll(".btn-toggle-status").forEach(s=>{s.addEventListener("click",()=>{var d,l;const o=s.dataset.id,i=s.dataset.targetStatus,c=je(o,i);if(c){T(),N();const m=((d=c.title)==null?void 0:d.en)||((l=c.title)==null?void 0:l.ko)||"글";i==="draft"?I({title:"🔒 임시 저장(비공개) 전환 완료",message:`[${m}]이 임시 저장 상태로 변경되었습니다. 이제 독자 화면에서 가려집니다.`,icon:"🔒",duration:4e3}):I({title:"🚀 사이트 즉시 발행 완료",message:`[${m}]이 정상 발행되어 독자들에게 공개되었습니다.`,icon:"🚀",duration:4e3})}})}),e.querySelectorAll(".btn-edit-article").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.id;Te(o)})}),e.querySelectorAll(".btn-delete-article").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.id;confirm("이 글을 삭제하시겠습니까? 삭제된 글은 복원할 수 없습니다.")&&(Pe(o),T(),N(),I({title:"글 삭제 완료",message:"게시글이 성공적으로 삭제되었습니다."}))})})}function gt(){document.getElementById("modal-article-backdrop");const e=document.getElementById("btn-open-article-modal"),t=document.getElementById("btn-close-article-modal"),a=document.getElementById("btn-cancel-article-modal"),n=document.getElementById("form-article-editor"),s=document.getElementById("btn-auto-slug"),o=document.getElementById("editor-preset-covers"),i=document.getElementById("btn-run-translation");e&&e.addEventListener("click",()=>{Te(null)}),t&&t.addEventListener("click",re),a&&a.addEventListener("click",re);const c=document.getElementById("btn-save-as-draft");c&&c.addEventListener("click",()=>{const m=document.getElementById("editor-status");m&&(m.value="draft"),n.requestSubmit?n.requestSubmit():n.dispatchEvent(new Event("submit",{cancelable:!0}))}),s&&s.addEventListener("click",()=>{K();const m=v.en.title||v.ko.title;m&&(document.getElementById("editor-slug").value=ie(m))}),o&&o.addEventListener("change",m=>{m.target.value&&(document.getElementById("editor-cover").value=m.target.value,$.forEach(g=>{g.isCover=g.url===m.target.value}),H(),z==="preview"&&V(q))});const d=document.getElementById("editor-cover");d&&d.addEventListener("input",()=>{const m=d.value.trim();$.forEach(g=>{g.isCover=g.url===m}),H(),z==="preview"&&V(q)}),ht();const l=document.getElementById("btn-fill-sample-ko");l&&l.addEventListener("click",()=>{v.ko={title:"2026 올리브영 1위 선크림: 라운드랩 자작나무 수분 선크림 분석",excerpt:"백탁 없는 가벼운 로션 제형과 인제 자작나무 수액의 깊은 보습력을 갖춘 한국 1위 선크림의 피부과 테스트 결과 및 올리브영 글로벌 직구 팁",content:`### 1. 왜 올리브영 1위 선크림인가?

한국에서는 선크림을 단순한 여름용 화장품이 아닌 매일 바르는 스킨케어의 마지막 단계로 취급합니다. 라운드랩 자작나무 수분 선크림은 로션처럼 가볍게 스며들어 화장이 밀리지 않습니다.

### 2. 핵심 유효 성분 및 효능
• 인제 자작나무 수액: 피부 속 깊은 수분 공급 및 쿨링 효과
• 비타 히알루론산: 건조한 환경에서도 24시간 촉촉함 유지
• 논코메도제닉 테스트 완료: 트러블 및 민감성 피부도 안심 사용

### 3. 올리브영 글로벌 직구 팁
올리브영 글로벌 몰에서 주문 시 결제창에서 프로모 코드 **GLOW10**을 입력하면 추가 10% 할인을 받을 수 있습니다.`},z==="ko"&&ue(),I({title:"예시 데이터 입력 완료",message:"한국어 원문이 채워졌습니다. 이제 '자동 번역 실행' 버튼을 눌러보세요!"})}),document.querySelectorAll("[data-engine-choice]").forEach(m=>{m.addEventListener("click",()=>{const g=m.dataset.engineChoice;$e(g),be(g),I({title:g==="gemini"?"Gemini AI 번역 엔진 선택":"기본 구글 번역 엔진 선택",message:g==="gemini"?"이제 새 글 작성 시 Gemini AI가 우선 적용됩니다.":"별도 키 없이 무제한으로 기본 구글 번역이 적용됩니다.",icon:g==="gemini"?"🤖":"🌐"})})}),i&&i.addEventListener("click",pt),document.querySelectorAll("[data-editor-lang]").forEach(m=>{m.addEventListener("click",()=>{K();const g=m.dataset.editorLang;document.querySelectorAll("[data-editor-lang]").forEach(f=>f.classList.remove("active")),m.classList.add("active"),z=g;const u=document.getElementById("editor-text-fields-wrap"),p=document.getElementById("editor-preview-container"),r=document.getElementById("translation-banner-box");g==="preview"?(u&&(u.style.display="none"),r&&(r.style.display="none"),p&&(p.style.display="flex"),V(q)):(u&&(u.style.display="block"),p&&(p.style.display="none"),r&&(r.style.display=g==="ko"?"flex":"none"),ue())})}),document.querySelectorAll("[data-preview-lang]").forEach(m=>{m.addEventListener("click",()=>{document.querySelectorAll("[data-preview-lang]").forEach(g=>g.classList.remove("active")),m.classList.add("active"),q=m.dataset.previewLang,V(q)})}),n&&n.addEventListener("submit",async m=>{var w;m.preventDefault(),K();let g=document.getElementById("editor-slug").value.trim();const u=document.getElementById("editor-category").value,p=document.getElementById("editor-skintype").value,r=parseInt(document.getElementById("editor-readtime").value,10)||5,f=document.getElementById("editor-featured").value==="true",y=((w=document.getElementById("editor-status"))==null?void 0:w.value)||"published",h=document.getElementById("editor-cover").value.trim();if(!v.en.title&&v.ko.title){I({title:"자동 번역 진행",message:"영문 번역본을 자동으로 완성하여 저장합니다..."});try{const L=await ze({titleKo:v.ko.title,excerptKo:v.ko.excerpt,contentKo:v.ko.content});v.en=L.en,v.zh=L.zh,v.ja=L.ja,g||(g=L.slug)}catch(L){console.error("Auto translation on submit failed:",L),v.en.title=v.ko.title}}g||(g=ie(v.en.title||v.ko.title||`article-${Date.now()}`));const b=!E,k={id:b?g:E.id,slug:g,status:y,featured:f,category:u,skinType:p,coverImage:h||"/assets/images/glass-skin.jpg",readTime:r,views:E?E.views:1,publishDate:E?E.publishDate:new Date().toISOString().split("T")[0],author:E?E.author:{name:"Seoul Beauty Desk",role:"Senior Clinical Editor",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"},title:{ko:v.ko.title,en:v.en.title||v.ko.title,zh:v.zh.title||v.en.title||v.ko.title,ja:v.ja.title||v.en.title||v.ko.title},excerpt:{ko:v.ko.excerpt,en:v.en.excerpt||v.ko.excerpt,zh:v.zh.excerpt||v.en.excerpt||v.ko.excerpt,ja:v.ja.excerpt||v.en.excerpt||v.ko.excerpt},content:{ko:v.ko.content,en:v.en.content||v.ko.content,zh:v.zh.content||v.en.content||v.ko.content,ja:v.ja.content||v.en.content||v.ko.content},products:(E==null?void 0:E.products)||["round-lab-birch-sunscreen","anua-heartleaf-toner","torriden-dive-in-serum"]};We(k),re(),T(),N();const x=y==="draft";I({title:x?b?"임시 저장 완료":"임시 저장(비공개)으로 수정 완료":b?"새 글 발행 완료":"글 수정 및 발행 완료",message:x?`[${k.title.en||k.title.ko}]이 비공개(임시 저장)로 저장되었습니다. 독자 화면에서 가려집니다.`:`[${k.title.en||k.title.ko}] 글이 정상 발행되었습니다. URL: /article.html?slug=${k.slug}`,icon:x?"📁":"🚀"})})}async function pt(){var m,g;K();const e=v.ko.title,t=v.ko.excerpt,a=v.ko.content;if(!e||!e.trim()){alert("한국어 글 제목을 먼저 입력해주세요."),(m=document.getElementById("editor-title"))==null||m.focus();return}const n=document.getElementById("btn-run-translation"),s=document.getElementById("translate-btn-icon"),o=document.getElementById("translate-btn-label"),i=document.getElementById("translation-status-msg"),c=ee(),d=c==="gemini",l=U();n&&(n.disabled=!0),s&&(s.innerHTML='<span class="translate-spinner"></span>'),o&&(o.textContent=d?"Gemini AI 번역 진행 중...":"기본 구글 번역 진행 중..."),i&&(i.style.display="block",d?(i.style.background="rgba(139, 92, 246, 0.15)",i.style.border="1px solid rgba(139, 92, 246, 0.3)",i.style.color="#C4B5FD",i.innerHTML=`🤖 <strong>Google Gemini (${l}) 번역 실행 중:</strong> K-뷰티 매거진 스타일에 맞추어 고품질 영문, 중문, 일문 번역을 생성하고 있습니다... <br><span style="font-size: 0.78rem; color: #94A3B8;">(Gemini 응답 지연/오류 시 기본 구글 번역으로 자동 안전 전환됩니다)</span>`):(i.style.background="rgba(56, 189, 248, 0.15)",i.style.border="1px solid rgba(56, 189, 248, 0.3)",i.style.color="#7DD3FC",i.innerHTML="🌐 <strong>기본 구글 번역 실행 중:</strong> Google Translate로 한국어 원문을 영문, 중문, 일문으로 빠르게 번역하고 있습니다..."));try{const u=await ze({titleKo:e,excerptKo:t,contentKo:a,engine:c});v.en=u.en,v.zh=u.zh,v.ja=u.ja;const p=document.getElementById("editor-slug");p&&(!p.value.trim()||p.value.startsWith("article-"))&&(p.value=u.slug),i&&(u.isFallback?(i.style.background="rgba(245, 158, 11, 0.18)",i.style.border="1px solid rgba(245, 158, 11, 0.4)",i.style.color="#FDE68A",i.innerHTML=`
          ⚡ <strong>기본 구글 번역으로 자동 안전 전환 완료!</strong> (안내: ${u.fallbackReason||"Gemini 응답 지연"})<br>
          영문, 중문, 일문 3개 언어가 안전하게 번역되었습니다.
          <span style="margin-left: 8px;">
            <a href="#" id="link-goto-preview" style="color: #38BDF8; font-weight: 700; text-decoration: underline;">[👁️ 독자 화면 미리보기로 확인]</a>
          </span>
        `,I({title:"기본 구글 번역으로 자동 전환 완료",message:"Gemini API 연동 지연으로 기본 구글 번역으로 즉시 전환되어 3개 언어 번역을 마쳤습니다.",icon:"🌐",duration:4500})):(i.style.background="rgba(16, 185, 129, 0.15)",i.style.border="1px solid rgba(16, 185, 129, 0.3)",i.style.color="#6EE7B7",i.innerHTML=`
          ✅ <strong>[${u.engine||"AI"}] 번역 완료!</strong> 영문, 중문, 일문 3개 언어로 완벽히 번역되었습니다.
          <span style="margin-left: 8px;">
            <a href="#" id="link-goto-preview" style="color: #38BDF8; font-weight: 700; text-decoration: underline;">[👁️ 독자 화면 미리보기로 확인]</a>
          </span>
        `,I({title:`${u.engine||"번역"} 완료`,message:"영문, 중문, 일문 번역본과 영문 URL 슬러그가 생성되었습니다. [미리보기] 탭에서 확인해보세요!",icon:d?"✨":"🌐"})),(g=document.getElementById("link-goto-preview"))==null||g.addEventListener("click",r=>{var f;r.preventDefault(),(f=document.querySelector('[data-editor-lang="preview"]'))==null||f.click()}))}catch(u){console.error("Translation error:",u),i&&(i.style.background="rgba(239, 68, 68, 0.15)",i.style.border="1px solid rgba(239, 68, 68, 0.3)",i.style.color="#FCA5A5",i.innerHTML=`⚠️ 번역 중 일시적 오류가 발생했습니다: ${u.message}<br><span style="font-size: 0.8rem; color: #E2E8F0;">상단의 [🌐 기본 구글 번역] 버튼을 누르고 다시 시도하시면 API 키 없이 즉시 번역할 수 있습니다.</span>`)}finally{n&&(n.disabled=!1),s&&(s.innerHTML=d?"✨":"🌐"),o&&(o.textContent=d?"Gemini AI 자동 번역 실행":"기본 구글 번역 실행")}}function ft(){const e=document.getElementById("btn-open-gemini-settings"),t=document.getElementById("link-open-gemini-settings"),a=document.getElementById("modal-gemini-backdrop"),n=document.getElementById("btn-close-gemini-modal"),s=document.getElementById("btn-cancel-gemini-modal"),o=document.getElementById("btn-save-gemini-key"),i=document.getElementById("btn-test-gemini-key"),c=document.getElementById("gemini-key-input"),d=document.getElementById("btn-toggle-key-visibility"),l=document.getElementById("gemini-test-result"),m=document.getElementById("radio-choice-gemini"),g=document.getElementById("radio-choice-google"),u=document.getElementById("card-choice-gemini"),p=document.getElementById("card-choice-google"),r=document.getElementById("chk-auto-fallback");function f(h){h&&h.preventDefault(),c&&(c.value=J()),l&&(l.style.display="none");const b=ee();m&&g&&(b==="gemini"?(m.checked=!0,u==null||u.classList.add("selected"),p==null||p.classList.remove("selected")):(g.checked=!0,p==null||p.classList.add("selected"),u==null||u.classList.remove("selected"))),r&&(r.checked=Ee()),a&&a.classList.add("open")}function y(){a&&a.classList.remove("open")}e&&e.addEventListener("click",f),t&&t.addEventListener("click",f),n&&n.addEventListener("click",y),s&&s.addEventListener("click",y),u==null||u.addEventListener("click",()=>{m&&(m.checked=!0),u.classList.add("selected"),p==null||p.classList.remove("selected")}),p==null||p.addEventListener("click",()=>{g&&(g.checked=!0),p.classList.add("selected"),u==null||u.classList.remove("selected")}),d&&c&&d.addEventListener("click",()=>{c.type=c.type==="password"?"text":"password"}),i&&c&&l&&i.addEventListener("click",async()=>{const h=c.value.trim();l.style.display="block",l.style.background="rgba(56, 189, 248, 0.15)",l.style.color="#7DD3FC";const b=U();l.innerHTML=`🧪 Google Gemini (${b}) 연결 확인 중...`,i.disabled=!0;const B=await at(h);i.disabled=!1,B.success?(l.style.background="rgba(16, 185, 129, 0.2)",l.style.color="#6EE7B7",l.innerHTML=`✅ <strong>연결 성공!</strong> ${B.message||`Google Gemini (${B.model||b}) 모델이 정상 작동합니다.`}`):(l.style.background="rgba(239, 68, 68, 0.2)",l.style.color="#FCA5A5",l.innerHTML=`❌ <strong>연결 실패:</strong> ${B.error}`)}),o&&c&&o.addEventListener("click",()=>{var x;const h=c.value.trim(),b=((x=document.querySelector('input[name="modal-engine-radio"]:checked'))==null?void 0:x.value)||"gemini",B=r?r.checked:!0;ot(h),$e(b),nt(B),be(b),me(),y();const k=b==="gemini"?`Google Gemini (${U()})`:"기본 구글 번역 (Google Translate)";I({title:"번역 엔진 설정 저장 완료",message:`선택된 엔진: ${k} | 자동 대체: ${B?"활성화":"비활성화"}`,icon:b==="gemini"?"🤖":"🌐"})}),me()}function yt(){const e=document.getElementById("btn-open-seo-settings"),t=document.getElementById("modal-seo-backdrop"),a=document.getElementById("btn-close-seo-modal"),n=document.getElementById("btn-close-seo-modal-footer"),s=document.getElementById("admin-seo-modal-content"),o=document.getElementById("btn-copy-seo-jsonld");if(!e||!t)return;function i(){if(!s)return;const l=window.location.origin+"/",m=tt({url:l,title:"Seoul Glow Edit | Curated K-Beauty & Olive Young Global Guide",description:"Curated Korean skincare editorial, routine guides, and Olive Young Global shopping recommendations.",lang:"en",products:Qe()}),g=JSON.stringify(m,null,2);s.innerHTML=`
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- 상단 핵심 지표 그리드 -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px;">
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">CANONICAL DOMAIN</div>
            <div style="font-size: 0.92rem; color: #38BDF8; font-weight: 700; margin-top: 4px; word-break: break-all;">${l}</div>
          </div>
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">ROBOTS META</div>
            <div style="font-size: 0.92rem; color: #34D399; font-weight: 700; margin-top: 4px;">index, follow (사용자)</div>
          </div>
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">GEO REGION</div>
            <div style="font-size: 0.92rem; color: #F472B6; font-weight: 700; margin-top: 4px;">KR-11 (Seoul, Global)</div>
          </div>
          <div style="background: #0F172A; border: 1px solid #334155; padding: 14px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; letter-spacing: 0.05em;">SCHEMA TYPES</div>
            <div style="font-size: 0.92rem; color: #FBBF24; font-weight: 700; margin-top: 4px;">WebSite, Org, Product</div>
          </div>
        </div>

        <!-- Google SERP 검색 결과 미리보기 -->
        <div style="background: #0F172A; border: 1px solid #334155; padding: 16px; border-radius: 8px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #E2E8F0; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
            <span>🔍 Google 검색 결과(SERP Snippet) 시뮬레이션</span>
          </div>
          <div style="background: #FFFFFF; color: #202124; padding: 16px; border-radius: 8px; font-family: Roboto, -apple-system, sans-serif;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="font-size: 1.1rem;">🌸</span>
              <div style="font-size: 0.82rem; color: #202124; line-height: 1.2;">
                <div style="font-weight: 600;">Seoul Glow Edit</div>
                <div style="color: #4d5156; font-size: 0.75rem;">${l}</div>
              </div>
            </div>
            <div style="color: #1a0dab; font-size: 1.12rem; font-weight: 500; cursor: pointer; line-height: 1.3; margin-bottom: 4px;">
              Seoul Glow Edit | Curated K-Beauty & Olive Young Global Guide
            </div>
            <div style="color: #4d5156; font-size: 0.84rem; line-height: 1.4;">
              Independent Seoul beauty intelligence, clinical Korean skincare routines, glass skin secrets, and Olive Young Global holy grail recommendations.
            </div>
          </div>
        </div>

        <!-- Hreflang 및 지역 태그 -->
        <div style="background: #0F172A; border: 1px solid #334155; padding: 16px; border-radius: 8px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: #E2E8F0; margin-bottom: 8px;">
            🌐 Hreflang 다국어 타겟팅 & GEO 메타 태그
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; font-size: 0.82rem; color: #94A3B8;">
            <div>
              <div style="color: #F8FAFC; font-weight: 600; margin-bottom: 4px;">Hreflang 링크 설정</div>
              <div>• <code>en</code>: ${l}?hl=en</div>
              <div>• <code>zh</code>: ${l}?hl=zh</div>
              <div>• <code>ja</code>: ${l}?hl=ja</div>
              <div>• <code>x-default</code>: ${l}?hl=en</div>
            </div>
            <div>
              <div style="color: #F8FAFC; font-weight: 600; margin-bottom: 4px;">Geo 지역 타겟 태그</div>
              <div>• <code>geo.region</code>: KR-11 (Seoul)</div>
              <div>• <code>geo.placename</code>: Seoul, South Korea</div>
              <div>• <code>target market</code>: Global (US, Japan, Greater China)</div>
            </div>
          </div>
        </div>

        <!-- 실시간 Schema.org JSON-LD -->
        <div style="background: #0F172A; border: 1px solid #334155; padding: 16px; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #E2E8F0;">
              📜 실시간 Schema.org JSON-LD 구조화 데이터
            </div>
            <span style="font-size: 0.72rem; color: #34D399; font-weight: 600;">✓ Schema.org 표준 준수</span>
          </div>
          <pre id="admin-seo-jsonld-code" style="background: #020617; color: #38BDF8; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 0.76rem; max-height: 220px; overflow-y: auto; white-space: pre-wrap; word-break: break-all; border: 1px solid #1E293B;">${g}</pre>
        </div>
      </div>
    `}e.addEventListener("click",d=>{d.preventDefault(),i(),t.classList.add("open")});const c=()=>t.classList.remove("open");a&&a.addEventListener("click",c),n&&n.addEventListener("click",c),t.addEventListener("click",d=>{d.target===t&&c()}),o&&o.addEventListener("click",()=>{const d=document.getElementById("admin-seo-jsonld-code");d&&navigator.clipboard.writeText(d.textContent).then(()=>{I({title:"복사 완료",message:"Schema.org JSON-LD 구조화 데이터가 클립보드에 복사되었습니다.",icon:"📋"})})})}function be(e){const t=e||ee(),a=document.getElementById("btn-engine-gemini"),n=document.getElementById("btn-engine-google"),s=document.getElementById("translation-banner-desc"),o=document.getElementById("translate-btn-label"),i=U(),c=Ee();a&&n&&(t==="gemini"?(a.classList.add("active"),n.classList.remove("active"),s&&(s.innerHTML=`Google AI Studio의 최신 <strong>${i}</strong> AI가 K-뷰티 매거진 스타일에 맞추어 고품질 영문·중문·일문 및 URL 슬러그를 자동 생성합니다. ${c?'<span style="color:#6EE7B7;">(API 오류/지연 시 기본 구글 번역으로 자동 안전 전환)</span>':""}`),o&&(o.textContent="Gemini AI 자동 번역 실행")):(n.classList.add("active"),a.classList.remove("active"),s&&(s.innerHTML="<strong>기본 구글 번역(Google Translate)</strong>을 사용하여 별도 키 없이 즉시 한국어 원문을 영문·중문·일문으로 빠르게 번역합니다."),o&&(o.textContent="기본 구글 번역 실행"))),me()}function me(){const e=document.getElementById("gemini-status-dot"),t=document.getElementById("gemini-status-text"),a=document.getElementById("gemini-engine-badge"),n=Ae(),s=U();ee()==="google"?(e&&(e.style.background="#38BDF8"),t&&(t.textContent="🌐 기본 구글 번역 활성"),a&&(a.textContent="기본 구글 번역 (키 불필요)",a.style.background="rgba(56, 189, 248, 0.2)",a.style.color="#7DD3FC",a.style.borderColor="rgba(56, 189, 248, 0.4)")):(e&&(e.style.background=n?"#10B981":"#F59E0B"),t&&(t.textContent=n?`🟢 ${s} 활성`:"🤖 Gemini 키 미설정"),a&&(n?(a.textContent=`Google Gemini (${s}) 연동됨`,a.style.background="rgba(16, 185, 129, 0.2)",a.style.color="#6EE7B7",a.style.borderColor="rgba(16, 185, 129, 0.4)"):(a.textContent="Google Gemini (키 미설정)",a.style.background="rgba(139, 92, 246, 0.15)",a.style.color="#C4B5FD",a.style.borderColor="rgba(139, 92, 246, 0.3)")))}function Te(e){var l,m,g,u,p,r,f,y,h,b,B,k,x,w,L,F,j;const t=document.getElementById("modal-article-backdrop"),a=document.getElementById("modal-article-title-heading"),n=document.getElementById("editor-category"),s=document.getElementById("translation-status-msg");s&&(s.style.display="none");const o=X();if(n.innerHTML=o.map(C=>{var S;return`
    <option value="${C.id}">${((S=C.name)==null?void 0:S.en)||C.id}</option>
  `}).join(""),e?(E=ae().find(S=>S.id===e),a.textContent="에디토리얼 글 수정",document.getElementById("btn-save-article-label").textContent="변경사항 저장"):(E=null,a.textContent="새 에디토리얼 글 작성",document.getElementById("btn-save-article-label").textContent="새 글 발행하기"),E){document.getElementById("editor-slug").value=E.slug||E.id,document.getElementById("editor-category").value=E.category||((l=o[0])==null?void 0:l.id),document.getElementById("editor-skintype").value=E.skinType||"all",document.getElementById("editor-readtime").value=E.readTime||5,document.getElementById("editor-featured").value=E.featured?"true":"false";const C=document.getElementById("editor-status");C&&(C.value=E.status||"published"),document.getElementById("editor-cover").value=E.coverImage||"",v={ko:{title:((m=E.title)==null?void 0:m.ko)||((g=E.title)==null?void 0:g.en)||"",excerpt:((u=E.excerpt)==null?void 0:u.ko)||((p=E.excerpt)==null?void 0:p.en)||"",content:((r=E.content)==null?void 0:r.ko)||((f=E.content)==null?void 0:f.en)||""},en:{title:((y=E.title)==null?void 0:y.en)||"",excerpt:((h=E.excerpt)==null?void 0:h.en)||"",content:((b=E.content)==null?void 0:b.en)||""},zh:{title:((B=E.title)==null?void 0:B.zh)||"",excerpt:((k=E.excerpt)==null?void 0:k.zh)||"",content:((x=E.content)==null?void 0:x.zh)||""},ja:{title:((w=E.title)==null?void 0:w.ja)||"",excerpt:((L=E.excerpt)==null?void 0:L.ja)||"",content:((F=E.content)==null?void 0:F.ja)||""}}}else{document.getElementById("editor-slug").value="",document.getElementById("editor-category").value=((j=o[0])==null?void 0:j.id)||"glass-skin",document.getElementById("editor-skintype").value="all",document.getElementById("editor-readtime").value=5,document.getElementById("editor-featured").value="false";const C=document.getElementById("editor-status");C&&(C.value="published"),document.getElementById("editor-cover").value="/assets/images/glass-skin.jpg",v={ko:{title:"",excerpt:"",content:""},en:{title:"",excerpt:"",content:""},zh:{title:"",excerpt:"",content:""},ja:{title:"",excerpt:"",content:""}}}z="ko",q="en",document.querySelectorAll("[data-editor-lang]").forEach(C=>{C.classList.toggle("active",C.dataset.editorLang==="ko")});const i=document.getElementById("editor-text-fields-wrap"),c=document.getElementById("editor-preview-container"),d=document.getElementById("translation-banner-box");if(i&&(i.style.display="block"),c&&(c.style.display="none"),d&&(d.style.display="flex"),ue(),be(),$=[],E){const C=new Set;E.coverImage&&(C.add(E.coverImage),$.push({id:`cover_${E.id}`,url:E.coverImage,name:"대표 커버 사진",size:0,isCover:!0,storage:"r2"})),["ko","en","zh","ja"].forEach(S=>{var M;const P=(((M=E.content)==null?void 0:M[S])||"").matchAll(/!\[(.*?)\]\((.*?)\)/g);for(const Ie of P){const Ge=Ie[1],W=Ie[2];W&&!C.has(W)&&(C.add(W),$.push({id:`body_${Date.now()}_${Math.random().toString(36).substring(2,7)}`,url:W,name:Ge||"본문 삽입 사진",size:0,isCover:W===E.coverImage,storage:"r2"}))}})}H(),t.classList.add("open")}function re(){const e=document.getElementById("modal-article-backdrop");e&&e.classList.remove("open"),E=null,$=[],H()}function K(){var n,s,o;if(z==="preview")return;const e=((n=document.getElementById("editor-title"))==null?void 0:n.value)||"",t=((s=document.getElementById("editor-excerpt"))==null?void 0:s.value)||"",a=((o=document.getElementById("editor-content"))==null?void 0:o.value)||"";v[z]&&(v[z].title=e,v[z].excerpt=t,v[z].content=a)}function ue(){const e=document.getElementById("editor-lang-indicator"),t=document.getElementById("editor-field-hint"),a={ko:"KO (한국어 원문 작성)",en:"EN (영문 번역본)",zh:"ZH (중문 번역본)",ja:"JA (일문 번역본)"},n={ko:"한국어 원문으로 내용을 편하게 작성하세요. 작성 후 아래 번역 버튼을 누르면 영문/중문/일문이 자동 생성됩니다.",en:"영문 번역본입니다. 독자들에게 노출될 제목, 요약, 본문을 자유롭게 수정하거나 다듬을 수 있습니다.",zh:"중문 번역본입니다. 필요에 따라 어휘나 문맥을 직접 수정할 수 있습니다.",ja:"일문 번역본입니다. 필요에 따라 어휘나 문맥을 직접 수정할 수 있습니다."};e&&(e.textContent=a[z]||z.toUpperCase()),t&&(t.textContent=n[z]||"");const s=document.getElementById("editor-title"),o=document.getElementById("editor-excerpt"),i=document.getElementById("editor-content"),c=v[z]||{title:"",excerpt:"",content:""};s&&(s.value=c.title||""),o&&(o.value=c.excerpt||""),i&&(i.value=c.content||"")}function V(e){var F,j,C,S,O;const t=X(),a=(F=document.getElementById("editor-category"))==null?void 0:F.value,n=t.find(P=>P.id===a),s=((j=n==null?void 0:n.name)==null?void 0:j[e])||((C=n==null?void 0:n.name)==null?void 0:C.en)||a||"K-Beauty",o=((S=document.getElementById("editor-readtime"))==null?void 0:S.value)||"5",i=((O=document.getElementById("editor-cover"))==null?void 0:O.value)||"/assets/images/glass-skin.jpg",c=new Date().toISOString().split("T")[0],d=v[e]||{},l=v.ko||{},m=d.title||l.title||"글 제목이 여기에 표시됩니다",g=d.excerpt||l.excerpt||"글 요약문이 여기에 표시됩니다. K-뷰티 루틴과 성분 분석을 확인해보세요.",u=d.content||l.content||`### 본문 미리보기

작성된 본문 내용이 마크다운으로 렌더링됩니다.`,p=document.getElementById("prev-card-img"),r=document.getElementById("prev-card-cat"),f=document.getElementById("prev-card-readtime"),y=document.getElementById("prev-card-date"),h=document.getElementById("prev-card-title"),b=document.getElementById("prev-card-excerpt");p&&(p.src=i),r&&(r.textContent=s),f&&(f.textContent=`${o} min read`),y&&(y.textContent=c),h&&(h.textContent=m),b&&(b.textContent=g);const B=document.getElementById("prev-reader-cat"),k=document.getElementById("prev-reader-readtime"),x=document.getElementById("prev-reader-title"),w=document.getElementById("prev-reader-img"),L=document.getElementById("prev-reader-prose");B&&(B.textContent=s),k&&(k.textContent=`${o} min read`),x&&(x.textContent=m),w&&(w.src=i),L&&(L.innerHTML=vt(u))}function vt(e){return e.replace(/^### (.*$)/gim,'<h3 style="font-size: 1.15rem; font-weight: 700; margin-top: 18px; margin-bottom: 8px; color: #1C1917;">$1</h3>').replace(/^## (.*$)/gim,'<h2 style="font-size: 1.35rem; font-weight: 700; margin-top: 22px; margin-bottom: 10px; color: #1C1917;">$1</h2>').replace(/!\[(.*?)\]\((.*?)\)/gim,(t,a,n)=>{const s=a?`<figcaption class="article-body-figcaption">${a}</figcaption>`:"";return`</p><figure class="article-body-figure"><img src="${n}" alt="${a||"K-Glow Editorial"}" class="article-body-inline-img" style="max-width: 100%; border-radius: 8px;" loading="lazy" />${s}</figure><p style="margin-bottom: 12px; line-height: 1.7; color: #44403C;">`}).replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>").replace(/\*(.*)\*/gim,"<em>$1</em>").replace(/^• (.*$)/gim,'<li style="margin-left: 18px; margin-bottom: 4px; color: #44403C;">$1</li>').replace(/\n\n/gim,'</p><p style="margin-bottom: 12px; line-height: 1.7; color: #44403C;">')}function ht(){const e=document.getElementById("r2-dropzone"),t=document.getElementById("r2-file-input"),a=document.getElementById("btn-quick-insert-photo");e&&t&&(e.addEventListener("click",()=>{t.click()}),t.addEventListener("change",n=>{const s=Array.from(n.target.files||[]);s.length>0&&ke(s),t.value=""}),["dragenter","dragover"].forEach(n=>{e.addEventListener(n,s=>{s.preventDefault(),s.stopPropagation(),e.classList.add("dragover")})}),["dragleave","drop"].forEach(n=>{e.addEventListener(n,s=>{s.preventDefault(),s.stopPropagation(),e.classList.remove("dragover")})}),e.addEventListener("drop",n=>{const s=n.dataTransfer,o=Array.from(s.files||[]).filter(i=>i.type.startsWith("image/"));o.length>0?ke(o):I({title:"업로드 오류",message:"이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다."})})),a&&a.addEventListener("click",()=>{if($.length===0){I({title:"사진 업로드 필요",message:"먼저 상단의 드롭존을 클릭하여 사진을 업로드해주세요."});const o=document.getElementById("r2-dropzone");o&&o.scrollIntoView({behavior:"smooth",block:"center"});return}if($.length===1){const o=$[0];ge(o.url,o.name);return}const n=$.map((o,i)=>`${i+1}. ${o.name||"사진"}`).join(`
`),s=prompt(`본문 커서 위치에 배치할 사진 번호를 선택하세요 (1~${$.length}):

${n}`,"1");if(s){const o=parseInt(s,10)-1;if(o>=0&&o<$.length){const i=$[o];ge(i.url,i.name)}}})}async function ke(e){var s;const t=document.getElementById("r2-upload-status"),a=document.getElementById("r2-upload-status-text");t&&(t.style.display="flex",a&&(a.textContent=`${e.length}개의 사진을 Cloudflare R2에 업로드하는 중...`));const n=new FormData;e.forEach(o=>{n.append("files",o)});try{const o=await fetch("/api/upload",{method:"POST",body:n});if(!o.ok)throw new Error(`서버 응답 오류 (${o.status})`);const i=await o.json();if(i.success&&Array.isArray(i.files)){const c=(s=document.getElementById("editor-cover"))==null?void 0:s.value.trim(),d=$.length===0;i.files.forEach((l,m)=>{const g=d&&m===0&&(!c||c==="/assets/images/glass-skin.jpg");if($.push({id:l.key||`img_${Date.now()}_${m}`,key:l.key,url:l.url,name:l.name,size:l.size,type:l.type,isCover:g,storage:l.storage||"r2"}),g){const u=document.getElementById("editor-cover");u&&(u.value=l.url)}}),H(),I({title:"Cloudflare R2 업로드 완료",message:`${i.files.length}개의 사진이 Cloudflare R2에 안전하게 저장되었습니다.`})}else throw new Error(i.error||"업로드 처리에 실패했습니다.")}catch(o){console.error("Upload failed:",o),I({title:"사진 업로드 실패",message:o.message||"사진 업로드 중 오류가 발생했습니다."})}finally{t&&(t.style.display="none")}}function H(){const e=document.getElementById("r2-gallery-wrap"),t=document.getElementById("r2-gallery-grid"),a=document.getElementById("r2-gallery-count"),n=document.getElementById("editor-cover"),s=n?n.value.trim():"";if(!(!e||!t)){if($.length===0){e.style.display="none",t.innerHTML="";return}e.style.display="block",a&&(a.textContent=$.length),t.innerHTML=$.map((o,i)=>{const c=o.url===s||o.isCover,d=o.size?`${(o.size/1024).toFixed(1)} KB`:"R2 Image",l=o.name||`photo-${i+1}`;return`
      <div class="r2-img-card ${c?"is-cover":""}" data-url="${o.url}">
        <div class="r2-card-thumb-wrap">
          <img src="${o.url}" alt="${l}" class="r2-card-thumb" onerror="this.src='/assets/images/glass-skin.jpg';" />
          ${c?'<div class="r2-card-cover-tag">★ 대표 사진 (Cover)</div>':""}
        </div>
        <div class="r2-card-body">
          <div class="r2-card-filename" title="${l}">${l}</div>
          <div class="r2-card-meta">
            <span>${d}</span>
            <span style="color: #38BDF8; font-weight: 600;">☁️ R2</span>
          </div>
          <div class="r2-card-actions">
            <button type="button" class="btn-r2-cover ${c?"is-selected":""}" data-action="set-cover" data-url="${o.url}" title="이 사진을 글의 대표 커버 사진으로 지정합니다">
              ${c?"✓ 대표 사진 선택됨":"⭐ 대표 사진 지정"}
            </button>
            <button type="button" class="btn-r2-insert" data-action="insert-content" data-url="${o.url}" data-name="${l}" title="현재 본문 커서 위치에 마크다운 사진으로 즉시 배치합니다">
              📌 본문 원하는 곳에 삽입
            </button>
            <div class="r2-card-sub-actions">
              <button type="button" class="btn-r2-sub" data-action="copy-url" data-url="${o.url}">주소 복사</button>
              <button type="button" class="btn-r2-sub delete-btn" data-action="delete" data-url="${o.url}">제거</button>
            </div>
          </div>
        </div>
      </div>
    `}).join(""),t.querySelectorAll("[data-action]").forEach(o=>{o.addEventListener("click",i=>{i.stopPropagation();const c=o.dataset.action,d=o.dataset.url,l=o.dataset.name;c==="set-cover"?Et(d):c==="insert-content"?ge(d,l):c==="copy-url"?navigator.clipboard.writeText(d).then(()=>{I({title:"URL 복사 완료",message:"사진 주소가 클립보드에 복사되었습니다."})}):c==="delete"&&($=$.filter(m=>m.url!==d),H(),I({title:"사진 제거",message:"갤러리 목록에서 사진이 제거되었습니다."}))})})}}function Et(e){const t=document.getElementById("editor-cover");t&&(t.value=e),$.forEach(a=>{a.isCover=a.url===e}),H(),z==="preview"&&V(q),I({title:"대표 사진 지정 완료",message:"선택한 사진이 메인 커버 대표 사진으로 설정되었습니다."})}function ge(e,t=""){const a=document.getElementById("editor-content");if(!a)return;const n=a.selectionStart??a.value.length,s=a.selectionEnd??a.value.length,o=a.value.substring(0,n),i=a.value.substring(s),c=o.length>0&&!o.endsWith(`

`)?o.endsWith(`
`)?`
`:`

`:"",d=i.length>0&&!i.startsWith(`

`)?i.startsWith(`
`)?`
`:`

`:"",l=(t||"사진 설명").replace(/\.[^/.]+$/,""),m=`${c}![${l}](${e})${d}`;a.value=o+m+i;const g=n+m.length;a.selectionStart=g,a.selectionEnd=g,a.focus(),a.dispatchEvent(new Event("input",{bubbles:!0})),K(),I({title:"본문 사진 배치 완료",message:`본문 커서 위치에 사진이 배치되었습니다. (${l})`})}function te(){const e=document.getElementById("categories-table-body");if(!e)return;const t=X(),a=ae();if(t.length===0){e.innerHTML=`
      <tr>
        <td colspan="4" style="text-align: center; padding: 24px; color: #94A3B8;">
          등록된 카테고리가 없습니다. 왼쪽 폼에서 카테고리를 추가해보세요.
        </td>
      </tr>
    `;return}e.innerHTML=t.map(n=>{var o,i,c;const s=a.filter(d=>d.category===n.id).length;return`
      <tr>
        <td>
          <code style="background: rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 4px; color: #38BDF8;">${A(n.id)}</code>
        </td>
        <td>
          <div style="font-weight: 600; color: #FFFFFF;">${A(((o=n.name)==null?void 0:o.en)||n.id)}</div>
          <div style="font-size: 0.78rem; color: #94A3B8; margin-top: 2px;">
            중문: ${A(((i=n.name)==null?void 0:i.zh)||"-")} | 일문: ${A(((c=n.name)==null?void 0:c.ja)||"-")}
          </div>
        </td>
        <td>
          <span style="font-weight: 600; color: #CBD5E1;">${s}개 글</span>
        </td>
        <td style="text-align: right;">
          <button class="btn-action-icon btn-delete-category" data-id="${n.id}" style="color: #F87171;" title="카테고리 삭제">
            삭제
          </button>
        </td>
      </tr>
    `}).join(""),e.querySelectorAll(".btn-delete-category").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.id;confirm(`'${s}' 카테고리를 삭제하시겠습니까?`)&&(Me(s),T(),te(),I({title:"카테고리 삭제 완료",message:`'${s}' 카테고리가 삭제되었습니다.`}))})})}function bt(){const e=document.getElementById("form-add-category");e&&e.addEventListener("submit",t=>{t.preventDefault();const a=document.getElementById("cat-new-id").value.trim().toLowerCase().replace(/\s+/g,"-"),n=document.getElementById("cat-new-name-en").value.trim(),s=document.getElementById("cat-new-name-zh").value.trim()||n,o=document.getElementById("cat-new-name-ja").value.trim()||n;!a||!n||(Ye({id:a,name:{en:n,zh:s,ja:o},count:0}),e.reset(),T(),te(),I({title:"카테고리 추가 완료",message:`'${n}' 카테고리가 생성되었습니다.`}))})}function ne(){const e=document.getElementById("tags-chips-container");if(!e)return;const t=xe();if(t.length===0){e.innerHTML='<span style="color: #94A3B8; font-size: 0.9rem;">등록된 태그가 없습니다.</span>';return}e.innerHTML=t.map(a=>`
    <div style="background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); color: #C084FC; padding: 6px 12px; border-radius: var(--radius-full); font-size: 0.85rem; display: inline-flex; align-items: center; gap: 8px;">
      <span style="font-weight: 600;">${A(a)}</span>
      <button class="btn-delete-tag" data-tag="${A(a)}" style="background: none; border: none; color: #E9D5FF; font-size: 0.85rem; cursor: pointer; padding: 0 2px;" title="태그 삭제">&times;</button>
    </div>
  `).join(""),e.querySelectorAll(".btn-delete-tag").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tag;Oe(n),T(),ne(),I({title:"태그 삭제 완료",message:`'${n}' 태그가 삭제되었습니다.`})})})}function Bt(){const e=document.getElementById("form-add-tag");e&&e.addEventListener("submit",t=>{t.preventDefault();const a=document.getElementById("tag-new-input"),n=a.value.trim();n&&(Ve(n),a.value="",T(),ne(),I({title:"태그 추가 완료",message:`'${n}' 태그가 등록되었습니다.`}))})}let oe="all",pe="all",fe="",D=new Set;function It(){const e=document.getElementById("btn-admin-comm-new"),t=document.getElementById("btn-admin-comm-bulk-delete"),a=document.getElementById("admin-comm-filter-status"),n=document.getElementById("admin-comm-filter-cat"),s=document.getElementById("admin-comm-search-input"),o=document.getElementById("admin-comm-check-all"),i=document.getElementById("modal-admin-comm-editor"),c=document.getElementById("btn-close-admin-comm-editor"),d=document.getElementById("btn-cancel-admin-comm-editor"),l=document.getElementById("form-admin-comm-editor"),m=document.getElementById("admin-comm-modal-title"),g=document.getElementById("admin-comm-edit-id"),u=document.getElementById("modal-admin-comm-comments"),p=document.getElementById("btn-close-admin-comm-comments"),r=document.getElementById("btn-close-admin-comments-footer"),f=document.getElementById("btn-admin-send-reply"),y=document.getElementById("admin-comm-admin-reply-input");e==null||e.addEventListener("click",()=>{g&&(g.value=""),l==null||l.reset(),m&&(m.textContent="관리자 공지 / 게시글 작성"),document.getElementById("admin-comm-input-category").value="Notice",document.getElementById("admin-comm-input-pinned").checked=!0,document.getElementById("admin-comm-input-author").value="K-Beauty Glow Admin",document.getElementById("admin-comm-input-country").value="🇰🇷 Seoul (Admin)",i==null||i.classList.add("open")});const h=()=>i==null?void 0:i.classList.remove("open");if(c==null||c.addEventListener("click",h),d==null||d.addEventListener("click",h),l==null||l.addEventListener("submit",B=>{B.preventDefault();const k=g?g.value.trim():"",x=document.getElementById("admin-comm-input-title").value.trim(),w=document.getElementById("admin-comm-input-category").value,L=document.getElementById("admin-comm-input-pinned").checked,F=document.getElementById("admin-comm-input-author").value.trim(),j=document.getElementById("admin-comm-input-country").value.trim(),C=document.getElementById("admin-comm-input-tags").value.trim(),S=document.getElementById("admin-comm-input-content").value.trim();if(!x||!S||!F)return;const O=C?C.split(/[,#\s]+/).filter(Boolean).map(P=>P.startsWith("#")?P:`#${P}`):[];k?(He(k,{title:x,category:w,isPinned:L,author:F,country:j,tags:O,content:S}),I({title:"게시글 수정 완료",message:"커뮤니티 글이 수정되었습니다."})):(_e({title:x,category:w,isPinned:L,isNotice:w==="Notice"||L,author:F,country:j,tags:O,content:S,password:"admin",status:"published"}),I({title:"게시글 발행 완료",message:"관리자 게시글(공지)이 등록되었습니다."})),h(),T(),G()}),a==null||a.addEventListener("change",B=>{oe=B.target.value,G()}),n==null||n.addEventListener("change",B=>{pe=B.target.value,G()}),s){let B;s.addEventListener("input",k=>{clearTimeout(B),B=setTimeout(()=>{fe=k.target.value.trim(),G()},200)})}o==null||o.addEventListener("change",B=>{const k=B.target.checked;document.querySelectorAll(".admin-comm-checkbox").forEach(w=>{w.checked=k,k?D.add(w.dataset.id):D.delete(w.dataset.id)}),Z()}),t==null||t.addEventListener("click",()=>{if(D.size===0){alert("삭제할 게시글을 먼저 선택해주세요.");return}confirm(`선택한 ${D.size}개의 게시글을 영구 삭제하시겠습니까?`)&&(Ue(Array.from(D)),D.clear(),Z(),T(),G(),I({title:"일괄 삭제 완료",message:"선택한 게시글이 삭제되었습니다."}))});const b=()=>u==null?void 0:u.classList.remove("open");p==null||p.addEventListener("click",b),r==null||r.addEventListener("click",b),f==null||f.addEventListener("click",()=>{var w;const B=(w=document.getElementById("admin-comm-comments-post-id"))==null?void 0:w.value,k=y?y.value.trim():"";if(!B||!k)return;Je(B,{author:"K-Beauty Glow Editorial (Admin)",country:"🇰🇷 Seoul (Admin)",password:"admin",content:k}),y&&(y.value=""),I({title:"답글 등록 완료",message:"관리자 공식 댓글이 등록되었습니다."});const x=ve().find(L=>L.id===B);x&&Be(x),G()}),y==null||y.addEventListener("keydown",B=>{B.key==="Enter"&&(f==null||f.click())})}function Z(){const e=document.getElementById("admin-comm-selected-count");e&&(e.textContent=D.size);const t=document.getElementById("admin-comm-check-all"),a=document.querySelectorAll(".admin-comm-checkbox");t&&a.length>0&&(t.checked=D.size===a.length)}function G(){const e=document.getElementById("community-table-body");if(!e)return;const t=ve(),a=t.length,n=t.filter(r=>r.isPinned||r.category==="Notice").length,s=t.filter(r=>r.status==="hidden").length,o=t.reduce((r,f)=>r+(f.replies||[]).length,0),i=t.reduce((r,f)=>r+(f.likes||0),0),c=document.getElementById("admin-comm-stat-total"),d=document.getElementById("admin-comm-stat-pinned"),l=document.getElementById("admin-comm-stat-hidden"),m=document.getElementById("admin-comm-stat-replies"),g=document.getElementById("admin-comm-stat-likes"),u=document.getElementById("stat-community-count");c&&(c.textContent=a),d&&(d.textContent=n),l&&(l.textContent=s),m&&(m.textContent=o),g&&(g.textContent=i),u&&(u.textContent=a);let p=[...t];if(oe==="published"?p=p.filter(r=>r.status!=="hidden"):oe==="pinned"?p=p.filter(r=>r.isPinned||r.category==="Notice"):oe==="hidden"&&(p=p.filter(r=>r.status==="hidden")),pe!=="all"&&(p=p.filter(r=>r.category===pe)),fe){const r=fe.toLowerCase();p=p.filter(f=>f.title.toLowerCase().includes(r)||f.content.toLowerCase().includes(r)||f.author.toLowerCase().includes(r)||f.tags&&f.tags.some(y=>y.toLowerCase().includes(r)))}if(p.length===0){e.innerHTML=`
      <tr>
        <td colspan="9" style="text-align: center; padding: 36px; color: #94A3B8;">
          조건에 일치하는 커뮤니티 게시글이 없습니다.
        </td>
      </tr>
    `,Z();return}e.innerHTML=p.map(r=>{const f=(r.replies||[]).length,y=D.has(r.id),h=r.status==="hidden";return`
      <tr style="${h?"opacity: 0.65; background: rgba(15, 23, 42, 0.4);":""}">
        <td style="text-align: center;">
          <input type="checkbox" class="admin-comm-checkbox" data-id="${r.id}" ${y?"checked":""} />
        </td>
        <td>
          ${r.isPinned?'<span class="badge-status-pinned">📌 공지</span>':h?'<span class="badge-status-hidden">🔒 숨김</span>':'<span class="badge-status-published">🟢 공개중</span>'}
        </td>
        <td style="color: #94A3B8; font-size: 0.8rem;">
          #${r.postNo||"-"}
        </td>
        <td>
          <span style="background: rgba(56, 189, 248, 0.12); color: #38BDF8; padding: 2px 8px; border-radius: var(--radius-xs); font-size: 0.76rem; font-weight: 600;">
            ${A(r.category)}
          </span>
        </td>
        <td style="max-width: 300px;">
          <div class="admin-comm-clickable-title" data-id="${r.id}" style="font-weight: 600; color: #F8FAFC; font-size: 0.9rem; margin-bottom: 2px; cursor: pointer;" title="클릭하여 수정">
            ${A(r.title)}
          </div>
          <div style="font-size: 0.78rem; color: #94A3B8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${A(r.content)}
          </div>
        </td>
        <td>
          <div style="font-weight: 600; color: #FFFFFF; font-size: 0.84rem;">${A(r.author)}</div>
          <div style="font-size: 0.74rem; color: #94A3B8;">${A(r.country)}</div>
        </td>
        <td style="font-size: 0.82rem; white-space: nowrap;">
          <span style="color: #94A3B8;">👁️ ${r.views||0}</span>
          <span style="color: #EC4899; margin: 0 4px;">❤️ ${r.likes||0}</span>
          <span style="color: #38BDF8;">💬 ${f}</span>
        </td>
        <td style="color: #94A3B8; font-size: 0.78rem; white-space: nowrap;">
          ${r.date}
        <td style="text-align: right; white-space: nowrap;">
          <a href="/community.html?postId=${r.id}" target="_blank" class="btn-action-icon" style="color: #60A5FA; font-size: 0.78rem; text-decoration: none;" title="독자 화면에서 바로보기">
            ↗ 보기
          </a>
          <button class="btn-action-icon btn-admin-comm-pin" data-id="${r.id}" title="${r.isPinned?"공지 해제":"상단 공지 지정"}" style="font-size: 0.78rem; color: #F472B6;">
            ${r.isPinned?"📌 해제":"📌 공지"}
          </button>
          <button class="btn-action-icon btn-admin-comm-hide" data-id="${r.id}" title="${h?"공개 복원":"사이트에서 숨김(블라인드)"}" style="font-size: 0.78rem; color: ${h?"#34D399":"#FCD34D"};">
            ${h?"👁️ 공개":"🔒 숨김"}
          </button>
          <button class="btn-action-icon btn-admin-comm-edit" data-id="${r.id}" title="게시글 내용 수정" style="font-size: 0.78rem; color: #38BDF8;">
            ✏️ 수정
          </button>
          <button class="btn-action-icon btn-admin-comm-replies" data-id="${r.id}" title="댓글 목록 및 삭제" style="font-size: 0.78rem; color: #A78BFA;">
            💬 댓글 (${f})
          </button>
          <button class="btn-action-icon btn-admin-comm-delete" data-id="${r.id}" style="color: #F87171; font-size: 0.78rem;" title="게시글 삭제">
            🗑️ 삭제
          </button>
        </td>
      </tr>
    `}).join(""),e.querySelectorAll(".admin-comm-checkbox").forEach(r=>{r.addEventListener("change",()=>{r.checked?D.add(r.dataset.id):D.delete(r.dataset.id),Z()})}),e.querySelectorAll(".admin-comm-clickable-title, .btn-admin-comm-edit").forEach(r=>{r.addEventListener("click",()=>{const f=r.dataset.id,y=t.find(h=>h.id===f);y&&kt(y)})}),e.querySelectorAll(".btn-admin-comm-pin").forEach(r=>{r.addEventListener("click",()=>{const f=r.dataset.id,y=Re(f);I({title:y?"상단 공지 지정":"공지 해제 완료",message:y?"해당 글이 사용자 게시판 최상단에 고정됩니다.":"일반 게시글로 전환되었습니다."}),G()})}),e.querySelectorAll(".btn-admin-comm-hide").forEach(r=>{r.addEventListener("click",()=>{const f=r.dataset.id,y=qe(f);I({title:y==="hidden"?"게시글 숨김(블라인드) 완료":"게시글 공개 복구 완료",message:y==="hidden"?"사용자 화면에서 즉시 가려집니다.":"사용자 화면에 다시 노출됩니다."}),G()})}),e.querySelectorAll(".btn-admin-comm-replies").forEach(r=>{r.addEventListener("click",()=>{const f=r.dataset.id,y=t.find(h=>h.id===f);y&&Be(y)})}),e.querySelectorAll(".btn-admin-comm-delete").forEach(r=>{r.addEventListener("click",()=>{const f=r.dataset.id;confirm("이 커뮤니티 게시글을 영구 삭제하시겠습니까?")&&(Ne(f),D.delete(f),T(),G(),I({title:"게시글 삭제 완료",message:"커뮤니티 글이 삭제되었습니다."}))})}),Z()}function kt(e){const t=document.getElementById("modal-admin-comm-editor"),a=document.getElementById("admin-comm-modal-title"),n=document.getElementById("admin-comm-edit-id");t&&(n&&(n.value=e.id),a&&(a.textContent=`게시글 수정 (#${e.postNo||""})`),document.getElementById("admin-comm-input-category").value=e.category||"Routine Advice",document.getElementById("admin-comm-input-pinned").checked=!!e.isPinned,document.getElementById("admin-comm-input-title").value=e.title||"",document.getElementById("admin-comm-input-author").value=e.author||"",document.getElementById("admin-comm-input-country").value=e.country||"",document.getElementById("admin-comm-input-tags").value=(e.tags||[]).join(", "),document.getElementById("admin-comm-input-content").value=e.content||"",t.classList.add("open"))}function Be(e){const t=document.getElementById("modal-admin-comm-comments"),a=document.getElementById("admin-comm-comments-target-title"),n=document.getElementById("admin-comm-comments-container"),s=document.getElementById("admin-comm-comments-post-id");if(!t||!n)return;s&&(s.value=e.id),a&&(a.textContent=`대상 글: "${e.title}"`);const o=e.replies||[];o.length===0?n.innerHTML=`
      <div style="text-align: center; padding: 24px; color: #94A3B8; font-size: 0.86rem; background: #0F172A; border-radius: var(--radius-sm);">
        등록된 댓글이 없습니다.
      </div>
    `:(n.innerHTML=o.map(i=>`
      <div class="admin-comm-comment-row" id="admin-comment-${i.id}">
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <div style="font-weight: 600; color: #FFFFFF; font-size: 0.84rem;">
              <span>${A(i.author)}</span>
              <span style="color: #94A3B8; font-size: 0.76rem; font-weight: normal; margin-left: 6px;">${A(i.country||"")}</span>
            </div>
            <div style="font-size: 0.74rem; color: #94A3B8;">${i.date}</div>
          </div>
          <div style="font-size: 0.85rem; color: #CBD5E1; line-height: 1.4; word-break: break-word;">
            ${A(i.content)}
          </div>
        </div>
        <div>
          <button class="btn-action-icon btn-admin-delete-comment" data-post-id="${e.id}" data-comment-id="${i.id}" style="color: #F87171; font-size: 0.78rem;" title="댓글 삭제">
            삭제
          </button>
        </div>
      </div>
    `).join(""),n.querySelectorAll(".btn-admin-delete-comment").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.postId,d=i.dataset.commentId;if(confirm("이 댓글을 삭제하시겠습니까?")){Ze(c,d,"",!0),I({title:"댓글 삭제 완료",message:"댓글이 삭제되었습니다."});const l=ve().find(m=>m.id===c);l&&Be(l),G()}})})),t.classList.add("open")}function A(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}let Q="dark",ye="en";function xt(){const e=document.getElementById("btn-save-promotions"),t=document.getElementById("btn-reset-promotions");e==null||e.addEventListener("click",()=>ce(!0)),t==null||t.addEventListener("click",Ct);const a=document.getElementById("promo-theme-selector");a==null||a.querySelectorAll(".promo-theme-pill").forEach(o=>{o.addEventListener("click",()=>{a.querySelectorAll(".promo-theme-pill").forEach(i=>i.classList.remove("active")),o.classList.add("active"),Q=o.dataset.theme||"dark",_(),ce(!1)})});const n=document.getElementById("promo-lang-tabs");n==null||n.querySelectorAll(".promo-lang-tab-btn").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.promoLang;n.querySelectorAll(".promo-lang-tab-btn").forEach(d=>d.classList.remove("active")),document.querySelectorAll(".promo-lang-panel").forEach(d=>d.classList.remove("active")),o.classList.add("active");const c=document.getElementById(`promo-lang-panel-${i}`);c&&c.classList.add("active"),ye=i,_()})}),["promo-top-enabled","promo-top-badge","promo-top-code","promo-top-link","promo-top-text-en","promo-top-disc-en","promo-top-text-ko","promo-top-disc-ko","promo-top-text-zh","promo-top-disc-zh","promo-top-text-ja","promo-top-disc-ja","promo-coupon-enabled","promo-floating-enabled","promo-coupon-badge","promo-coupon-discount-tag","promo-coupon-title","promo-coupon-code","promo-coupon-desc","promo-coupon-mall","promo-coupon-url","promo-coupon-success-msg"].forEach(o=>{const i=document.getElementById(o);i&&(i.addEventListener("input",()=>{_()}),i.addEventListener("change",()=>{_(),ce(!1)}))}),le()}function le(){const e=Ce();Q=e.topBanner.bgTheme||"dark";const t=document.getElementById("promo-top-enabled");t&&(t.checked=!!e.topBanner.enabled);const a=document.getElementById("promo-theme-selector");a&&a.querySelectorAll(".promo-theme-pill").forEach(i=>{i.classList.toggle("active",i.dataset.theme===Q)});const n=(i,c)=>{const d=document.getElementById(i);d&&(d.value=c??"")};n("promo-top-badge",e.topBanner.badge),n("promo-top-code",e.topBanner.promoCode),n("promo-top-link",e.topBanner.linkUrl),n("promo-top-text-en",e.topBanner.textEn||e.topBanner.text),n("promo-top-disc-en",e.topBanner.discountEn||e.topBanner.discount),n("promo-top-text-ko",e.topBanner.textKo),n("promo-top-disc-ko",e.topBanner.discountKo),n("promo-top-text-zh",e.topBanner.textZh),n("promo-top-disc-zh",e.topBanner.discountZh),n("promo-top-text-ja",e.topBanner.textJa),n("promo-top-disc-ja",e.topBanner.discountJa);const s=document.getElementById("promo-coupon-enabled");s&&(s.checked=!!e.eventCoupon.enabled);const o=document.getElementById("promo-floating-enabled");o&&(o.checked=!!e.eventCoupon.floatingEnabled),n("promo-coupon-badge",e.eventCoupon.badge),n("promo-coupon-discount-tag",e.eventCoupon.discountTag),n("promo-coupon-title",e.eventCoupon.title),n("promo-coupon-code",e.eventCoupon.promoCode),n("promo-coupon-desc",e.eventCoupon.desc),n("promo-coupon-mall",e.eventCoupon.targetMallName),n("promo-coupon-url",e.eventCoupon.landingUrl),n("promo-coupon-success-msg",e.eventCoupon.copySuccessMessage),_()}function _(){const e=f=>{var y;return(((y=document.getElementById(f))==null?void 0:y.value)||"").trim()},t=f=>{var y;return!!((y=document.getElementById(f))!=null&&y.checked)},a=t("promo-top-enabled"),n=e("promo-top-badge")||"READER PRIVILEGE",s=e("promo-top-code")||"GLOW10";let o=e(`promo-top-text-${ye}`)||e("promo-top-text-en")||"THE K-GLOW READERS: Use promo code",i=e(`promo-top-disc-${ye}`)||e("promo-top-disc-en")||"for an exclusive 10% OFF at Olive Young Global";const c=document.getElementById("preview-top-banner"),d=document.getElementById("preview-top-disabled-msg");if(c&&d)if(a){c.style.display="block",d.style.display="none",c.className=`promo-live-top-banner theme-${Q}`;const f=document.getElementById("preview-top-badge");f&&(f.textContent=n);const y=document.getElementById("preview-top-text");y&&(y.textContent=o);const h=document.getElementById("preview-top-code");h&&(h.textContent=s);const b=document.getElementById("preview-top-discount");b&&(b.textContent=i)}else c.style.display="none",d.style.display="block";const l=t("promo-coupon-enabled"),m=document.getElementById("preview-sidebar-widget"),g=document.getElementById("preview-sidebar-disabled-msg");if(m&&g)if(l){m.style.display="block",g.style.display="none";const f=e("promo-coupon-badge")||"READER PRIVILEGE",y=e("promo-coupon-title")||"Olive Young Global 10% OFF",h=e("promo-coupon-code")||"GLOW10",b=e("promo-coupon-desc")||"",B=e("promo-coupon-mall")||"Olive Young Global",k=document.getElementById("preview-sidebar-badge");k&&(k.textContent=f);const x=document.getElementById("preview-sidebar-title");x&&(x.textContent=y);const w=document.getElementById("preview-sidebar-code");w&&(w.textContent=h);const L=document.getElementById("preview-sidebar-desc");L&&(L.textContent=b);const F=document.getElementById("preview-sidebar-mall");F&&(F.textContent=B)}else m.style.display="none",g.style.display="block";const u=t("promo-floating-enabled")&&l,p=document.getElementById("preview-floating-pill"),r=document.getElementById("preview-floating-disabled-msg");if(p&&r)if(u){p.style.display="inline-block",r.style.display="none";const f=e("promo-coupon-code")||"GLOW10",y=e("promo-coupon-discount-tag")||"10% OFF",h=document.getElementById("preview-floating-code");h&&(h.textContent=f);const b=document.getElementById("preview-floating-tag");b&&(b.textContent=y)}else p.style.display="none",r.style.display="block"}function ce(e=!0){const t=s=>{var o;return(((o=document.getElementById(s))==null?void 0:o.value)||"").trim()},a=s=>{var o;return!!((o=document.getElementById(s))!=null&&o.checked)},n={topBanner:{enabled:a("promo-top-enabled"),badge:t("promo-top-badge")||"READER PRIVILEGE",promoCode:t("promo-top-code")||"GLOW10",linkUrl:t("promo-top-link")||"https://global.oliveyoung.com",bgTheme:Q||"dark",textEn:t("promo-top-text-en"),discountEn:t("promo-top-disc-en"),textKo:t("promo-top-text-ko"),discountKo:t("promo-top-disc-ko"),textZh:t("promo-top-text-zh"),discountZh:t("promo-top-disc-zh"),textJa:t("promo-top-text-ja"),discountJa:t("promo-top-disc-ja")},eventCoupon:{enabled:a("promo-coupon-enabled"),floatingEnabled:a("promo-floating-enabled"),badge:t("promo-coupon-badge")||"READER PRIVILEGE",discountTag:t("promo-coupon-discount-tag")||"10% OFF",title:t("promo-coupon-title")||"Olive Young Global 10% OFF",promoCode:t("promo-coupon-code")||"GLOW10",desc:t("promo-coupon-desc"),targetMallName:t("promo-coupon-mall")||"Olive Young Global",landingUrl:t("promo-coupon-url")||"https://global.oliveyoung.com",copySuccessMessage:t("promo-coupon-success-msg")||"Code copied to clipboard!"}};Xe(n),T(),_(),e&&I({title:"설정 저장 완료",message:"상단 배너 및 이벤트 쿠폰 설정이 성공적으로 저장되었습니다."})}function Ct(){confirm("배너 및 이벤트 쿠폰 설정을 기본값으로 되돌리시겠습니까?")&&(et(),le(),T(),I({title:"기본값 복원 완료",message:"배너 및 쿠폰 설정이 초기 기본 데모 상태로 복원되었습니다."}))}document.addEventListener("DOMContentLoaded",()=>{ct()});
