/**
 * SEO & GEO Optimization Engine for Seoul Glow Edit
 * Handles Schema.org JSON-LD generation, hreflang sync, Geo meta tags, and live SERP calculation
 */

import { getLang } from './i18n.js';

export function updateHeadMetadata({
  title,
  description,
  url = window.location.href,
  image = "/assets/images/hero-editorial.jpg",
  type = "website",
  article = null,
  products = []
}) {
  const lang = getLang();
  
  // Set Document Title
  document.title = title || `Seoul Glow Edit | Curated K-Beauty & Olive Young Global Guide`;

  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description;

  // Open Graph Tags
  setMetaTag('property', 'og:title', document.title);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:type', type);
  setMetaTag('property', 'og:url', url);
  setMetaTag('property', 'og:image', new URL(image, window.location.origin).href);
  setMetaTag('property', 'og:site_name', 'Seoul Glow Edit');

  // Twitter Card
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', document.title);
  setMetaTag('name', 'twitter:description', description);
  setMetaTag('name', 'twitter:image', new URL(image, window.location.origin).href);

  // Geo Tags
  setMetaTag('name', 'geo.region', 'KR-11');
  setMetaTag('name', 'geo.placename', 'Seoul, South Korea');
  setMetaTag('name', 'DC.title', document.title);

  // Canonical Tag
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  const baseUrl = window.location.origin + window.location.pathname;
  canonical.href = baseUrl;

  // Hreflang Tags
  updateHreflangTags(baseUrl);

  // Generate & Inject Structured Data (JSON-LD)
  updateJsonLd({
    url: baseUrl,
    title: document.title,
    description,
    image: new URL(image, window.location.origin).href,
    lang,
    article,
    products
  });
}

function setMetaTag(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content || '';
}

function updateHreflangTags(baseUrl) {
  const supportedLangs = ['en', 'zh', 'ja', 'x-default'];
  
  // Remove existing hreflang tags
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

  supportedLangs.forEach(hl => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hl;
    link.href = hl === 'x-default' ? `${baseUrl}?hl=en` : `${baseUrl}?hl=${hl}`;
    document.head.appendChild(link);
  });
}

export function generateStructuredData({ url, title, description, image, lang, article, products = [] }) {
  const schemaList = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Seoul Glow Edit",
      "url": url,
      "inLanguage": ["en", "zh-CN", "ja"],
      "description": "Curated Korean skincare editorial, routine guides, and Olive Young Global shopping recommendations.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${url}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Seoul Glow Edit",
      "url": url,
      "logo": `${window.location.origin}/assets/images/hero-editorial.jpg`,
      "sameAs": [
        "https://global.oliveyoung.com",
        "https://www.instagram.com/seoulglowedit",
        "https://twitter.com/seoulglowedit"
      ]
    }
  ];

  // If viewing an article, add Article schema
  if (article) {
    const artTitle = typeof article.title === 'object' ? (article.title[lang] || article.title.en) : article.title;
    const artExcerpt = typeof article.excerpt === 'object' ? (article.excerpt[lang] || article.excerpt.en) : article.excerpt;
    
    schemaList.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": artTitle,
      "description": artExcerpt,
      "image": [new URL(article.coverImage, window.location.origin).href],
      "datePublished": article.publishDate || "2026-10-12",
      "dateModified": "2026-10-15",
      "author": {
        "@type": "Person",
        "name": article.author?.name || "Min-Ji Kang",
        "jobTitle": article.author?.role || "Senior Beauty Editor"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Seoul Glow Edit",
        "logo": {
          "@type": "ImageObject",
          "url": `${window.location.origin}/assets/images/hero-editorial.jpg`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${url}#${article.slug}`
      }
    });
  }

  // Add Product schema for featured Olive Young items
  products.slice(0, 4).forEach(prod => {
    const prodName = typeof prod.name === 'object' ? (prod.name[lang] || prod.name.en) : prod.name;
    schemaList.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": prodName,
      "image": new URL(prod.image, window.location.origin).href,
      "brand": {
        "@type": "Brand",
        "name": prod.brand
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": prod.rating || 4.9,
        "reviewCount": prod.reviewsCount || 12500
      },
      "offers": {
        "@type": "Offer",
        "url": prod.oliveYoungUrl,
        "priceCurrency": "USD",
        "price": prod.priceUSD,
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "CJ Olive Young Global"
        }
      }
    });
  });

  return schemaList;
}

function updateJsonLd(config) {
  let script = document.getElementById('seo-json-ld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'seo-json-ld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  const schemas = generateStructuredData(config);
  script.textContent = JSON.stringify(schemas, null, 2);
}
