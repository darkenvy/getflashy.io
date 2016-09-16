window.DeckFilter = React.createClass({

    getInitialState: function() {
        return { deckId: '' };
    },

    handleDeckIdChange: function(e) {
        var newDeckId = e.target.value;
        this.setState({ deckId: newDeckId });
        if (this.props.onChange) {
            this.props.onChange(newDeckId);
        }
    },

    render: function() {
        return (
            <div>

                <ReactBootstrap.FormGroup
                    controlId="formBasicText"
                >
                    <ReactBootstrap.ControlLabel>{this.props.label}</ReactBootstrap.ControlLabel>
                    <ReactBootstrap.FormControl
                        type="text"
                        placeholder="Example: State Capitals"
                        onChange={this.handleDeckIdChange}
                    />
                    <ReactBootstrap.FormControl.Feedback />
                    <ReactBootstrap.HelpBlock>{this.props.helpText || "(Unknown deck)"}</ReactBootstrap.HelpBlock>
                </ReactBootstrap.FormGroup>

            </div>
        );
    }
});
