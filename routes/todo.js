const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');


router.post('/create', passport.authenticate('bearer', { session: false }), todoController.createTodo);
router.get('/', passport.authenticate('bearer', { session: false }), todoController.getTodos);
router.get('/:id', passport.authenticate('bearer', { session: false }), todoController.getTodoById);
router.put('/update/:id', passport.authenticate('bearer', { session: false }), todoController.updateTodo);
router.delete('/delete/:id', passport.authenticate('bearer', { session: false }), todoController.deleteTodo);

module.exports = router;
