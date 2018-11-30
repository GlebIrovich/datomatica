const express = require('express');
const knex = require('./knex/knex');

const routerMaxes = express.Router();
const verifyToken = require('./verifyToken');

/* eslint-disable camelcase */

routerMaxes.post('/maxes', verifyToken, async (req, res) => {
  console.log('POST: /models/maxes');

  const { user_id } = req.body;

  if (user_id) {
    const data = await knex('maxes_model')
      .select()
      .where('user_id', user_id);
    res.status(200).send({ data });
    return;
  }

  res.status(403).send({ error: 'no user_id or unauthorized' });
});

/* eslint-enable camelcase */

module.exports = {
  routerMaxes,
};
