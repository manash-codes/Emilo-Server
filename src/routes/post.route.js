const { Router } = require('express');
const { create, get, update, remove, getById } = require('../controllers/post.controller');
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/', get);
routes.get('/:id', getById);
routes.post('/', create);
routes.put('/:id', update);
routes.delete('/:id', remove);

module.exports = routes;
