const { Router } = require('express');
const { login, register, logout } = require('../controllers/auth.controller');
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.post('/login', login);
routes.post('/register', register);
routes.get('/logout', logout);


module.exports = routes;