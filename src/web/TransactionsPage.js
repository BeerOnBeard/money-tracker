import React, { Component } from 'react';
import LoadingDistractor from './LoadingDistractor';
import TransactionTable from './TransactionTable';
import TransactionsPieChart from './TransactionsPieChart';

class TransactionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { transactions: undefined, categoryFilter: undefined, isLoading: false, isFailed: false };
    this.onPieChartClick = (categorySelected => this.setState({ categoryFilter: categorySelected })).bind(this);
  }

  getTransactions() {
    let self = this;
    self.setState({ isLoading: true });
    // TODO: remove hard-coded URI
    return fetch('http://localhost:8080/transactions')
      .then(response => {
        if (!response.ok) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then(transactions => self.setState({ transactions }))
      .catch(response => {
        self.setState({ isFailed: true });
        console.error(`Failed to get transactions: ${response.status}`); // TODO: remove console call
        console.error(response);
      })
      .finally(() => self.setState({ isLoading: false }));
  }

  componentDidMount() {
    this.getTransactions();
  }

  render() {
    if (this.state.isFailed) {
      return <><h1>Whoops!</h1><div>Something bad happened. Better check the console.</div></>
    }
    
    return (
      <>
        <LoadingDistractor isActive={this.state.isLoading} />
        <TransactionsPieChart data={this.state.transactions} onClick={this.onPieChartClick} />
        <TransactionTable data={this.state.transactions} categoryFilter={this.state.categoryFilter} />
      </>
    )
  }
}

export default TransactionsPage;
