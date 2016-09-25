window.AppContent = React.createClass({

    getInitialState: function() {
        return { state: 'select-deck', deck: '' };
    },

    startDeck: function(deckName) {
        this.setState({ state: 'view-deck', deck: deckName });
    },

    render: function () {

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
});

ReactDOM.render(React.createElement(window.AppContent),
    document.getElementById('app-content')
);
