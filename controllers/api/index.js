const router = require('express').Router();

const userRoutes = require('./user-routes');
const businessRoutes = require('./business-routes');
const impairRoutes = require('./impair-routes');

router.use('/users', userRoutes);
router.use('/business', businessRoutes);
router.use('/impair', impairRoutes)

module.exports = router;