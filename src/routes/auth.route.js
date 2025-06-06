const { Router } = require('express');
const { login, register, logout } = require('../controllers/auth.controller');
const { userLoginSchema, userRegisterSchema } = require('../schema/user');
const validateRequest = require('../middlewares/validate.middleware');

const routes = new Router();

// Add routes
routes.post('/login', userLoginSchema, validateRequest, login);
routes.post('/register', userRegisterSchema, validateRequest, register);
routes.get('/logout', logout);


module.exports = routes;