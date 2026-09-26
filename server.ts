import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Support large payload for photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API to get list of uploaded photos in /public
app.get('/api/photos', (_req, res) => {
  try {
    const files = fs.readdirSync(publicDir);
    const photoMap: Record<string, string> = {};
    files.forEach((file) => {
      // Check if file is image
      if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
        photoMap[file] = `/${file}?v=${Date.now()}`;
      }
    });
    res.json({ success: true, photos: photoMap });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// API to upload and save photo permanently to /public
app.post('/api/upload', (req, res) => {
  try {
    const { filename, dataUrl } = req.body;
    if (!filename || !dataUrl) {
      res.status(400).json({ success: false, error: 'Missing filename or dataUrl' });
      return;
    }

    // Extract base64
    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const filePath = path.join(publicDir, filename);
    fs.writeFileSync(filePath, buffer);

    res.json({ success: true, url: `/${filename}?v=${Date.now()}` });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Serve static files from public
app.use(express.static(publicDir));

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // In production, serve dist folder
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In development, mount Vite middlewares
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
