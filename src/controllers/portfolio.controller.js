const { Portfolio } = require('../models');

exports.getAll = async (req, res, next) => {
    try {
        const items = await Portfolio.findAll();
        res.json(items);
    } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
    try {
        const item = await Portfolio.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Portfolio not found' });
        res.json(item);
    } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
    try {
        const created = await Portfolio.create(req.body);
        res.status(201).json(created);
    } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
    try {
        const [count, rows] = await Portfolio.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (!count) return res.status(404).json({ message: 'Portfolio not found' });
        res.json(rows[0]);
    } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
    try {
        const count = await Portfolio.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ message: 'Portfolio not found' });
        res.json({ message: 'Portfolio deleted' });
    } catch (e) { next(e); }
};
