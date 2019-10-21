import React, { Component } from 'react';
import Papa from 'papaparse';
import { TransactionBuilder } from 'money-tracker';

/*
 * Form that takes a string CSV of transactions, parses it, and
 * returns a collection of rows. The header will be the first row.
 */
class TransactionParseForm extends Component {
  constructor(props){
    super(props);
    this.csvText = React.createRef();
  }

  handleChange(event) {
    event.preventDefault();
    let self = this;
    Papa.parse(event.target.files[0], { complete: result => {
      let transactions = TransactionBuilder.build(result.data);
      self.props.valueChanged(transactions);
    }});
  }

  render() {
    return <input type="file" onChange={e => this.handleChange(e)} />
  }
}

export default TransactionParseForm;
