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

        if (!email || !password)
            return res.status(400).json({ message: 'email va password majburiy' });

        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(409).json({ message: 'Email already in use' });

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hash,
            first_name,
            last_name,
            phone_number,
            role: 'USER'
        });

        const token = generateToken(user);
        res.status(201).json({ token, user });
    } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('[auth/login] incoming request', { email });
        if (!email || !password) {
            return res.status(400).json({ message: 'email va password majburiy' });
        }

        const user = await User.findOne({ where: { email } });
        console.log('[auth/login] user lookup result', { found: !!user });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        console.log('[auth/login] password check', { ok });
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user);
        console.log('[auth/login] success', { userId: user.id });
        res.json({ token, user });
    } catch (e) { next(e); }
};

exports.init = async () => {
    const email = 'ali@gmail.com';
    const password = '123456';
    const first_name = 'Admin';
    const last_name = 'Admin';
    const phone_number = '1234567890';
    console.log('Initializing admin user...');

    const exists = await User.findOne({ where: { email } });
    if (exists) return;

    const hash = await bcrypt.hash(password, 10);

    await User.create({
        email,
        password: hash,
        first_name,
        last_name,
        phone_number,
        role: 'ADMIN'
    });
};
