const router = require('express').Router();
const salesController = new SalesController();
const SalesController = require('../controllers/sales.controller');

router.get('/', salesController.all);
router.get('/:id', salesController.findOne);
router.post('/', salesController.create);
router.patch('/:id', salesController.updateStatus);
router.delete('/:id', salesController.delete);

module.exports = router;