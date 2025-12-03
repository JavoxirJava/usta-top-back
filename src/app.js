const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("🟩 Incoming:", {
        method: req.method,
        url: req.originalUrl,
        body: req.body
    });
    next();
});

app.use((req, res, next) => {
    console.log(`[REQ] ${req.method} ${req.url}`);
    next();
});
app.use((err, req, res, next) => {
    console.error("[ERROR MIDDLEWARE]", err);
    next(err);
});


app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/regions', require('./routes/region.routes'));
app.use('/api/categories', require('./routes/category.routes'));
app.use('/api/user-infos', require('./routes/userInfo.routes'));
app.use('/api/portfolios', require('./routes/portfolio.routes'));
app.use('/api/portfolio-images', require('./routes/portfolioImage.routes'));
app.use('/api/comments', require('./routes/comment.routes'));

// 404
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;
