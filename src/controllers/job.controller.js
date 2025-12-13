const Job = require('../models/Job');

exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll({
            where: { masterId: req.user.id },
            include: [{ association: 'client', attributes: ['id', 'first_name', 'last_name', 'email'] }]
        });

        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
