import React from 'react';
import AppNavbar from './Navbar';
import DeckList from './DeckList';

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

    startDeck(deckName) {
        this.setState({ state: 'view-deck', deck: deckName });
    }

    render() {

        var self = this;

        return (
            <div>

                <AppNavbar/>

                <div className="container">
                    {
                        (function () {
                            if (self.state.state === 'select-deck') {
                                return (<DeckList startDeck={self.startDeck}/>)
                            }
                            return (<div>Sorry charlie</div>)
                        })()
                    }
                </div>
            </div>
        );
    }
}

export default AppComponent;
