/**
 * Cloudflare Pages Functions: Serve Image from Cloudflare R2
 * Endpoint: GET /api/images/*
 */

export async function onRequestGet(context) {
  return handleImageRequest(context, false);
}

export async function onRequestHead(context) {
  return handleImageRequest(context, true);
}

async function handleImageRequest(context, isHeadOnly = false) {
  const { request, params, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const rawPath = params.path;
    let r2Key = '';

    if (Array.isArray(rawPath)) {
      r2Key = rawPath.join('/');
    } else if (typeof rawPath === 'string') {
      r2Key = rawPath;
    } else {
      const url = new URL(request.url);
      r2Key = url.pathname.replace(/^\/api\/images\//, '');
    }

    if (!r2Key) {
      return new Response('Key parameter is missing', { status: 400, headers: corsHeaders });
    }

    if (!env.R2_BUCKET) {
      return new Response('Cloudflare R2 Bucket binding is not configured.', {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const object = await env.R2_BUCKET.get(r2Key);
    if (!object) {
      return new Response('Image not found in R2 bucket', {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(isHeadOnly ? null : object.body, {
      headers
    });

  } catch (err) {
    return new Response(`Error retrieving image from R2: ${err.message}`, {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

