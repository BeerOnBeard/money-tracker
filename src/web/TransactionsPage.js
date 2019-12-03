import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingDistractor from './LoadingDistractor';
import TransactionTable from './TransactionTable';
import TransactionsPieChart from './TransactionsPieChart';
import { getTransactions, updateTransaction } from './TransactionDataAccess';

class TransactionsPage extends Component {
  constructor(props) {
    super(props);

    let startDate = new Date(),
        endDate = new Date();
    
    // TODO: Set to a normal default like 1 month. This is for testing only.
    startDate.setMonth(startDate.getMonth() - 100);

    this.state = {
      transactions: undefined,
      categoryFilter: undefined,
      startDate: startDate,
      endDate: endDate,
      isLoading: false,
      isFailed: false
    };

    this.onPieChartClick = (categorySelected => this.setState({ categoryFilter: categorySelected })).bind(this);
    this.onStartDateChanged = (date => this.setState({ startDate: date})).bind(this);
    this.onEndDateChanged = (date => this.setState({ endDate: date})).bind(this);
    this.onTransactionUpdated = (updatedTransaction => {
      let self = this;
      self.setState({ isLoading: true });
      updateTransaction(updatedTransaction)
        .then(() => {
          let transactions = [...self.state.transactions];
          let index = transactions.findIndex(tran => tran.id === updatedTransaction.id);
          transactions.splice(index, 1, updatedTransaction);
          self.setState({ transactions });
        })
        .catch(() => self.setState({ isFailed: true }))
        .finally(() => self.setState({ isLoading: false }));
    });
  }

  fetchTransactions() {
    let self = this;
    self.setState({ isLoading: true });

    getTransactions(self.state.startDate, self.state.endDate)
      .then(transactions => self.setState({ transactions }))
      .catch(response => {
        self.setState({ isFailed: true });
        console.error(`Failed to get transactions`);
        console.error(response);
      })
      .finally(() => self.setState({ isLoading: false }));
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  render() {
    if (this.state.isFailed) {
      return <><h1>Whoops!</h1><div>Something bad happened. Better check the console.</div></>
    }
    
    return (
      <>
        <LoadingDistractor isActive={this.state.isLoading} />
        <div>Start: <DatePicker selected={this.state.startDate} onChange={this.onStartDateChanged} /></div>
        <div>End: <DatePicker selected={this.state.endDate} onChange={this.onEndDateChanged} /></div>
        
        <TransactionsPieChart data={this.state.transactions} onClick={this.onPieChartClick} />
        <TransactionTable
          data={this.state.transactions}
          categoryFilter={this.state.categoryFilter}
          onTransactionUpdated={this.onTransactionUpdated} />
      </>
    )
  }
}

export default TransactionsPage;
