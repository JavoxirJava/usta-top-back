const router = require('express').Router();
const ctrl = require('../controllers/portfolio.controller');

router.get('/', ctrl.getAll);
router.get('/full-info', ctrl.getAllFullInfo);
router.get('/:id', ctrl.getOne);
router.get('/:id/full-info', ctrl.getOneFullInfo);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
