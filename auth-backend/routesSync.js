const express = require('express');
const fetch = require('node-fetch');
const configs = require('./configs');

const routersSync = express.Router();
const verifyToken = require('./verifyToken');

/* eslint-disable camelcase */

routersSync.post('/', verifyToken, async (req, res) => {
  console.log('POST: /sync/');
  const { user_id } = req.body;
  try {
    const response = await fetch(`${configs.fetcherURL}sync`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    });
    console.log('Fetcher replied with status: ', response.status);

    res.status(response.status).send();
  } catch (error) {
    console.log(error);

    res.status(500).send();
  }
});

/* eslint-enable camelcase */

module.exports = routersSync;
