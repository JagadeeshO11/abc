require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fileUpload = require('express-fileupload');
const path = require('path');
const errorHandler = require('./middleware/error');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Security Middleware
app.use(helmet());

// Robust CORS configuration
// The browser sends the Origin header WITHOUT a trailing slash.
// We normalize both sides to prevent footgun mismatches.
const normalizeOrigin = (url) => {
    if (!url) return url;
    return String(url).trim().replace(/\/+$/, '').toLowerCase();
};

// Known production domains (regex patterns)
const ORIGIN_PATTERNS = [
    /^https?:\/\/(www\.)?itbeesglobal\.com$/i,
    /^https?:\/\/(www\.)?it-bees-global\.com$/i,
    /^https?:\/\/it-bees-be\.vercel\.app$/i,
    /^https?:\/\/localhost$/i,
];

const allowedExactOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5000',
]
    .filter(Boolean)
    .map(normalizeOrigin);

const isOriginAllowed = (rawOrigin) => {
    if (!rawOrigin) return true;
    const origin = normalizeOrigin(rawOrigin);
    if (allowedExactOrigins.includes(origin)) return true;
    if (ORIGIN_PATTERNS.some((re) => re.test(origin))) return true;
    return false;
};

const corsMiddleware = cors({
    origin: (origin, callback) => {
        if (isOriginAllowed(origin)) return callback(null, true);
        console.warn(`[CORS] Blocked request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
});

// Apply CORS globally
app.use(corsMiddleware);

// Handle preflight for all routes
app.options('*', corsMiddleware);

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Uploads
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true
}));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;