-- Up
CREATE TABLE transactions (
  id TEXT,
  date TEXT,
  amount REAL,
  description TEXT,
  category TEXT
);

-- Down
DROP TABLE transactions;
