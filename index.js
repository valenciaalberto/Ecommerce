import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// API routes
app.post('/api/advisor', (req, res) => {
  const { query } = req.body || {};
  res.json({
    reply: `Based on your request regarding "${query || 'electronics'}", I recommend checking out:\n\n1. MacBook Pro 16" M3 Max ($3,499) - Elite processing power and 22-hour battery life.\n2. Sony WH-1000XM5 ($398) - Top-rated noise canceling audio.\n3. Samsung Galaxy S24 Ultra ($1,299) - Powerful mobile AI and 200MP camera system.`
  });
});

// Serve static assets from /dist
app.use(express.static(path.join(__dirname, 'dist')));

// SPA routing support with Express 5 *all syntax
app.get('*all', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TechVault Electronics server running on port ${PORT}`);
});
