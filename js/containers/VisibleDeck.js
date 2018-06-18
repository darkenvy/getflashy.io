/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Link } from 'react-router';
import ProgressBar from 'react-progress-bar-plus';
import { connect } from 'react-redux';
import { showResults } from '../actions';
import DeckStatus from '../components/DeckStatus';
import Card from '../components/Card';
import Timer from '../components/Timer';

class Deck extends React.Component {
  // success: function (data) {
  //   console.log('inside success', this)
  //   console.log(`Successfully loaded deck: ${deckId}`);
  //   this.configureDeck(data);
  //   this.setState({ deck: data });
  // },
  // error: function (xhr, status, err) {
  //   this.setState({ deckId: '', curCard: -1 });
  //   console.error(deckId, status, err.toString());
  // }.bind(this),

  constructor(props) {
    super(props);
    this.state = {
      deck: {},
      curCard: 0,
      cardFlipped: false,
      correctCount: 0,
      animating: false,
      // correctCount: 0, // unused??
      startTime: new Date(),
    };

    this.advance = this.advance.bind(this);
    this.toggleCardVisibleSide = this.toggleCardVisibleSide.bind(this);
  }

  componentWillMount() {
    // this.fetchDeckInfo = _.debounce(this.fetchDeckInfo, 500);
  }

  componentDidMount() {
    this.fetchDeckInfo(this.props.deckId);
  }

  componentWillUnmount() {
    console.log('Removing key handler...');
    $(document).off('keydown.deck');
  }

  fetchDeckInfo(deckId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/decks/${deckId}`,
        dataType: 'json',
        cache: false,
        success: resolve,
        error: reject,
      });
    }).then(data => {
      console.log(`Successfully loaded deck: ${deckId}`);
      this.configureDeck(data);
      this.setState({ deck: data });
    }).catch((xhr, status, err) => {
      this.setState({ /* deckId: '', */ curCard: -1 });
      console.error(deckId, status, err.toString());
    });
  }

  configureDeck(deck) {
    // TODO: fix
    if (this.props.config.randomize) {
      deck.cards = _.shuffle(deck.cards); // eslint-disable-line no-param-reassign
    }

    // TODO: Front or back
  }

  advance(knewCard) {
    console.log('advancing');
    const newCorrectCount = knewCard ? this.state.correctCount + 1 : this.state.correctCount;

    if (this.state.curCard < this.state.deck.cards.length - 1) {
      this.setState({
        curCard: this.state.curCard + 1,
        correctCount: newCorrectCount,
        // card: false,
        animating: false,
      });
    } else {
      this.deckCompleted();
    }
  }

  deckCompleted() {
    this.props.onDeckCompleted(this.props.deckId);
  }

  toggleCardVisibleSide(e) {
    console.log('toggleCardVisibleSide', this.state);
    this.setState(state => Object.assign({}, state, { cardFlipped: !this.state.cardFlipped }));
    e.stopPropagation();
    e.preventDefault();
  }

  userKnewCard(knew) {
    if (!this.state.animating) {
      this.setState({ animating: true });
      this.topCard.setUserKnew(knew);
    }
  }

  render() {
    if (this.state.curCard === -1) {
      return (
        <div className="container">
          No such deck!
          <p>
            <Link to="/" href="#back" >Back to deck list</Link>
          </p>
        </div>
      );
    }
    if (!this.state.deck.cards) {
      return <div />; // Not yet fetched
    }

    const fillHeight = { height: '100%' };
    const percent = (this.state.curCard / this.state.deck.cards.length) * 100;

    const nextCardStyle = {
      zIndex: -100,
      position: 'absolute',
      width: '100%',
    };

    return (
      <div style={fillHeight}>
        {(() => {
          if (this.state.deck.id) {
            const { cards } = this.state.deck;
            const card = cards[this.state.curCard];
            const nextCard = this.state.curCard < cards.length - 1 ? cards[this.state.curCard + 1] : null;

            return (
              <div className="deck">
                <ProgressBar spinner={false} percent={percent} />
                <div
                  className="deck-nav left-nav"
                  onClick={() => this.userKnewCard(false)}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true" />
                </div>
                <div className="deck-card-section">
                  <Timer startTime={this.state.startTime} />
                  {(() => {
                    if (nextCard) {
                      return (
                        <div style={nextCardStyle}>
                          <Card key={nextCard.front.text} card={nextCard} flipped={false} />
                        </div>
                      );
                    }
                    return '';
                  })()}
                  <Card
                    key={card.front.text}
                    card={card}
                    flipped={this.state.cardFlipped}
                    ref={(instance) => {
                      this.topCard = instance;
                    }}
                    advance={this.advance}
                    toggleVisibleSide={this.toggleCardVisibleSide}
                  />

                  <div>
                    <DeckStatus
                      curCard={this.state.curCard + 1}
                      cardCount={cards.length}
                      correctCount={this.state.correctCount}
                    />
                  </div>
                </div>
                <div
                  className="deck-nav right-nav"
                  onClick={() => this.userKnewCard(true)}
                >
                  <i className="fa fa-chevron-right" aria-hidden="true" />
                </div>
              </div>
            );
          }

          return (
            <div className="container">Loading...</div>
          );
        })()}
      </div>
    );
  }
}

Deck.propTypes = {
  deckId: PropTypes.string,
  config: PropTypes.any,
  onDeckCompleted: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  deckId: ownProps.params.deckId, // Don't use redux state for bookmarking purposes
  config: state.config,
});

const mapDispatchToProps = dispatch => ({
  onDeckCompleted: (deckId) => {
    dispatch(showResults(deckId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
