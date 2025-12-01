const { Comment } = require('../models');

exports.getAll = async (req, res, next) => {
    try {
        const items = await Comment.findAll();
        res.json(items);
    } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
    try {
        const item = await Comment.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Comment not found' });
        res.json(item);
    } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
    try {
        const created = await Comment.create(req.body);
        res.status(201).json(created);
    } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
    try {
        const [count, rows] = await Comment.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (!count) return res.status(404).json({ message: 'Comment not found' });
        res.json(rows[0]);
    } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
    try {
        const count = await Comment.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ message: 'Comment not found' });
        res.json({ message: 'Comment deleted' });
    } catch (e) { next(e); }
};
