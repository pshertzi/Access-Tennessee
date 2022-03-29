const router = require('express').Router();
const sequelize = require('../config/connection');
const { Suggestion, User, Comment, Business, Impair } = require('../models');

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

router.get('/b-login', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('/business');
    return;
  }
  res.render('blogin');
})

router.get('/userpage', (req, res) => {
  User.findAll({
    attributes: [
      'id',
      'first_name',
      'last_name',
     'email',
     'description',
     'username',
     'impairment',
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
    .then(dbuserData => {
      const users = dbuserData.map(User => User.get({ plain: true }));
      const data = {
        users
      }
      res.render('userpage',  data );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/suggestion/:id', (req, res) => {
  const post = {
    id: 1,
    post_url: 'https://handlebarsjs.com/guide/',
    title: 'Handlebars Docs',
    created_at: new Date(),
    vote_count: 10,
    comments: [{}, {}],
    user: {
      username: 'test_user'
    }
  };

  res.render('single-suggestion', { post });
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
    // console.log(typeof businesses)
    const data = {
      businesses
    }
    res.render('business', data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
router.get('/userpage', (req, res) => {
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
    // console.log(typeof businesses)
    const data = {
      businesses
    }
    res.render('userpage', data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
module.exports = router;