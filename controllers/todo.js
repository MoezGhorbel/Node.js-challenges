const Todo = require('../models/todo');

const createTodo = (req, res) => {
    const todo = new Todo({
        name: req.body.name,
        description: req.body.description
    });
    todo.save()
        .then(() => {
            res.send(todo);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

const getTodos = (req, res) => {
    Todo.find()
        .then(todos => {
            res.send(todos);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

const getTodoById = (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send('Todo not found');
            }
            res.send(todo);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

const updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    }, { new: true })
        .then(todo => {
            if (!todo) {
                return res.status(404).send('Todo not found');
            }
            res.send(todo);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

const deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
        .then(todo => {
            if (!todo) {
                return res.status(404).send('Todo not found');
            }
            res.send(todo);
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
