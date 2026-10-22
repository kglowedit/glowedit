/**
 * AI & Multilingual Translation Engine for K-beuty Glow Edit
 * Powered by Google Gemini (Google AI Studio Free Tier) with dynamic ModelService discovery,
 * semantic version sorting, automatic recommendation recovery, and fallback translator.
 */

const GEMINI_API_KEY_STORAGE = 'kbeauty_gemini_api_key';
const GEMINI_MODEL_STORAGE = 'kbeauty_gemini_active_model';
const GEMINI_VERSION_STORAGE = 'kbeauty_gemini_api_version';
const TRANSLATION_ENGINE_STORAGE = 'kbeauty_translation_engine';
const AUTO_FALLBACK_STORAGE = 'kbeauty_auto_fallback';

export function getPreferredEngine() {
  const saved = localStorage.getItem(TRANSLATION_ENGINE_STORAGE);
  if (saved === 'google' || saved === 'gemini') return saved;
  return hasGeminiApiKey() ? 'gemini' : 'google';
}

export function setPreferredEngine(engine) {
  if (engine === 'google' || engine === 'gemini') {
    localStorage.setItem(TRANSLATION_ENGINE_STORAGE, engine);
  }
}

export function isAutoFallbackEnabled() {
  return localStorage.getItem(AUTO_FALLBACK_STORAGE) !== 'false';
}

export function setAutoFallbackEnabled(enabled) {
  localStorage.setItem(AUTO_FALLBACK_STORAGE, String(Boolean(enabled)));
}

export const PREFERRED_GEMINI_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.5-flash',
  'gemini-3.0-flash',
  'gemini-3-flash',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash'
];

export function getGeminiApiKey() {
  return (localStorage.getItem(GEMINI_API_KEY_STORAGE) || '').trim();
}

export function setGeminiApiKey(key) {
  if (!key || !key.trim()) {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE);
    localStorage.removeItem(GEMINI_MODEL_STORAGE);
    localStorage.removeItem(GEMINI_VERSION_STORAGE);
  } else {
    localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
  }
}

export function hasGeminiApiKey() {
  return Boolean(getGeminiApiKey());
}

export function getActiveGeminiModel() {
  return localStorage.getItem(GEMINI_MODEL_STORAGE) || 'gemini-3.8-flash';
}

/**
 * Extracts a newer model recommendation from Google deprecation errors
 * e.g. "Please update your code to use models/gemini-3.8-flash..." -> "gemini-3.8-flash"
 */
export function extractRecommendedModel(errorMessage) {
  if (!errorMessage) return null;
  const match = errorMessage.match(/update your code to use (?:models\/)?([a-zA-Z0-9.-]+)/i);
  return match ? match[1] : null;
}

/**
 * Sorts Gemini models dynamically by version (highest first) and prioritizes flash models
 */
export function sortGeminiModels(list) {
  return [...list].sort((a, b) => {
    const getVer = s => {
      const m = s.match(/gemini-(\d+(?:\.\d+)?)/i);
      return m ? parseFloat(m[1]) : 0;
    };
    const isFlashA = a.toLowerCase().includes('flash') ? 100 : 0;
    const isFlashB = b.toLowerCase().includes('flash') ? 100 : 0;
    return (isFlashB + getVer(b)) - (isFlashA + getVer(a));
  });
}

/**
 * Queries Google AI Studio's ModelService.ListModels
 * to find the exact models available for this specific API key.
 */
export async function fetchAvailableGeminiModels(apiKey) {
  const key = (apiKey || getGeminiApiKey()).trim();
  if (!key) throw new Error("API 키를 입력해주세요.");

  const versions = ['v1beta', 'v1'];
  let lastErrorMsg = null;

  for (const ver of versions) {
    try {
      const listUrl = `https://generativelanguage.googleapis.com/${ver}/models?key=${key}`;
      const res = await fetch(listUrl);
      const data = await res.json();

      if (!res.ok) {
        lastErrorMsg = data.error?.message || `Google API 오류 (${res.status})`;
        continue;
      }

      if (Array.isArray(data.models)) {
        const generationModels = data.models
          .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
          .map(m => m.name.replace(/^models\//, ''));

        if (generationModels.length > 0) {
          const sorted = sortGeminiModels(generationModels);
          return {
            models: sorted,
            apiVersion: ver
          };
        }
      }
    } catch (e) {
      lastErrorMsg = e.message;
    }
  }

  throw new Error(lastErrorMsg || "API 키로 사용 가능한 Gemini 모델을 찾을 수 없습니다.");
}

/**
 * Validates a Gemini API Key directly by listing models and performing a lightweight ping
 */
export async function testGeminiApiKey(key) {
  const cleanKey = (key || getGeminiApiKey()).trim();
  if (!cleanKey) {
    return { success: false, error: "API 키를 입력해주세요." };
  }

  try {
    // 1. Fetch exact models authorized for this key
    const { models, apiVersion } = await fetchAvailableGeminiModels(cleanKey);

    // 2. Select best candidate (version sorted, flash prioritized)
    let selectedModel = models[0] || 'gemini-3.8-flash';

    // 3. Test generateContent call on the chosen model with auto-recovery for deprecated model recommendations
    let testUrl = `https://generativelanguage.googleapis.com/${apiVersion}/models/${selectedModel}:generateContent?key=${cleanKey}`;
    let res = await fetch(testUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello! Reply with 'OK'." }] }]
      })
    });

    let data = await res.json();

    // If Google returned a deprecation message recommending a newer model, auto-switch to it!
    if (!res.ok) {
      const recommended = extractRecommendedModel(data.error?.message);
      if (recommended) {
        selectedModel = recommended;
        testUrl = `https://generativelanguage.googleapis.com/${apiVersion}/models/${selectedModel}:generateContent?key=${cleanKey}`;
        res = await fetch(testUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello! Reply with 'OK'." }] }]
          })
        });
        data = await res.json();
      }
    }

    if (!res.ok) {
      return { success: false, error: data.error?.message || `테스트 호출 실패 (${res.status})` };
    }

    localStorage.setItem(GEMINI_MODEL_STORAGE, selectedModel);
    localStorage.setItem(GEMINI_VERSION_STORAGE, apiVersion);

    return {
      success: true,
      message: `Google Gemini 연결 성공! (최신 AI 모델: ${selectedModel}, API: ${apiVersion})`,
      model: selectedModel
    };
  } catch (err) {
    return { success: false, error: err.message || "연결 확인 실패" };
  }
}

