import React from 'react';
import AppNavbar from './Navbar';
import Deck from './Deck';
import DeckList from './DeckList';
import { browserHistory } from 'react-router';

class AppComponent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            state: 'select-deck',
            deck: ''
        };

        // Manually bind this method to the component instance so "this" is what we expect
        this.startDeck = this.startDeck.bind(this);
    }

    startDeck(deck) {
        browserHistory.push('/' + deck.id); // TODO: This is probably very, very bad, but how do we programmatically navigate?
        this.setState({ state: 'view-deck', deck: deck });
    }

    render() {

        return (
            <div>

                <AppNavbar/>

                <div className="container-fluid main-content">
                    {
                        (() => {
                            if (!this.props.params.deck) {
                                return (<DeckList onDeckClick={this.startDeck}/>)
                            }
                            return (<Deck deckId={this.props.params.deck}/>)
                        })()
                    }
                </div>
            </div>
        );
    }
}

export default AppComponent;
