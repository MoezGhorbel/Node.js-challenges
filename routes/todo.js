const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');


router.post('/create', todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodoById);
router.put('/update/:id', todoController.updateTodo);
router.delete('/delete/:id', todoController.deleteTodo);

module.exports = router;
