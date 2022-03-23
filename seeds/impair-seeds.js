const { Impair } = require('../models');

const impairData = [
    {
        impairment: 'Hearing Impairment',
        user_id: 1
    },
    {
        impairment: 'Vision Impairment',
        user_id: 2
    },
    {
        impairment: 'Mobility Impairment',
        user_id: 3
    },
    {
        impairment: 'Neurological Impairment',
        user_id: 4
    },
    {
        impairment: 'Cognitive Impairment',
        user_id: 5
    },
    {
        impairment: 'Medical',
        user_id: 6
    },
    {
        impairment: 'Psychological',
        user_id: 7
    }
]

const seedImpair = () => Impair.bulkCreate(impairData);

module.exports = seedImpair;