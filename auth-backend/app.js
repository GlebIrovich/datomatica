const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const knex = require('./knex/knex');

const authRouter = require('./routesAuth');
const syncRouter = require('./routesSync');
const { routerMaxes } = require('./routesModels');

console.log('ENV=', process.env.NODE_ENV);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use(authRouter);
app.use('/models', routerMaxes);
app.use('/sync', syncRouter);


if (process.env.NODE_ENV !== 'test') {
  knex.migrate
    .latest()
    .then((smth) => {
      console.log(smth);

      console.log('Migrated successfully');
    })
    .finally(async () => {
      console.log('Done!');
      app.listen(PORT, (error) => {
        if (error) {
          console.log('something bad happened', error);
        }
        console.log(`listening on ${PORT}...`);
      });
    })
    .catch(() => {
      console.log('Migration failed:');
      process.exit(1);
    });
}

module.exports = app;
