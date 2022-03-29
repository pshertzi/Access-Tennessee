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
  if(req.session.b_loggedIn) {
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
     'description'
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
      console.log('=======================');
      console.log(data);
      res.render('userpage',  data );
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
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

  res.render('post', { Suggestion });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

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

router.get('/business', (req, res) => {
  Business.findAll({
    attributes: [
      'id',
      'b_name',
      'b_email',
      'b_description',
      'logo_url',
      'b_username'
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
module.exports = router;