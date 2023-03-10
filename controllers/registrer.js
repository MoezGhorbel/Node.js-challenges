const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        todos: req.body.todos,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already used" });
        }
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
};