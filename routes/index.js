const router = require('express').Router();
const cars = require('./cars.route');
const sales = require('./sales.route')
const user = user('./user.route')

router.get('/', (req, res) => {
    res.json({ 'info': 'Welcome to BEDU-CARS API' })
});

router.use('/cars.route', cars);
router.use('/sales.route', sales);
router.use('/user.route', user);


module.exports = router;