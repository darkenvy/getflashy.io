import React from 'react';
import { connect } from 'react-redux';
import AppNavbar from './Navbar';
import { fetchDeckMetadata } from '../actions';
// import { browserHistory } from 'react-router';
// import { compose } from 'redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 'select-deck',
      deck: '',
    };
  }

  componentDidMount() {
    this.props.fetchDeckMetadata();
  }

  render() {
    // We use URL param instead of this.props.currentDeckId so bookmarking works
    const { deckId } = this.props.params;

    return (
      <div>
        <AppNavbar />
        <div className="container-fluid main-content">{this.props.children}</div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchDeckMetadata: () => fetchDeckMetadata(dispatch),
  };
}

export default connect(
  undefined,
  mapDispatchToProps,
)(App);
