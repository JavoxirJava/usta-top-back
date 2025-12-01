const { User } = require('../models');

exports.getAll = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) { next(e); }
};

exports.getAllFullInfo = async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: [
                { model: Region, as: 'region', attributes: ['id', 'name'] },
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: ['id', 'price'] } // UserInfo
                },
                {
                    model: Portfolio,
                    as: 'portfolios'
                }
            ]
        });
        res.json(users);
    } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (e) { next(e); }
};

exports.getOneFullInfo = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [
                { model: Region, as: 'region', attributes: ['id', 'name'] },
                {
                    model: Category,
                    as: 'categories',
                    through: { attributes: ['id', 'price'] }
                },
                {
                    model: Portfolio,
                    as: 'portfolios'
                }
            ]
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
    try {
        const created = await User.create(req.body);
        res.status(201).json(created);
    } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
    try {
        const [count, rows] = await User.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (!count) return res.status(404).json({ message: 'User not found' });
        res.json(rows[0]);
    } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
    try {
        const count = await User.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (e) { next(e); }
};
