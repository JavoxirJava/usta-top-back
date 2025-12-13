const router = require('express').Router();
const ctrl = require('../controllers/category.controller');
const auth = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', auth("ADMIN"), ctrl.create);
router.put('/:id', auth("ADMIN"), ctrl.update);
router.delete('/:id', auth("ADMIN"), ctrl.remove);
router.get('/active-workers', auth("USER"), ctrl.getActiveWorkers);

module.exports = router;
