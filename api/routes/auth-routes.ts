import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.ts';
import { verifyToken } from '../middleware/auth.middleware.ts';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/sign-up', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });

        const existingUser = await User.findOne({ email: newUser.email });
        if (existingUser) {
            return res.status(400).send({ message: 'User with email already exists' });
        }

        const  { username, email, isAdmin } = await newUser.save();
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ 
            token, 
            username, 
            email,
            isAdmin, 
            message: "User signed up successfully" 
        });
    }
    catch (err) {
        res.status(500).send({ errorMsg: `Error: ${err}` });
    }
});

router.post('/log-in', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: 'User with email does not exist' });
        }
        
        const foundUser = await bcrypt.compare(password, user.password);

        if (!foundUser) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).send({ 
            token,
            message: 'Successfully logged in',
            email,
            isAdmin: user.isAdmin,
            username: user.username
        });
    }
    catch (err) {
        res.status(500).send({ errorMsg: `Error: ${err}` });
    }
});

export default router;
