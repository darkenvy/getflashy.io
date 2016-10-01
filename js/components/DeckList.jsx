import React from 'react';
import DeckButton from './DeckButton';
import DeckFilter from './DeckFilter';
import $ from 'jquery';
import _ from 'lodash';

class DeckList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { deckId: '', decks: {}, deckFilter: '' };

        // Manually bind this method to the component instance so "this" is what we expect
        this.onDeckFilterChange = this.onDeckFilterChange.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: '/api/decks',
            dataType: 'json',
            success: function(data) {
                for (var deckId in data) {
                    data[deckId].id = deckId;
                }
                console.log('data === ' + JSON.stringify(data));
                this.setState({ decks: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('#GET Error', status, err.toString());
            }.bind(this)
        });
    }

    onDeckFilterChange(filter) {
        this.setState({ deckFilter: filter });
    }

    render() {

        var self = this;
        var filteredDecks = [];
        Object.keys(this.state.decks).forEach(function(key) {
            var deck = self.state.decks[key];
            if (deck.name.toLowerCase().indexOf(self.state.deckFilter) > -1) {
                filteredDecks.push(deck);
            }
        });

        return (
            <div className="container">
                <DeckFilter label="Filter decks:" helpText={this.state.deckId} onChange={this.onDeckFilterChange}/>

                {
                    Object.keys(filteredDecks).map(function(key) {
                        return <DeckButton key={key} deck={filteredDecks[key]} onClick={self.props.onDeckClick}/>
                    })
                }
            </div>
        );
    }
}

export default DeckList;
