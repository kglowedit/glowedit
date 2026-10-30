/**
 * Cloudflare Pages Functions: Image Upload API to Cloudflare R2
 * Endpoint: POST /api/upload
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Content-Type must be multipart/form-data'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const formData = await request.formData();
    // Support both 'files' (multiple) and 'file' (single)
    const fileEntries = [
      ...formData.getAll('files'),
      ...formData.getAll('file'),
      ...formData.getAll('images')
    ].filter(item => item instanceof File && item.size > 0);

    if (fileEntries.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: '업로드할 이미지 파일이 없습니다.'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const uploadedFiles = [];
    const today = new Date().toISOString().slice(0, 10);

    for (const file of fileEntries) {
      const origName = file.name || 'image.jpg';
      const ext = origName.includes('.') ? origName.split('.').pop().toLowerCase() : 'jpg';
      const safeRandom = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 12);
      const cleanName = origName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const r2Key = `articles/${today}/${safeRandom}_${cleanName}`;
      const fileMime = file.type || getMimeType(ext);

      if (env.R2_BUCKET) {
        // Upload to Cloudflare R2
        await env.R2_BUCKET.put(r2Key, file.stream(), {
          httpMetadata: {
            contentType: fileMime,
            cacheControl: 'public, max-age=31536000, immutable'
          },
          customMetadata: {
            originalName: encodeURIComponent(origName),
            uploadedAt: new Date().toISOString()
          }
        });

        uploadedFiles.push({
          key: r2Key,
          url: `/api/images/${r2Key}`,
          name: origName,
          size: file.size,
          type: fileMime,
          storage: 'r2'
        });
      } else {
        // Fallback for local preview without R2 binding
        const arrayBuf = await file.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(arrayBuf).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const dataUrl = `data:${fileMime};base64,${base64}`;

        uploadedFiles.push({
          key: r2Key,
          url: dataUrl,
          name: origName,
          size: file.size,
          type: fileMime,
          storage: 'fallback_data_url',
          note: 'Cloudflare R2 버킷 미연결 상태로 로컬 Data URL이 생성되었습니다.'
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      count: uploadedFiles.length,
      files: uploadedFiles
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('R2 upload error:', err);
    return new Response(JSON.stringify({
      success: false,
      error: `업로드 처리 중 오류 발생: ${err.message}`
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}

function getMimeType(ext) {
  const map = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    avif: 'image/avif'
  };
  return map[ext] || 'application/octet-stream';
}

