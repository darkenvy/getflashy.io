window.DeckButton = React.createClass({

    getInitialState: function() {
        return { };
    },

    render: function() {

        var deck = this.props.deck;
        var date = new Date().toString();

        return (
            <div className="deck-button" onClick={this.props.onClick}>
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
});
