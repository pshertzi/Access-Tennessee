const { Impair } = require('../models');

const impairData = [
    {
        impairment: 'Hearing Impairment'
    },
    {
        impairment: 'Vision Impairment'
    },
    {
        impairment: 'Mobility Impairment'
    },
    {
        impairment: 'Neurological Impairment'
    },
    {
        impairment: 'Cognitive Impairment'
    },
    {
        impairment: 'Medical'
    },
    {
        impairment: 'Psychological'
    }
]

const seedImpair = () => Impair.bulkCreate(impairData);

module.exports = seedImpair;