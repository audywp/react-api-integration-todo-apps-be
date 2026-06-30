require('dotenv').config();
const express = require('express');
const cors = require('cors');

const swaggerSpec = require('./swagger');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Raw OpenAPI JSON spec
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI served via CDN assets (works reliably on Vercel serverless,
// unlike swagger-ui-express's bundled static files)
app.get('/api-docs', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <title>Todo API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: '/api-docs.json',
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis],
        });
      };
    </script>
  </body>
</html>
  `);
});

// Routes
app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Todo API is running',
    docs: '/api-docs',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Only listen on a port when running locally; Vercel handles this in serverless mode
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
