const router = require('express').Router();
const sequelize = require('../config/connection');
const { Suggestion, User, Comment, Vote } = require('../models');

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
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE suggestion.id = vote.suggestion_id)'), 'vote_count']
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