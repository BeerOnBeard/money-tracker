import React, { Component } from 'react';
import TransactionParseForm from './TransactionParseForm';
import TransactionTable from './TransactionTable';

const pages = { transactions: 'Transactions', import: 'Import' };

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      transactions: undefined,
      isLoading: true,
      isFailed: false,
      page: pages.transactions
    }
  }

  getPage() {
    switch (this.state.page) {
      case pages.import:
        return <TransactionParseForm />
      default:

        return <TransactionTable data={this.state.transactions} />
    }
  }

  getMenuItemFor(page) {
    let classes = 'menu__item';
    if (this.state.page === page) {
      classes += ' menu__item--active';
    }

    return <li className={classes} onClick={e => this.navigateTo(e, page)}>{ page }</li>
  }

  navigateTo(event, page) {
    event.preventDefault();
    this.setState({ page });
  }

  render() {
    if (this.state.isFailed) {
      // TODO: Make more fun
      return <><h1>Whoops!</h1><div>Check console for more details on error</div></>
    }

    if (this.state.isLoading) {
      // TODO: Make this pretty
      return <h1>Loading...</h1>
    }

    return (
      <>
        <ul className="menu">
          { this.getMenuItemFor(pages.transactions) }
          { this.getMenuItemFor(pages.import) }
        </ul>
        <div className="main">
          { this.getPage() }
        </div>
      </>
    );
  }

  getTransactions() {
    let self = this;
    // TODO: remove hard-coded URI
    return fetch('http://localhost:8080/transactions')
      .then(response => {
        if (!response.ok) {
          throw response;
        } else {
          return response.json();
        }
      })
      .then(transactions => self.setState({ transactions, isLoading: false }))
      .catch(response => {
        self.setState({ isFailed: true });
        console.error(`Failed to get transactions: ${response.status}`); // TODO: remove console call
        console.error(response);
      });
  }

  componentDidMount() {
    return this.getTransactions();
  }
}

export default App;
