const { Region } = require('../models');

exports.getAll = async (req, res, next) => {
    try {
        const regions = await Region.findAll();
        res.json(regions);
    } catch (e) { next(e); }
};

exports.getOne = async (req, res, next) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) return res.status(404).json({ message: 'Region not found' });
        res.json(region);
    } catch (e) { next(e); }
};

exports.getUsersByRegionId = async (req, res, next) => {
    try {
        const region = await Region.findByPk(req.params.id, {
            include: [{ model: User, as: 'users' }]
        });
        if (!region) return res.status(404).json({ message: 'Region not found' });
        res.json(region);
    } catch (e) { next(e); }
};


exports.create = async (req, res, next) => {
    try {
        const created = await Region.create(req.body);
        res.status(201).json(created);
    } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
    try {
        const [count, rows] = await Region.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (!count) return res.status(404).json({ message: 'Region not found' });
        res.json(rows[0]);
    } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
    try {
        const count = await Region.destroy({ where: { id: req.params.id } });
        if (!count) return res.status(404).json({ message: 'Region not found' });
        res.json({ message: 'Region deleted' });
    } catch (e) { next(e); }
};
