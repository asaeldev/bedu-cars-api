const router = require('express').Router();
const carsController = new CarsController();
const CarsController = require('../controllers/cars.controller');

router.get('/', carsController.all);
router.get('/:id', carsController.findOne);
router.post('/', carsController.create);
router.patch('/:id', carsController.update);
router.delete('/:id', carsController.delete);

module.exports = router;