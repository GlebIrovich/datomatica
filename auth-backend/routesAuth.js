const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt-nodejs');
const uuidv4 = require('uuid/v4');
const knex = require('./knex/knex');
const verifyToken = require('./verifyToken');

const salt = bcrypt.genSaltSync(5);
const { JWT_SECRET } = process.env;

router.post('/join', async (req, res) => {
  console.log('POST: /join');
  try {
    // hash password

    const pwd = await bcrypt.hashSync(req.body.password, salt);

    const {
      email, username, name, lastName,
    } = req.body;

    // check if record exists
    const record = await knex('users')
      .select()
      .where('email', email);

    if (record.length) {
      // if user exists send error
      res.status(409).json({ error: 'User already exists' });
    } else {
      const id = uuidv4();
      // create new user and send id
      await knex('users').insert({
        password: pwd,
        id,
        last_name: lastName,
        name,
        username,
        email,
      });

      // create user in related tables
      try {
        await knex('user_tokens').insert({ user_id: id });
      } catch (err) {
        console.log('Cannot create user');
        console.log(err);
      }

      try {
        await knex('user_operation_status').insert({ user_id: id });
      } catch (err) {
        console.log('Cannot create user_operation_status record');
        console.log(err);
      }

      // add token
      // const token = jwt.sign({ id }, JWT_SECRET || 'secret', { expiresIn: '30 days' });

      res.status(201).json({ id });
    }
  } catch (e) {
    console.log(e);

    res.status(500).send();
  }
});

router.post('/login', async (req, res) => {
  console.log('POST: /login');
  try {
    const { email, password } = req.body;

    // check if record exists
    const record = await knex('users')
      .select()
      .where('email', email);
    if (record.length) {
      const hash = record[0].password;
      const {
        id, name, username, last_name: lastName,
      } = record[0];
      const isCorrect = bcrypt.compareSync(password, hash);

      if (isCorrect) {
        // renew token
        const token = jwt.sign({ id }, JWT_SECRET || 'secret', {
          expiresIn: '30 days',
        });
        const dataStore = await knex('user_tokens')
          .select()
          .where('user_id', id);

        res.status(200).json({
          id,
          name,
          lastName,
          username,
          token,
          email,
          storeUrl: (dataStore[0] && dataStore[0].url) || '',
        });
      } else {
        res.status(401).json({ error: 'Wrong password' });
      }
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  } catch (e) {
    // console.log(e);
    res.status(404).send();
  }
});

router.post('/auto-login', verifyToken, (req, res) => {
  // const id = jwt.verify(req.token, JWT_SECRET || 'secret');
  console.log('POST: /auto-login');
  jwt.verify(req.token, JWT_SECRET || 'secret', async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const data = (await knex('users')
        .column('name', 'username', 'id', 'email', { lastName: 'last_name' })
        .select()
        .where('id', authData.id))[0];
      const dataStore = await knex('user_tokens')
        .select()
        .where('user_id', authData.id);

      res.json({
        ...data,
        storeUrl: (dataStore[0] && dataStore[0].url) || '',
      });
    }
  });
});

/* eslint-disable camelcase */

router.post('/tokens', async (req, res) => {
  console.log('POST: /tokens');
  const {
    user_id, consumer_key, consumer_secret, url,
  } = req.body;

  try {
    // create record and add url
    if (url) {
      const user = await knex('user_tokens')
        .select('*')
        .where('user_id', user_id);
      if (user.length) {
        await knex('user_tokens')
          .update({ url })
          .where('user_id', user_id);
        res.status(200).send();
      } else {
        await knex('user_tokens').insert({ user_id, url });
        res.status(201).send();
      }
    } else if (consumer_key && consumer_secret) {
      // add keys
      await knex('user_tokens')
        .where('user_id', user_id)
        .update({
          consumer_key,
          consumer_secret,
        });
      res.status(200).send();
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete('/tokens', verifyToken, async (req, res) => {
  console.log('DELETE: /tokens');
  const { user_id } = req.body;

  try {
    if (user_id) {
      const user = await knex('user_tokens')
        .select('*')
        .where('user_id', user_id);
      if (user.length) {
        await knex('user_tokens')
          .update({
            url: '',
            consumer_key: '',
            consumer_secret: '',
          })
          .where('user_id', user_id);
        res.status(200).send();
      } else {
        res.status(404).send({ error: 'User not found' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;

/* eslint-enable camelcase */
