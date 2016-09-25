window.DeckList = React.createClass({

    getInitialState: function() {
        return { deckId: '', decks: {}, deckFilter: '' };
    },

    componentWillMount: function() {
        this.fetchDeckInfo = _.debounce(this.fetchDeckInfo, 500);
    },

    componentDidMount: function() {
        $.ajax({
            url: '/api/decks',
            dataType: 'json',
            success: function(data) {
                console.log('data === ' + JSON.stringify(data));
                this.setState({ decks: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error('#GET Error', status, err.toString());
            }.bind(this)
        });
    },

    fetchDeckInfo: function(deckId) {
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
    },

    onDeckFilterChange: function(filter) {
        this.setState({ deckFilter: filter });
        //this.fetchDeckInfo(deckId);
    },

    render: function() {

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

                <div className="result">{this.state.response}</div>

                {
                    Object.keys(filteredDecks).map(function(key) {
                        return <DeckButton key={key} deck={filteredDecks[key]} onClick={self.props.startDeck}/>
                    })
                }
            </div>
        );
    }
});
