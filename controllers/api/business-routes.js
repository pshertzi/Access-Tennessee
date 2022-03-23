const router = require('express').Router();
const req = require('express/lib/request');
const { Business, Impair } = require('../../models');

// GET all businesses
router.get('/', (req, res) => {
    Business.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbBusinessData => res.json(dbBusinessData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// GET a single business
router.get('/:id', (req, res) => {
    Business.findOne({
        attributes: { exclude: ['b_password'] },
        where: {
            id: req.params.id
        }
    })
    .then(dbBusinessData => {
        if(!dbBusinessData) {
            res.status(404).json({ message: 'Business does not exist!' })
            return;
        }
        res.json(dbBusinessData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Create a business (POST)
router.post('/', (req, res) => {
    Business.create({
        b_username: req.body.b_username,
        b_name: req.body.b_name,
        b_email: req.body.b_email,
        b_password: req.body.b_password,
        b_description: req.body.b_description
    })
    .then(dbBusinessData => res.json(dbBusinessData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Login route

// Update business info (PUT)
router.put('/:id', (req, res) => {
    Business.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbBusinessData => {
        if(!dbBusinessData[0]) {
            res.status(404).json({ message: 'No business found!' })
            return;
        }
        res.json(dbBusinessData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// DELETE business
router.delete('/:id', (req, res) => {
    Business.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBusinessData => {
        if(!dbBusinessData) {
            res.status(404).json({ message: 'No business found!' })
            return;
        }
        res.json(dbBusinessData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;