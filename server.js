const express = require('express');
const path = require('path');
const mime = require('mime-types');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to set correct MIME types
app.use((req, res, next) => {
    const ext = path.extname(req.path);
    const mimeType = mime.lookup(ext);
    
    if (mimeType) {
        res.type(mimeType);
    }
    next();
});

// Serve static files with correct MIME types
app.use('/sites/css_configs', express.static(path.join(__dirname, 'sites/css_configs'), {
    setHeaders: (res, filePath) => {
        res.type('text/css');
    }
}));

app.use('/public', express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath);
        if (ext === '.css') {
            res.type('text/css');
        } else if (ext === '.js') {
            res.type('application/javascript');
        }
    }
}));

app.use('/attacks', express.static(path.join(__dirname, 'attacks'), {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath);
        if (ext === '.js') {
            res.type('application/javascript');
        }
    }
}));

// Serve sites template directory
app.use('/sites/template', express.static(path.join(__dirname, 'sites/template'), {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath);
        if (ext === '.html') {
            res.type('text/html');
        }
    }
}));

// Serve index.html for template site routes
app.get('/sites/template', (req, res) => {
    res.sendFile(path.join(__dirname, 'sites/template/index.html'));
});

// Serve template site index.html for any /sites/template/* route
app.get('/sites/template/*', (req, res) => {
    // Special handling for product-detail.html to ensure it's served correctly
    if (req.path.includes('product-detail.html')) {
        res.sendFile(path.join(__dirname, 'sites/template/product-detail.html'));
    } else {
        res.sendFile(path.join(__dirname, 'sites/template/index.html'));
    }
});

// Update API routes to handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Use routers
const scamsRouter = require('./server/routes/scams');
const productsRouter = require('./server/routes/products');
const cartRouter = require('./server/routes/cart');
const checkoutRouter = require('./server/routes/checkout');

app.use('/api/scams', scamsRouter);
app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/api', checkoutRouter);

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
