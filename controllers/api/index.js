const router = require('express').Router();

const userRoutes = require('./user-routes');
const businessRoutes = require('./business-routes');

router.use('/users', userRoutes);
router.use('/business', businessRoutes);

module.exports = router;