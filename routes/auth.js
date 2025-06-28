const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate.js');


router.post('/signup', async (req, res, next) => {
    try {

        const { email, password, role } = req.body;

        // Check if email or password are provided as empty string 
        if (!email || !password) {
            res.status(400).json({ message: "Please provide email and password." });
            return;
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate the password format
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must have at least 6 characters, include one uppercase, one lowercase, and one number.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            passwordHash: hashedPassword,
            role // Assuming role is part of the user model
        }); 

        await newUser.save();

        res.status(201).json({ 
            message: 'User created successfully', 
            user: { email: newUser.email, role: newUser.role } 
        });
    } catch (error) {
        next(error);
    }
});


// User login route
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email or password are provided as empty string 
        if (!email || !password) {
            res.status(400).json({ message: "Please provide email and password." });
            return;
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }   

        // Generate a JWT token and add token expiration
        const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { algorithm: 'HS256', expiresIn: '1d' }
        );
        res.status(200).json({ 
            message: 'Login successful', token, user: { email: user.email, role: user.role } });

    } catch (error) {
        next(error);
    }
});


// Verify JWT token middleware
router.get('/verify', (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        // Check if token is provided
        // Token format: "Bearer <token>"
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            res.status(200).json({ message: 'Token is valid', userId: decoded.userId });
        });
    } catch (error) {
        next(error);
    }
    });

    router.get('/me', authenticate, (req, res) => {
    // This route is protected by the authenticate middleware
    res.status(200).json({ user: req.user });
    
});

module.exports = router;