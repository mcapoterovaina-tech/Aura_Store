
const express = require('express');
const router = express.Router();
const { apps, collections, spotlight, news, footerLinks, staticPages } = require('../data/mockData');

// --- Catalog & Apps ---

// GET /catalogo - Get all apps
router.get('/catalogo', (req, res) => {
    res.json(apps);
});

// GET /apps - Filter/Search apps
router.get('/apps', (req, res) => {
    const { category, q } = req.query;
    let results = [...apps];

    if (category) {
        results = results.filter(app => app.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
        const query = q.toLowerCase();
        results = results.filter(app =>
            app.name.toLowerCase().includes(query) ||
            app.description.toLowerCase().includes(query)
        );
    }

    res.json(results);
});

// GET /apps/search - Explicit search endpoint (alias for /apps?q=...)
router.get('/apps/search', (req, res) => {
    const { q } = req.query;
    if (!q) return res.json([]);

    const query = q.toLowerCase();
    const results = apps.filter(app =>
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)
    );
    res.json(results);
});

// GET /apps/:id - Get single app
router.get('/apps/:id', (req, res) => {
    const app = apps.find(a => a.id === req.params.id);
    if (app) {
        res.json(app);
    } else {
        res.status(404).json({ error: 'App not found' });
    }
});

// --- Collections ---

// GET /collections - Home page collections
router.get('/collections', (req, res) => {
    res.json(collections);
});

// GET /collections/spotlight - Spotlight banner
router.get('/collections/spotlight', (req, res) => {
    res.json(spotlight);
});

// GET /collections/:id/apps - Apps for a specific collection
router.get('/collections/:id/apps', (req, res) => {
    const { id } = req.params;
    let results = [];

    // Simple logic to map collection IDs to mock data filters
    if (id === 'featured') {
        results = apps.filter(a => a.rating >= 4.5);
    } else if (id === 'top-free') {
        results = apps.filter(a => a.price === 0);
    } else if (id === 'editors-choice') {
        results = apps.filter(a => a.rating >= 4.8);
    } else {
        // Fallback: return random apps
        results = apps.slice(0, 3);
    }

    res.json(results);
});

// --- News ---

// GET /news - Get news posts
router.get('/news', (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    // Mock pagination
    res.json(news);
});

// POST /news/:id/like
router.post('/news/:id/like', (req, res) => {
    console.log(`[Mock] Liked news ${req.params.id} by user ${req.body.likedBy}`);
    res.json({ success: true });
});

// POST /news/:id/comment
router.post('/news/:id/comment', (req, res) => {
    console.log(`[Mock] Comment on news ${req.params.id}:`, req.body);
    res.json({ success: true });
});

// --- Footer ---

// GET /footer
router.get('/footer', (req, res) => {
    res.json(footerLinks);
});

// --- Static Pages ---

// GET /pages/:slug
router.get('/pages/:slug', (req, res) => {
    const page = staticPages[req.params.slug];
    if (page) {
        res.json(page);
    } else {
        res.status(404).json({ error: 'Page not found' });
    }
});

// --- Cart & Checkout ---

// POST /checkout
router.post('/checkout', (req, res) => {
    console.log('[Mock] Checkout:', req.body);
    res.json({ success: true, orderId: 'ord-' + Date.now() });
});

// POST /subscriptions/subscribe
router.post('/subscriptions/subscribe', (req, res) => {
    console.log('[Mock] Subscribe:', req.body);
    res.json({ success: true, subId: 'sub-' + Date.now() });
});

// --- Tax ---

// POST /tax/calculate
router.post('/tax/calculate', (req, res) => {
    const { subtotal } = req.body;
    const rate = 0.08; // 8% tax
    const amount = subtotal * rate;
    res.json({
        rate,
        amount,
        currency: 'USD'
    });
});

// --- Auth ---

// POST /auth/refresh
router.post('/auth/refresh', (req, res) => {
    // Mock refresh: always return a new token
    res.json({
        accessToken: 'mock-access-token-' + Date.now()
    });
});

module.exports = router;
