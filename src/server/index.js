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
  let startDate = req.query.startDate;
  if (startDate === undefined) {
    startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
  }

  let endDate = req.query.endDate;
  if (endDate === undefined) {
    endDate = new Date();
  }
  
  let result = await sqlite.all(
    'SELECT id, date, amount, description, category FROM transactions WHERE date > ? AND date < ?',
    [ startDate, endDate ]);

  let transactions = result.map(x => new Transaction(x));
  res.send(transactions);
});

/*
 * Bulk load transactions into persistent store.
 * { transactions: [ { Transaction } ] }
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
      console.error(error);
      res.status(500).end();
    });
});

/*
 * Update a specific transaction.
 * { Transaction }
 */
app.put('/transactions/:id', async (req, res) => {
  if (req.body === undefined) {
    res.status(400).end();
    return;
  }

  try {
    await sqlite.run(
      `UPDATE transactions
       SET date = ?,
           amount = ?,
           description = ?,
           category = ?
       WHERE id = ?`,
      [ req.body.date, req.body.amount, req.body.description, req.body.category, req.params.id ]);  
  } catch(e) {
    console.error('Error updating a transaction.');
    console.error(e);
    res.status(500).end();
    return;
  }
  
  res.status(200).end();
});

app.delete('/transactions/:id', async (req, res) => {
  try {
    await sqlite.run(
      `DELETE FROM transactions
       WHERE id = ?`,
       [ req.params.id ]);
  } catch(e) {
    console.error('Error deleting a transaction.');
    console.error(e);
    res.status(500).end();
    return;
  }

  res.status(200).end();
})

sqlite.open('./database.sqlite')
  .then(db => {
    console.log("Migrating database...");
    db.migrate({force: 'last'});
  })
  .then(() => {
    console.log("Starting express...")
    app.listen(port);
  })
  .then(() => console.log(`Bootstrap complete. Listening on port ${port}...`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
