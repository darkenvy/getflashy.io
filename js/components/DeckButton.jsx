import React from 'react';

export class DeckButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        var deck = this.props.deck;
        var date = new Date().toString();

        return (
            <div className="deck-button" onClick={ () => this.props.onClick(deck) }>
                <div className="deck-details">
                    <div>
                        <div>Deck: {deck.name}</div>
                        <div>{deck.cards.length} cards</div>
                        <div>Uploaded {date}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeckButton;

