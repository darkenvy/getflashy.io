import React from 'react';
import $ from 'jquery';
import Card from './Card';
import DeckStatus from './DeckStatus';
import { Link } from 'react-router';
import ProgressBar from 'react-progress-bar-plus';
import Timer from './Timer';

class Deck extends React.Component {

    constructor(props) {
        super(props);
        this.state = { deck: {}, curCard: 0, cardFlipped: false,
                correctCount: 0, startTime: null };

        // Manually bind this method to the component instance so "this" is what we expect
        this.deckCompleted = this.deckCompleted.bind(this);
    }

    componentWillMount() {
        // this.fetchDeckInfo = _.debounce(this.fetchDeckInfo, 500);
    }

    componentDidMount() {

        this.fetchDeckInfo(this.props.deckId);

        $(document).on('keydown.deck', (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    this.advance(true);
                    break;
                case 'ArrowLeft':
                    this.advance(false);
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

        this.setState({ correctCount: 0, startTime: new Date() });
    }

    advance(knewCard) {

        const newCorrectCount = knewCard ? this.state.correctCount + 1 : this.state.correctCount;

        if (this.state.curCard < this.state.deck.cards.length - 1) {
            this.setState({ curCard: this.state.curCard + 1, correctCount: newCorrectCount, cardFlipped: false });
        }
        else {
            this.deckCompleted();
        }
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

    deckCompleted() {
        this.props.onDeckCompleted(this.props.deckId);
    }

    render() {

        if (this.state.curCard === -1) {
            return this.noSuchDeck();
        }
        if (!this.state.deck.cards) {
            return (<div></div>); // Not yet fetched
        }

        const fillHeight = { height: '100%' };
        const percent = this.state.curCard / this.state.deck.cards.length * 100;

        return (
            <div style={fillHeight}>

                {

                    (() => {

                        if (this.state.deck.id) {

                            var cards = this.state.deck.cards;
                            var card = cards[this.state.curCard];

                            return (
                                <div className="deck">
                                    <ProgressBar spinner={false} percent={percent}/>
                                    <div className="deck-nav left-nav">
                                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                    </div>
                                    <div className="deck-card-section">
                                        <Timer startTime={this.state.startTime}></Timer>
                                        <Card key={card.front} card={card} flipped={this.state.cardFlipped}
                                                advance={this.advance.bind(this)}/>

                                        <div>
                                            <DeckStatus curCard={this.state.curCard + 1} cardCount={cards.length}
                                                    correctCount={this.state.correctCount}/>
                                        </div>
                                    </div>
                                    <div className="deck-nav right-nav" >
                                        <i className="fa fa-chevron-right" aria-hidden="true" ></i>
                                    </div>
                                </div>
                            )
                        }

                        return this.loadingScreen();
                    })()
                }
            </div>
        );
    }
}

export default Deck;
