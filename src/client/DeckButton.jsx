window.DeckButton = React.createClass({

    getInitialState: function() {
        return { };
    },

    render: function() {

        return (
            <div className="deck-button">
                <div className="deck-details">
                    Deck: {this.props.deck.name}
                </div>
            </div>
        );
    }
});
