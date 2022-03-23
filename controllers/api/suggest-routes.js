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

module.exports = router