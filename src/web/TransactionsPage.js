import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingDistractor from './LoadingDistractor';
import TransactionTable from './TransactionTable';
import TransactionsPieChart from './TransactionsPieChart';

class TransactionsPage extends Component {
  constructor(props) {
    super(props);

    let startDate = new Date(),
        endDate = new Date();
    startDate.setMonth(startDate.getMonth() - 100); // TODO: Set to a normal default like 1 month. This is for testing only.

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
  }

  pad(number) {
    return number < 10 ? '0' + number : number;
  }

  getDateQueryString(date) {
    return `${date.getUTCFullYear()}-${this.pad(date.getUTCMonth() + 1)}-${this.pad(date.getUTCDate())}`;
  }

  getTransactions() {
    let self = this;
    self.setState({ isLoading: true });
    let startDateQueryString = this.getDateQueryString(self.state.startDate);
    let endDateQueryString = this.getDateQueryString(self.state.endDate);

    // TODO: remove hard-coded URI
    return fetch(`http://localhost:8080/transactions?startDate=${startDateQueryString}&endDate=${endDateQueryString}`)
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
        <div>Start: <DatePicker selected={this.state.startDate} onChange={this.onStartDateChanged} /></div>
        <div>End: <DatePicker selected={this.state.endDate} onChange={this.onEndDateChanged} /></div>
        
        <TransactionsPieChart data={this.state.transactions} onClick={this.onPieChartClick} />
        <TransactionTable data={this.state.transactions} categoryFilter={this.state.categoryFilter} />
      </>
    )
  }
}

export default TransactionsPage;
