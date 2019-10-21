import express from 'express';
import sqlite from 'sqlite';
import { Transaction } from 'money-tracker';

console.log("Starting...");

const app = express();
const port = 3000; // TODO: allow environment variable to override

app.use(express.json());

/*
 * Get a collection of transactions.
 */
app.get('/transactions', async (req, res) => {
  // TODO: start and end query string variables for date restriction with defaults to the last month
  let result = await sqlite.all('SELECT id, date, amount, description, category FROM transactions');
  let transactions = result.map(x => new Transaction(x));
  res.send(transactions);
});

/*
 * Bulk load transactions into persistent store.
  { transactions: [ { Transaction } ] }
 */
app.post('/transactions/bulk', async (req, res) => {
  if (req.body.transactions === undefined) {
    res.status(400).end();
    return;
  }
  
  let queryPromises = [];
  queryPromises.push(req.body.transactions.map(transaction => sqlite.run(
    'INSERT INTO transactions (id, date, amount, description, category) VALUES (?, ?, ?, ?, ?)',
    [ transaction.id, transaction.date, transaction.amount, transaction.description, transaction.category ])));

  Promise
    .all(queryPromises)
    .then(() => res.status(200).end())
    .catch(error => {
      console.log(error);
      res.status(500).end();
    });
});

sqlite.open('./database.sqlite')
  .then(db => {
    console.log("Migrating database...");
    db.migrate({force: 'last'});
  })
  .then(() => {
    console.log("Starting express...")
    app.listen(port);
  })
  .then(() => console.log("Bootstrap complete. Listening..."))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
