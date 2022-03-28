const { Business, User, Impair, Suggestion } = require('../models');
const sequelize = require('../config/connection')
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/business', (req, res) => {
  Business.findAll({
    attributes: [
      'id',
      'b_name',
      'b_email',
      'b_description'
    ],
    include: [
      {
        model: Impair,
        attributes: ['impairment']
      },
      {
        model: Suggestion,
        attributes: ['suggestion_text'],
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
    const businesses = dbBusinessData.map(business => business.get({ plain: true }));
    res.render('business', { businesses });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/users',(req, res) => {
  User.findAll({
    attributes: [
      'id',
      'username',
      'email',
      'description',
      'picture_url'
    ],
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
            model: Business,
            attributes: ['b_name']
          }
        ]
      }
    ]
  })
  .then(dbUserData => {
    const users = dbUserData.map(user => user.get({ plain: true }));

    res.render('individual', { users });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;