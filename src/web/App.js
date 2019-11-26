import React, { Component } from 'react';
import TransactionParseForm from './TransactionParseForm';
import TransactionPage from './TransactionsPage';

const pages = { transactions: 'Transactions', import: 'Import' };

class App extends Component {
  constructor(props){
    super(props);
    this.state = { page: pages.transactions };
  }

  getPage() {
    switch (this.state.page) {
      case pages.import:
        return <TransactionParseForm />
      default:
        return <TransactionPage />
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
    return (
      <>
        <div className="page">
          <ul className="menu">
            { this.getMenuItemFor(pages.transactions) }
            { this.getMenuItemFor(pages.import) }
          </ul>
          <div className="main">
            { this.getPage() }
          </div>
        </div>
      </>
    );
  }
}

export default App;
