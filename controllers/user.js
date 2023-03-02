const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
        });
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};
// exports.createUser = (req, res) => {
//     const user = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         age: req.body.age,
//     });
//     user.save().then((user) => {
//         res.send(user);
//     });
// };

exports.getUser = async (req, res) => {
    try {
        let user = User.findById(req.params.id).populate('todos');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        let user = await User.find().populate('todos');
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        Object.assign(user, req.body);
        const updatedUser = await user.save();
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

// OR:
// exports.updateUser = (req, res) => {
//     User.findById(req.params.id).then((user) => {
//         user.firstName = req.body.firstName;
//         user.lastName = req.body.lastName;
//         user.email = req.body.email;
//         user.password = req.body.password;
//         user.age = req.body.age;
//         user.save().then((user) => {
//             res.send(user);
//         })
//     });
// };

exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id).then(() => {
        res.send({ message: 'user deleted' });
    }).catch((err) => {
        res.status(500).send(err);
    });
};

exports.affect = async (req, res) => {
    try {
        let affetctaion = await User.findByIdAndUpdate(req.params.userId, { $push: { todos: req.params.todoId } }, { new: true });
        res.send(affetctaion);
    } catch (error) {
        res.send(err);
    }
};

exports.unaffected = async (req, res) => {
    try {
        let desaffetctaion = await User.findByIdAndUpdate(req.params.userId, { $pull: { todos: req.params.todoId } }, { new: true });
        res.send(desaffetctaion);
    } catch (error) {
        res.send(err);
    }
};
