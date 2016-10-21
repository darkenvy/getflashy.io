import React from 'react';
import $ from 'jquery';
import Card from './Card';
import DeckStatus from './DeckStatus';
import { Link } from 'react-router';

class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = { deck: {}, curCard: 0, cardFlipped: false };

    }

    componentWillMount() {
        // this.fetchDeckInfo = _.debounce(this.fetchDeckInfo, 500);
    }

    componentDidMount() {

        this.fetchDeckInfo(this.props.deckId);

        $(document).on('keydown.deck', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    if (this.state.curCard < this.state.deck.cards.length - 1) {
                        this.setState({ curCard: this.state.curCard + 1, cardFlipped: false });
                    }
                    break;
                case 'ArrowLeft':
                    if (this.state.curCard > 0) {
                        this.setState({ curCard: this.state.curCard - 1, cardFlipped: false });
                    }
                    break;
                case 'ArrowDown':
                    if (!this.state.cardFlipped) {
                        this.setState({cardFlipped: true});
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                    if (this.state.cardFlipped) {
                        this.setState({cardFlipped: false});
                    }
                    e.stopPropagation();
                    e.preventDefault();
                    break;
            }
        });
    }

    componentWillUnmount() {
        console.log('Removing key handler...');
        $(document).off('keydown.deck');
    }

    configureDeck(deck) {

        if (this.props.config.randomize) {
            deck.cards = _.shuffle(deck.cards);
        }

        // TODO: Front or back
    }

    fetchDeckInfo(deckId) {
        $.ajax({
            url: '/api/decks/' + deckId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log('Successfully loaded deck: ' + deckId);
                this.configureDeck(data);
                this.setState({ deck: data });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ deckId: '', curCard: -1 });
                console.error(deckId, status, err.toString());
            }.bind(this)
        });
    }

    noSuchDeck() {
        return (
            <div className="container">
                No such deck!
                <p>
                    <Link to="/">Back to deck list</Link>
                </p>
            </div>
        );
    }

    loadingScreen() {
        return (
            <div className="container">
                Loading...
            </div>
        );
    }

    render() {

        var fillHeight = { height: '100%' };

        return (
            <div style={fillHeight}>

                {

                    (() => {

                        if (this.state.deck.id) {

                            var cards = this.state.deck.cards;
                            var card = cards[this.state.curCard];

                            return (
                                <div className="deck">
                                    <div className="deck-nav left-nav">
                                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                    </div>
                                    <div className="deck-card-section">
                                        <Card key={card.front} card={card} flipped={this.state.cardFlipped}/>

                                        <div>
                                            <DeckStatus curCard={this.state.curCard + 1} cardCount={cards.length} />
                                        </div>
                                    </div>
                                    <div className="deck-nav right-nav" >
                                        <i className="fa fa-chevron-right" aria-hidden="true" ></i>
                                    </div>
                                </div>
                            )
                        }

                        else if (this.state.curCard === -1) {
                            return this.noSuchDeck();
                        }

                        return this.loadingScreen();
                    })()
                }
            </div>
        );
    }
}

export default Deck;
