const router = require('express').Router();
const { Suggestion } = require('../../models');


// GET all suggestions
router.get('/', (req, res) => {
    Suggestion.findAll()
    .then(dbSuggestionData => res.json(dbSuggestionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
// Create suggestion (POST)
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

module.exports = router