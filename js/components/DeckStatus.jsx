import React from 'react';

export default class DeckStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const date = new Date().toString();

    return (
      <div className="deck-status">
        {this.props.curCard} / {this.props.cardCount} (<font color="green">{this.props.correctCount}</font>)
      </div>
    );
  }
}
