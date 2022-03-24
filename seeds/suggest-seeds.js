const { Suggestion } = require('../models');

const suggestionData = [
    {
        user_id: 1,
        business_id: 2,
        suggestion_text: 'Fooduro was amazing, but not very accommodating for those with a hearing impairment. I think some training for staff on what actions to take for guest with a hearing impairment might be helpful for the future.'
    },
    {
        user_id: 2,
        business_id: 3,
        suggestion_text: 'I loved TuneKey! They had my favorite record in stock! However, they could use more braille signage for music genres.'
    },
    {
        user_id: 3,
        business_id: 1,
        suggestion_text: 'Exhibor is my new favorite place! They have ramps in all the right spots. Keep up the good work guys!'
    },
    {
        user_id: 4,
        business_id: 4,
        suggestion_text: 'Choconut has the best chocolate every, but the staff could use some sensitivity training!'
    },
    {
        user_id: 6,
        business_id: 5,
        suggestion_text: 'Major thrill was exactly that, although it might be helpful to have seating areas in some of the lines for rides. It would really help out those with medical impairments!'
    },
    {
        user_id: 5,
        business_id: 6,
        suggestion_text: 'Athletic.ly was very accommodating for my son who has a cognitive disability. The staff slowly explained the purpose of the gear he wanted and made sure they were always on the same page. Great job guys!'
    },
    {
        user_id: 7,
        business_id: 7,
        suggestion_text: 'Life Time Gallery was amazing and very busy. It may be helpful to add a quiet room for those of us who have a hard time with loud noises or large crowds.'
    }
]

const seedSuggestion = () => Suggestion.bulkCreate(suggestionData);

module.exports = seedSuggestion