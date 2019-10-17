import newUuid from 'uuid/v4';
import Transaction from './Transaction';
/*
 * Holds index maps to transform a table array into a colleciton of Transaction objects.
 */
class TransactionMapper {
  constructor(amountIndex, dateIndex, descriptionIndex, categoryIndex) {
    this.amountIndex = amountIndex;
    this.dateIndex = dateIndex;
    this.descriptionIndex = descriptionIndex;
    this.categoryIndex = categoryIndex;
  }

  /*
   * Build a mapper instance from a collection of headers.
   * headers: <[]> Collection of string headers
   * returns a TransactionMapper
   */
  static build(headers) {
    let lowercaseHeaders = headers.map(h => h.toLowerCase());
    let amountIndex = lowercaseHeaders.findIndex(h => h === 'debit');
    let dateIndex = lowercaseHeaders.findIndex(h => h === 'transaction date');
    let descriptionIndex = lowercaseHeaders.findIndex(h => h === 'description');
    let categoryIndex = lowercaseHeaders.findIndex(h => h === 'category');
    return new TransactionMapper(amountIndex, dateIndex, descriptionIndex, categoryIndex);
  }
}

/*
 * Builds transactions from raw data.
 */
class TransactionBuilder {
  /*
   * Using a single bank identifier and a collection representing a table of transactions, including a header,
   * return a collection of Transaction objects.
   * transactionTable: <[][]> Multi-dimensional array representing a table of transactions where the first
   *   row contains the table headers.
   */
  static build(transactionTable) {
    let mapper = TransactionMapper.build(transactionTable[0]);

    let transactions = [];
    for (let i = 1; i < transactionTable.length; i++) {
      transactions.push(
        new Transaction(
          newUuid(),
          parseFloat(transactionTable[i][mapper.amountIndex]),
          transactionTable[i][mapper.descriptionIndex],
          transactionTable[i][mapper.categoryIndex]));
    }

    return transactions;
  }
}

export default TransactionBuilder;