/**
 * High-quality translation using Google Gemini with structured JSON output
 */
export async function translateWithGemini({ titleKo, excerptKo, contentKo, apiKey }) {
  const key = (apiKey || getGeminiApiKey()).trim();
  if (!key) throw new Error("Gemini API 키가 설정되지 않았습니다.");

  let model = getActiveGeminiModel();
  let apiVersion = localStorage.getItem(GEMINI_VERSION_STORAGE) || 'v1beta';

  try {
    const available = await fetchAvailableGeminiModels(key);
    if (available.models.length > 0) {
      model = available.models[0];
    }
    apiVersion = available.apiVersion;
  } catch (err) {
    console.warn("Could not refresh models list, using cached model:", model);
  }

  const prompt = `
You are an expert bilingual/multilingual K-Beauty skincare editor and translator for the global digital publication "K-beuty Glow Edit".
Translate the following Korean article into:
1) English (en)
2) Chinese Simplified (zh)
3) Japanese (ja)

Source Content (Korean):
- Title: ${titleKo}
- Excerpt: ${excerptKo || titleKo}
- Markdown Content:
${contentKo || titleKo}

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
`;

  let url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${key}`;
  let res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: "application/json"
      }
    })
  });

  let data = await res.json();

  // If deprecated model error with recommendation, auto-recover!
  if (!res.ok) {
    const recommended = extractRecommendedModel(data.error?.message);
    if (recommended) {
      model = recommended;
      url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${key}`;
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        })
      });
      data = await res.json();
    }
  }

  if (!res.ok) {
    throw new Error(data.error?.message || `Gemini API Error (${res.status})`);
  }

  const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawJsonText) {
    throw new Error("Gemini 응답에서 번역 텍스트를 파싱할 수 없습니다.");
  }

  const parsed = parseGeminiJson(rawJsonText);
  localStorage.setItem(GEMINI_MODEL_STORAGE, model);

  return {
    en: {
      title: parsed.en?.title || titleKo,
      excerpt: parsed.en?.excerpt || excerptKo || titleKo,
      content: parsed.en?.content || contentKo || titleKo
    },
    zh: {
      title: parsed.zh?.title || titleKo,
      excerpt: parsed.zh?.excerpt || excerptKo || titleKo,
      content: parsed.zh?.content || contentKo || titleKo
    },
    ja: {
      title: parsed.ja?.title || titleKo,
      excerpt: parsed.ja?.excerpt || excerptKo || titleKo,
      content: parsed.ja?.content || contentKo || titleKo
    },
    slug: parsed.slug || generateSlug(parsed.en?.title || titleKo),
    engine: `Google Gemini (${model})`
  };
}

function parseGeminiJson(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw e;
  }
}

/**
 * Fallback browser translator (Google Translate client endpoint)
 */
const KBEAUTY_DICTIONARY = [
  { ko: /물광\s*피부|유리알\s*피부/gi, en: 'Glass Skin', zh: '水光肌', ja: '水光肌' },
  { ko: /올리브영\s*어워즈/gi, en: 'Olive Young Awards', zh: 'Olive Young 年度大赏', ja: 'オリーブヤングアワード' },
  { ko: /올리브영/gi, en: 'Olive Young', zh: 'Olive Young', ja: 'オリーブヤング' },
  { ko: /선크림|자외선\s*차단제/gi, en: 'Sunscreen', zh: '防晒霜', ja: '日焼け止め' },
  { ko: /토너\s*패드/gi, en: 'Toner Pad', zh: '爽肤棉片', ja: 'トナーパッド' },
  { ko: /속건조/gi, en: 'Inner Dryness', zh: '深层缺水', ja: '인나ード라이' },
  { ko: /진정\s*앰플/gi, en: 'Calming Ampoule', zh: '舒缓镇静安瓶', ja: '鎮静アンプル' },
  { ko: /피부\s*장벽/gi, en: 'Skin Barrier', zh: '皮肤屏障', ja: '肌バリア機能' },
  { ko: /자작나무\s*수액/gi, en: 'Birch Juice', zh: '白桦树汁', ja: '白樺樹液' },
  { ko: /어성초/gi, en: 'Heartleaf', zh: '鱼腥草', ja: 'ドクダミ' },
  { ko: /시카|병풀/gi, en: 'Centella (Cica)', zh: '积雪草', ja: 'CICA・ツボクサ' }
];

