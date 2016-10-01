import React from 'react';

export class DeckStatus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        var deck = this.props.deck;
        var date = new Date().toString();

        return (
            <div className="deck-status">
                {this.props.curCard} / {this.props.cardCount}
            </div>
        );
    }
}

export default DeckStatus;
