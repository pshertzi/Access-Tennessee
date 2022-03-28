const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Suggestion, User, Rate, Comment } = require('../../models');


// GET all suggestions
router.get('/', (req, res) => {
    Suggestion.findAll({
        attributes: ['id', 'suggestion_text', 'business_id', 'created_at'],
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

router.get('/:id', (req, res) => {
    Suggestion.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'suggestion_text', 'business_id', 'created_at'],
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
    Suggestion.create({
        suggestion_text: req.body.suggestion_text,
        user_id: req.body.user_id,
        business_id: req.body.business_id
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

// PUT /api/posts/upvote
router.put('/rating', (req, res) => {
    Rate.create({
        user_id: req.body.user_id,
        suggestion_id: req.body.suggestion_id
      })
        .then(dbsuggestionData => res.json(dbsuggestionData))
        .catch(err => res.json(err));
        
});


module.exports = router