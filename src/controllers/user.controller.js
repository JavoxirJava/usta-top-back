const { User } = require('../models');
const Job = require('../models/Job');
const Category = require('../models/Category');
const { Op } = require('sequelize');
exports.getDashboardStats = async (req, res) => {
    try {
        const role = req.user.role; // token orqali
        let stats = {};
        let weeklyData = [];
        let weeklyActive = [];

        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 6); // past 7 days

        if (role === "MASTER") {
            const totalClients = await User.count({ where: { role: "USER" } });
            const activeJobs = await Job.count({ where: { masterId: req.user.id, status: "active" } });

            stats = { totalClients, activeJobs };

            // weekly chart
            for (let i = 6; i >= 0; i--) {
                const day = new Date();
                day.setDate(today.getDate() - i);
                const dayStart = new Date(day.setHours(0, 0, 0, 0));
                const dayEnd = new Date(day.setHours(23, 59, 59, 999));

                const dailyClients = await Job.count({
                    where: {
                        masterId: req.user.id,
                        createdAt: { [Op.between]: [dayStart, dayEnd] }
                    }
                });

                const dailyActiveJobs = await Job.count({
                    where: { masterId: req.user.id, status: "active" }
                });

                weeklyData.push({ name: day.toLocaleDateString('en-US', { weekday: 'short' }), clients: dailyClients });
                weeklyActive.push({ name: day.toLocaleDateString('en-US', { weekday: 'short' }), jobs: dailyActiveJobs });
            }

        } else if (role === "USER") {
            const totalMasters = await User.count({ where: { role: "MASTER" } });
            const activeWorkers = await Category.count();

            stats = { totalMasters, activeWorkers };

            // weekly chart
            for (let i = 6; i >= 0; i--) {
                const day = new Date();
                day.setDate(today.getDate() - i);

                const dailyMasters = await User.count({ where: { role: "MASTER" } });
                const dailyActiveWorkers = await Category.count();

                weeklyData.push({ name: day.toLocaleDateString('en-US', { weekday: 'short' }), masters: dailyMasters });
                weeklyActive.push({ name: day.toLocaleDateString('en-US', { weekday: 'short' }), workers: dailyActiveWorkers });
            }
        }

        res.json({ stats, weeklyData, weeklyActive });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



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
