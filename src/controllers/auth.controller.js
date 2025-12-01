const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES || '7d' }
    );
};

exports.register = async (req, res, next) => {
    try {
        const { email, password, first_name, last_name, phone_number } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'email va password majburiy' });
        }

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(409).json({ message: 'Email already in use' });

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hash,
            first_name,
            last_name,
            phone_number,
            role: 'user'
        });

        const token = generateToken(user);
        res.status(201).json({ token, user });
    } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'email va password majburiy' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        res.json({ token, user });
    } catch (e) { next(e); }
};
