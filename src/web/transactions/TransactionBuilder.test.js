import TransactionBuilder from './TransactionBuilder';
import Transaction from './Transaction';

test('Parses CapOne correctly', () => {
  let transactions = [
    ['Transaction Date', 'Posted Date', 'Card No.', 'Description', 'Category', 'Debit', 'Credit'],
    ['2017-12-12', '2017-12-13', '5368', 'BEVERAGE WAREHOUSE', 'Merchandise', '19.07', '']
  ]

  let parsedTransactions = TransactionBuilder.build(transactions);
  let expectedTransactions = [ new Transaction(expect.anything(), 19.07, 'BEVERAGE WAREHOUSE', 'Merchandise') ];

  expect(parsedTransactions).toEqual(expectedTransactions);
});
