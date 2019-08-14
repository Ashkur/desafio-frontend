const express = require('express');
const TodoController = require('./controllers/TodoController');

const routes = express.Router();

routes.delete('/todos/:_id', TodoController.deleteOne);
routes.delete('/todos', TodoController.delete);
routes.get('/todos', TodoController.index);
routes.post('/todos', TodoController.store);

module.exports = routes;