const { Router } = require('express');
const authRoutes = require('./auth.route');
const postRoutes = require('./post.route');
const authMiddleware = require('../middlewares/auth.middleware');

const routes = new Router();

// Add routes
routes.use("/auth", authRoutes)
routes.use("/post", authMiddleware, postRoutes)

module.exports = routes;
