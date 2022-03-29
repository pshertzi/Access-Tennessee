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
  Suggestion.findAll({
    attributes: [
      'id',
      'suggestion_text',
      'business_id',
     'created_at'
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
      const suggestions = dbsuggestionData.map(suggestion => suggestion.get({ plain: true }));
      res.render('userpage', { suggestions });
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

module.exports = router;