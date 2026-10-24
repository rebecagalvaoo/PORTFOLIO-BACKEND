const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use('/api', require('../routers'));

// Test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio Backend API is running!'
    });
});

// Handle routes that do not exist
app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
});

// Global error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
