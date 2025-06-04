const { Router } = require('express');
const authRoutes = require('./auth.route');
const postRoutes = require('./post.route');

const routes = new Router();

// Add routes
routes.use("/auth", authRoutes)
routes.use("/post", postRoutes)

module.exports = routes;
