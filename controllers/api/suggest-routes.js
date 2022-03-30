const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Suggestion, User, Vote, Comment } = require('../../models');


// GET all suggestions
router.get('/', (req, res) => {
    Suggestion.findAll({
        attributes: ['id',
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
    .then(dbSuggestionData => res.json(dbSuggestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.put('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  Suggestion.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
    Suggestion.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id',
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
        res.json(dbsuggestionData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
// Create suggestion (suggestion)
router.post('/', (req, res) => {
  if(req.session)
    Suggestion.create({
        suggestion_text: req.body.suggestion_text,
        user_id: req.session.user_id,
        business_id: req.session.business_id
    })
    .then(dbSuggestionData => res.json(dbSuggestionData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});
// DELETE a suggestion
router.delete('/:id', (req, res) => {
    Suggestion.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbSuggestionData => {
        if(!dbSuggestionData) {
            res.status(404).json({ message: 'No suggestion found!' })
            return;
        }
        res.json(dbSuggestionData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})




module.exports = router