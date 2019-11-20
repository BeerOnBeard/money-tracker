import React, { Component } from 'react';
import TransactionParseForm from './TransactionParseForm';
import TransactionTable from './TransactionTable';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { transactions: undefined }
  }

  handleChange(data) {
    this.setState({transactions: data});
  }

  render() {
    return (
      <>
        <TransactionParseForm valueChanged={data => this.handleChange(data)} />
        <TransactionTable data={this.state.transactions} />
      </>
    );
  }
}

export default App;