export async function translateTextFallback(text, targetLang) {
  if (!text || !text.trim()) return '';

  const langCodeMap = { en: 'en', zh: 'zh-CN', ja: 'ja' };
  const tl = langCodeMap[targetLang] || targetLang;

  const paragraphs = text.split('\n\n');
  const translatedParagraphs = [];

  for (const para of paragraphs) {
    if (!para.trim()) {
      translatedParagraphs.push('');
      continue;
    }

    try {
      const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=ko&tl=${tl}&q=${encodeURIComponent(para)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        let translated = Array.isArray(data) ? data.join('') : String(data);
        translatedParagraphs.push(translated);
      } else {
        const fallbackUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=${tl}&dt=t&q=${encodeURIComponent(para)}`;
        const fbRes = await fetch(fallbackUrl);
        if (fbRes.ok) {
          const fbData = await fbRes.json();
          const translated = (fbData[0] || []).map(s => s[0]).join('');
          translatedParagraphs.push(translated);
        } else {
          translatedParagraphs.push(para);
        }
      }
    } catch (err) {
      let localFallback = para;
      KBEAUTY_DICTIONARY.forEach(term => {
        localFallback = localFallback.replace(term.ko, term[targetLang] || term.en);
      });
      translatedParagraphs.push(localFallback);
    }
  }

  return translatedParagraphs.join('\n\n');
}

/**
 * Universal Translator Orchestrator
 * Supports Google Gemini AI or standard free Google Translate based on user selection,
 * with seamless automatic fallback if Gemini encounters connectivity/quota issues.
 */
export async function translateFullArticle({ titleKo, excerptKo, contentKo, engine: requestedEngine }) {
  if (!titleKo || !titleKo.trim()) {
    throw new Error('한국어 제목을 입력해주세요.');
  }

  const selectedEngine = requestedEngine || getPreferredEngine();
  const autoFallback = isAutoFallbackEnabled();
  let fallbackReason = null;

  // 1. If user selected Gemini AI
  if (selectedEngine === 'gemini') {
    const geminiKey = getGeminiApiKey();
    if (geminiKey) {
      try {
        const geminiResult = await translateWithGemini({ titleKo, excerptKo, contentKo, apiKey: geminiKey });
        return {
          ...geminiResult,
          isFallback: false
        };
      } catch (geminiError) {
        console.warn("Gemini API call failed, evaluating auto-fallback:", geminiError);
        if (!autoFallback) {
          throw geminiError;
        }
        fallbackReason = geminiError.message || "연결 오류";
      }
    } else {
      if (!autoFallback) {
        throw new Error("Gemini API 키가 설정되지 않았습니다. [Gemini API 키 설정]에서 등록해주세요.");
      }
      fallbackReason = "API 키 미설정";
    }
  }

  // 2. Standard Google Translate (Free browser client endpoint)
  const [
    titleEn, excerptEn, contentEn,
    titleZh, excerptZh, contentZh,
    titleJa, excerptJa, contentJa
  ] = await Promise.all([
    translateTextFallback(titleKo, 'en'),
    translateTextFallback(excerptKo, 'en'),
    translateTextFallback(contentKo, 'en'),

    translateTextFallback(titleKo, 'zh'),
    translateTextFallback(excerptKo, 'zh'),
    translateTextFallback(contentKo, 'zh'),

    translateTextFallback(titleKo, 'ja'),
    translateTextFallback(excerptKo, 'ja'),
    translateTextFallback(contentKo, 'ja')
  ]);

  const slug = generateSlug(titleEn || titleKo);

  return {
    en: {
      title: titleEn.trim(),
      excerpt: (excerptEn || titleEn).trim(),
      content: (contentEn || titleEn).trim()
    },
    zh: {
      title: titleZh.trim(),
      excerpt: (excerptZh || titleZh).trim(),
      content: (contentZh || titleZh).trim()
    },
    ja: {
      title: titleJa.trim(),
      excerpt: (excerptJa || titleJa).trim(),
      content: (contentJa || titleJa).trim()
    },
    slug,
    engine: fallbackReason 
      ? "기본 구글 번역 (Gemini 대체)" 
      : "기본 구글 번역 (Google Translate)",
    isFallback: Boolean(fallbackReason),
    fallbackReason
  };
}

export function generateSlug(text) {
  if (!text) return `article-${Date.now()}`;
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 65);
}
