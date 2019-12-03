const baseUri = 'http://localhost:8080'; // TODO: remove hard-coded URI

function pad(number) {
  return number < 10 ? '0' + number : number;
}

function getDateQueryString(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

function getTransactions(startDate, endDate) {
  let startDateQueryString = getDateQueryString(startDate);
  let endDateQueryString = getDateQueryString(endDate);
  return fetch(`${baseUri}/transactions?startDate=${startDateQueryString}&endDate=${endDateQueryString}`)
        .then(response => {
          if (!response.ok) {
            console.error("Getting transactions failed.")
            console.error(response);
            throw response;
          } else {
            return response.json();
          }
        });
}

function bulkUploadTransactions(transactions) {
  return fetch(`${baseUri}/transactions/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ transactions })
    })
    .then(response => {
      if (!response.ok) {
        console.error('Bulk upload of transactions failed.');
        console.error(response);
        throw response;
      }
    });
}

function updateTransaction(transaction) {
  return fetch(`${baseUri}/transactions/${transaction.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
  .then(response => {
    if (!response.ok) {
      console.error('Updating a transaction failed.');
      console.error(response);
      throw response;
    }
  });
}

export { getTransactions, bulkUploadTransactions, updateTransaction };
