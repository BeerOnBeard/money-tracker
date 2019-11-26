import React from 'react';
import isNullOrUndefined from './isNullOrUndefined';

/*
 * Provide a table view of transactions.
 * data: a collection of transactions including
 */
function TransactionTable({ data }) {
  if (data == undefined || data.length === 0) {
    return <div>No data</div>
  }

  let tableRows = [];
  for (let i = 0; i < data.length; i++) {
    let transaction = data[i];
    tableRows.push(
      <tr key={transaction.id}>
        <td>{isNullOrUndefined(transaction.amount) ? 'n/a' : '$' + transaction.amount.toFixed(2)}</td>
        <td>{transaction.description}</td>
        <td>{transaction.category}</td>
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Amount</td>
          <td>Description</td>
          <td>Category</td>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
}

export default TransactionTable;
