const { Category } = require('../models');
exports.getActiveWorkers = async (req, res) => {
    try {
        const count = await Category.countDocuments();
        res.json({ activeWorkers: count });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
    try {
        const created = await Category.create(req.body);
        res.status(201).json(created);
    } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
    try {
        const [count, rows] = await Category.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (!count) return res.status(404).json({ message: 'Category not found' });
        res.json(rows[0]);
    } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
    try {
        const count = await Category.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (e) { next(e); }
};
