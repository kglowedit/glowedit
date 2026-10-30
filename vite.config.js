import { resolve } from 'path';
import { defineConfig } from 'vite';
import crypto from 'crypto';

// In-memory / local fallback store for local development preview
const devImageStore = new Map();

function devR2MockPlugin() {
  return {
    name: 'dev-r2-mock',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Handle POST /api/upload in local dev
        if (req.method === 'POST' && req.url === '/api/upload') {
          const contentType = req.headers['content-type'] || '';
          if (!contentType.includes('multipart/form-data')) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Expected multipart/form-data' }));
          }

          const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
          if (!boundaryMatch) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, error: 'Invalid boundary' }));
          }
          const boundary = boundaryMatch[1] || boundaryMatch[2];

          const chunks = [];
          req.on('data', chunk => chunks.push(chunk));
          req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const boundaryBuffer = Buffer.from(`--${boundary}`);
            const uploadedFiles = [];
            const today = new Date().toISOString().slice(0, 10);

            // Simple multipart boundary splitter
            let start = 0;
            while (start < buffer.length) {
              const bIndex = buffer.indexOf(boundaryBuffer, start);
              if (bIndex === -1) break;

              const nextBIndex = buffer.indexOf(boundaryBuffer, bIndex + boundaryBuffer.length);
              if (nextBIndex === -1) break;

              const part = buffer.subarray(bIndex + boundaryBuffer.length, nextBIndex);
              const headerEndIndex = part.indexOf('\r\n\r\n');
              if (headerEndIndex !== -1) {
                const headerText = part.subarray(0, headerEndIndex).toString('utf-8');
                let fileData = part.subarray(headerEndIndex + 4);
                if (fileData.slice(-2).toString() === '\r\n') {
                  fileData = fileData.slice(0, -2);
                }

                const filenameMatch = headerText.match(/filename="([^"]+)"/);
                if (filenameMatch && fileData.length > 0) {
                  const origName = filenameMatch[1];
                  const ext = origName.includes('.') ? origName.split('.').pop().toLowerCase() : 'jpg';
                  const mimeMatch = headerText.match(/Content-Type:\s*([^\r\n]+)/i);
                  const mimeType = mimeMatch ? mimeMatch[1].trim() : 'image/jpeg';
                  const safeRandom = crypto.randomBytes(6).toString('hex');
                  const r2Key = `articles/${today}/${safeRandom}_${origName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

                  devImageStore.set(r2Key, {
                    buffer: fileData,
                    mimeType,
                    name: origName,
                    size: fileData.length
                  });

                  uploadedFiles.push({
                    key: r2Key,
                    url: `/api/images/${r2Key}`,
                    name: origName,
                    size: fileData.length,
                    type: mimeType,
                    storage: 'r2_dev_emulated'
                  });
                }
              }
              start = nextBIndex;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: true,
              count: uploadedFiles.length,
              files: uploadedFiles,
              devMode: true
            }));
          });
          return;
        }

        // Handle GET / HEAD /api/images/* in local dev
        if ((req.method === 'GET' || req.method === 'HEAD') && req.url.startsWith('/api/images/')) {
          const key = decodeURIComponent(req.url.replace(/^\/api\/images\//, '').split('?')[0]);
          const item = devImageStore.get(key);
          if (item) {
            res.statusCode = 200;
            res.setHeader('Content-Type', item.mimeType);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            res.setHeader('Content-Length', item.buffer.length);
            if (req.method === 'HEAD') {
              return res.end();
            }
            return res.end(item.buffer);
          } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            return res.end('Image not found in local dev store');
          }
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [devR2MockPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        article: resolve(__dirname, 'article.html'),
        community: resolve(__dirname, 'community.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  },
  server: {
    port: 3000
  }
});
