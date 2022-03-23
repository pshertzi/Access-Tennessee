const router = require('express').Router();
const { Impair } = require('../../models');
const { route } = require('./user-routes');

// GET all impairments
router.get('/', (req, res) => {
    Impair.findAll()
    .then(dbImpairData => res.json(dbImpairData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;