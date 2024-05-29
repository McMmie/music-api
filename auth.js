//user authentication when uploading or commenting
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const User =  require('./models/user');


const router = express.Router();
const users = {};  // This should be replaced with a database in a real application

const SECRET_KEY = 'your_secret_key';

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const valid = await User.findOne({name: username})
    if (valid) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    newUser = new User({
        "name": username,
        "passphrase": hashedPassword
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json({message: 'User registered successfully', "user": savedUser})
    } catch (err) {
        res.status(400).json({message: err.message})        
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ name: username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.passphrase);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        req.session.token = token;
        res.json({ message: 'Logged in successfully', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { router, verifyToken };
