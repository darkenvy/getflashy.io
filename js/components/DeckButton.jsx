import React from 'react';

export class DeckButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        var deck = this.props.deck;
        var date = new Date(deck.modified).toDateString();

        return (
            <div className="deck-button" onClick={ () => this.props.onClick(deck) }>
                <div className="deck-details">
                    <div>
                        <div className="deck-title">{deck.name}</div>
                        <div>{deck.size} cards</div>
                        <div>Uploaded {date}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeckButton;

