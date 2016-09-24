window.DeckList = React.createClass({

    getInitialState: function() {
        return { deckId: '', decks: {}, response: '(none)' };
    },

    componentWillMount: function() {
        this.fetchDeckInfo = _.debounce(this.fetchDeckInfo, 1000);
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

    onDeckChange: function(deckId) {
        console.log('deckId changed to: ' + deckId);
        this.setState({ deckId: deckId });
        this.fetchDeckInfo(deckId);
    },

    render: function() {

        var self = this;

        return (
            <div>
                <DeckFilter label="Filter decks:" helpText={this.state.deckId} onChange={this.onDeckChange}/>

                <ReactBootstrap.Button bsStyle="primary" disabled={!this.state.deckId} onClick={this.buttonClicked}>Check!</ReactBootstrap.Button>
                <div className="result">{this.state.response}</div>

                {
                    Object.keys(self.state.decks).map(function(key) {
                        return <DeckButton key={key} deck={self.state.decks[key]} />
                    })
                }
            </div>
        );
    }
});
