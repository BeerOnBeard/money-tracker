class Transaction {
  constructor(transactionId, amount, description, category) {
    this.transactionId = transactionId;
    this.amount = amount;
    this.description = description;
    this.category = category;
  }
}

export default Transaction;
