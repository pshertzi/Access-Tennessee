const { Business, User, Impair, Suggestion } = require('../models');
const sequelize = require('../config/connection')
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Suggestion, User, Comment, } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/', (req, res) => {
  console.log(req.session);

  // other logic...
});

router.get('/login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('/userpage');
    return;
  }
  res.render('login');
});

router.get('/userpage', (req, res) => {
  res.render('userpage');
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
})
router.get('/suggestion/:id', (req, res) => {
  Suggestion.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'suggestion_text',
      'business_id',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'suggestion_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbsuggestionData => {
      if (!dbsuggestionData) {
        res.status(404).json({ message: 'No suggestion found with this id' });
        return;
      }

      // serialize the data
      const suggestion = dbsuggestionData.get({ plain: true });

      // pass data to template
      res.render('single-suggestion', { suggestion });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;