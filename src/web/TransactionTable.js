import React, { useState, useRef } from 'react';
import isNullOrUndefined from './isNullOrUndefined';

function completeEditing(transaction, amountRef, descriptionRef, categoryRef, setEditing, onTransactionUpdated) {
  let hasNotChanged = [
    [ amountRef.current.defaultValue, amountRef.current.value ],
    [ descriptionRef.current.defaultValue, descriptionRef.current.value ],
    [ categoryRef.current.defaultValue, categoryRef.current.value ]
  ].every(value => value[0] === value[1]);

  if (hasNotChanged) {
    setEditing(undefined);
    return;
  }

  let updatedTransaction = Object.assign({}, transaction, {
    amount: amountRef.current.valueAsNumber,
    description: descriptionRef.current.value,
    category: categoryRef.current.value
  });

  onTransactionUpdated(updatedTransaction);
  setEditing(undefined);
}

/*
 * Provide a table view of transactions.
 * data: a collection of transactions including
 */
function TransactionTable({ data, categoryFilter, onTransactionUpdated }) {
  if (data == undefined || data.length === 0) {
    return <div>No data</div>
  }

  onTransactionUpdated = onTransactionUpdated === undefined ? ()=>{} : onTransactionUpdated;

  const [editing, setEditing] = useState(undefined);
  let amountRef = useRef(undefined);
  let descriptionRef = useRef(undefined);
  let categoryRef = useRef(undefined);

  let filteredData = categoryFilter === undefined
    ? data
    : data.filter(x => x.category === categoryFilter);

  let tableRows = [];
  for (let i = 0; i < filteredData.length; i++) {
    let transaction = filteredData[i];

    if (transaction === editing) {
      tableRows.push(
        <div key={transaction.id} className="transaction-table__row">
          <input type="number" ref={amountRef} defaultValue={transaction.amount} />
          <input type="text" ref={descriptionRef} defaultValue={transaction.description} />
          <input type="text" ref={categoryRef} defaultValue={transaction.category} />
          <button onClick={e => completeEditing(transaction, amountRef, descriptionRef, categoryRef, setEditing, onTransactionUpdated)}>Done</button>
        </div>
      );
      continue;
    }

    tableRows.push(
      <div key={transaction.id} className="transaction-table__row">
        <div>{isNullOrUndefined(transaction.amount) ? 'n/a' : '$' + transaction.amount.toFixed(2)}</div>
        <div>{transaction.description}</div>
        <div>{transaction.category}</div>
        <button onClick={e => setEditing(transaction)}>Edit</button>
      </div>
    );
  }

  return (
    <div className="transaction-table">
      <div className="transaction-table__header transaction-table__row">
        <div>Amount</div>
        <div>Description</div>
        <div>Category</div>
        <div></div>
      </div>
      {tableRows}
    </div>
  );
}

export default TransactionTable;
