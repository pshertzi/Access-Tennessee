const router = require('express').Router();
const req = require('express/lib/request');
const { Business, Impair, Suggestion, User } = require('../../models');

// GET all businesses
router.get('/', (req, res) => {
    Business.findAll({
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Impair,
                attributes: ['impairment']
            },
            {
                model: Suggestion,
                attributes: ['suggestion_text', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            },
            {
                model: Suggestion,
                attributes: ['suggestion_text'],
                through: Vote,
                as: 'voted_suggestions'
            }
        ]
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
        },
        include: [
            {
                model: Impair,
                attributes: ['impairment']
            },
            {
                model: Suggestion,
                attributes: ['suggestion_text', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
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
        b_description: req.body.b_description,
        impairment: req.body.impairment,
        accommodations: req.body.accommodations,
        suggestion_text: req.body.suggestion_text
    })
    .then(dbBusinessData => res.json(dbBusinessData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// Login route
router.post('/b-login', (req, res) => {
    Business.findOne({
        where: {
            b_email: req.body.b_email
        }
    })
    .then(dbBusinessData => {
        if (!dbBusinessData) {
            res.status(400).json({ message: 'No business found!' });
            return;
        }
        // Verify user
        const validPassword = dbBusinessData.checkPassword(req.body.b_password);
        
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            // declare session variables
            req.session.business_id = dbBusinessData.id;
            req.session.b_username = dbBusinessData.b_username;
            req.session.b_loggedIn = true;
            res.json({ user: dbBusinessData, message: 'You are now logged in!' });
        });
    });
});
//log out
router.post('/blogout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});
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