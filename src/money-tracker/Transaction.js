class Transaction {
  constructor(data) {
    this.id = data.id;
    this.date = data.date;
    this.amount = data.amount;
    this.description = data.description;
    this.category = data.category;
  }
}

export default Transaction;
