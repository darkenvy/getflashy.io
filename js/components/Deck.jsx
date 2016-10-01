import React from 'react';
import $ from 'jquery';
import Card from './Card';

class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };

    }

    componentWillMount() {
        // this.fetchDeckInfo = _.debounce(this.fetchDeckInfo, 500);
    }

    componentDidMount() {
        // $.ajax({
        //     url: 'api/decks/' + this.props.deck,
        //     dataType: 'json',
        //     cache: false,
        //     success: function(data) {
        //         console.log('Setting state to: ' + JSON.stringify(data));
        //         this.setState({ deckId: data, response: JSON.stringify(data) });
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         this.setState({ deckId: '', response: 'Oops!' });
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
    }

    render() {

        return (
            <div className="deck">
                <div className="left-nav"></div>
                <div className="deck-card-section">
                {
                    this.props.deck.cards.map((card) => {
                        console.log(card);
                        return <Card key={card.front} card={card}/>
                    })
                }
                </div>
                <div className="right-nav"></div>
            </div>
        );
    }
}

export default Deck;
