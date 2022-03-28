const { Vote } = require('../models');

const votedata = [
  {
    user_id: 9,
    suggestion_id: 19
  },
  {
    user_id: 1,
    suggestion_id: 8
  },
  {
    user_id: 8,
    suggestion_id: 12
  },
  {
    user_id: 8,
    suggestion_id: 19
  },
  {
    user_id: 9,
    suggestion_id: 3
  },
  {
    user_id: 3,
    suggestion_id: 16
  },
  {
    user_id: 4,
    suggestion_id: 7
  },
  {
    user_id: 10,
    suggestion_id: 7
  },
  {
    user_id: 3,
    suggestion_id: 18
  },
  {
    user_id: 9,
    suggestion_id: 16
  },
  {
    user_id: 3,
    suggestion_id: 17
  },
  {
    user_id: 10,
    suggestion_id: 2
  },
  {
    user_id: 6,
    suggestion_id: 10
  },
  {
    user_id: 5,
    suggestion_id: 11
  },
  {
    user_id: 6,
    suggestion_id: 1
  },
  {
    user_id: 9,
    suggestion_id: 18
  },
  {
    user_id: 6,
    suggestion_id: 15
  },
  {
    user_id: 6,
    suggestion_id: 7
  },
  {
    user_id: 6,
    suggestion_id: 4
  },
  {
    user_id: 1,
    suggestion_id: 16
  },
  {
    user_id: 10,
    suggestion_id: 18
  },
  {
    user_id: 4,
    suggestion_id: 10
  },
  {
    user_id: 10,
    suggestion_id: 5
  },
  {
    user_id: 5,
    suggestion_id: 16
  },
  {
    user_id: 6,
    suggestion_id: 17
  },
  {
    user_id: 1,
    suggestion_id: 15
  },
  {
    user_id: 7,
    suggestion_id: 13
  },
  {
    user_id: 6,
    suggestion_id: 3
  },
  {
    user_id: 6,
    suggestion_id: 13
  },
  {
    user_id: 7,
    suggestion_id: 1
  },
  {
    user_id: 4,
    suggestion_id: 15
  },
  {
    user_id: 2,
    suggestion_id: 18
  },
  {
    user_id: 9,
    suggestion_id: 10
  },
  {
    user_id: 10,
    suggestion_id: 15
  },
  {
    user_id: 8,
    suggestion_id: 1
  },
  {
    user_id: 10,
    suggestion_id: 8
  },
  {
    user_id: 2,
    suggestion_id: 13
  },
  {
    user_id: 9,
    suggestion_id: 20
  },
  {
    user_id: 1,
    suggestion_id: 17
  },
  {
    user_id: 10,
    suggestion_id: 9
  },
  {
    user_id: 10,
    suggestion_id: 3
  },
  {
    user_id: 5,
    suggestion_id: 6
  },
  {
    user_id: 6,
    suggestion_id: 12
  },
  {
    user_id: 5,
    suggestion_id: 2
  },
  {
    user_id: 6,
    suggestion_id: 14
  },
  {
    user_id: 8,
    suggestion_id: 18
  },
  {
    user_id: 3,
    suggestion_id: 4
  }
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;
