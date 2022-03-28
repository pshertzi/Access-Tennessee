const router = require('express').Router();

const userRoutes = require('./user-routes');
const businessRoutes = require('./business-routes');
const impairRoutes = require('./impair-routes');
const suggestRoutes = require('./suggest-routes');
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/business', businessRoutes);
router.use('/impair', impairRoutes);
router.use('/suggestion', suggestRoutes);
router.use('/comments', commentRoutes);

module.exports = router;