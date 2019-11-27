import React from 'react';
import isNullOrUndefined from './isNullOrUndefined';

/*
 * Provide a table view of transactions.
 * data: a collection of transactions including
 */
function TransactionTable({ data, categoryFilter }) {
  if (data == undefined || data.length === 0) {
    return <div>No data</div>
  }

  let filteredData = categoryFilter === undefined
    ? data
    : data.filter(x => x.category === categoryFilter);

  let tableRows = [];
  for (let i = 0; i < filteredData.length; i++) {
    let transaction = filteredData[i];
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
