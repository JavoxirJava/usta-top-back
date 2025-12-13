const router = require('express').Router();
const ctrl = require('../controllers/job.controller');
const auth = require('../middleware/auth');

router.get('/my-jobs', auth("MASTER"), ctrl.getMyJobs);

module.exports = router;
