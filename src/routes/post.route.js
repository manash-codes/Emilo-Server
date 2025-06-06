const { Router } = require('express');
const { create, get, update, remove, getById } = require('../controllers/post.controller');
const { postQuerySchema, postParamSchema, postCreateSchema } = require('../schema/post');
const validateRequest = require('../middlewares/validate.middleware');

const routes = new Router();

// Add routes
routes.get('/', postQuerySchema, validateRequest, get);
routes.get('/:id', postParamSchema, validateRequest, getById);
routes.post('/', postCreateSchema, validateRequest, create);
routes.put('/:id', postParamSchema, validateRequest, update);
routes.delete('/:id', postParamSchema, validateRequest, remove);

module.exports = routes;
