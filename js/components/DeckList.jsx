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

    componentWillMount() {
        this.fetchDeckInfo = _.debounce(this.fetchDeckInfo, 500);
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

    fetchDeckInfo(deckId) {
        $.ajax({
            url: 'api/decks/' + deckId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log('Setting state to: ' + JSON.stringify(data));
                this.setState({ deckId: data, response: JSON.stringify(data) });
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({ deckId: '', response: 'Oops!' });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    onDeckFilterChange(filter) {
        this.setState({ deckFilter: filter });
        //this.fetchDeckInfo(deckId);
    }

    render() {

        var self = this;
        var filteredDecks = [];
        Object.keys(this.state.decks).forEach(function(key) {
            if (key.startsWith(self.state.deckFilter)) {
                filteredDecks.push(self.state.decks[key]);
            }
        });

        return (
            <div>
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
