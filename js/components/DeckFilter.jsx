import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class DeckFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { deckId: '' };

        // Manually bind this method to the component instance so "this" is what we expect
        this.handleDeckIdChange = this.handleDeckIdChange.bind(this);
    }

    handleDeckIdChange(e) {
        var newDeckId = e.target.value;
        this.setState({ deckId: newDeckId });
        if (this.props.onChange) {
            this.props.onChange(newDeckId);
        }
    }

    render() {
        return (
            <div>

                <FormGroup
                    controlId="formBasicText"
                >
                    <ControlLabel>{this.props.label}</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Example: State Capitals"
                        onChange={this.handleDeckIdChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>{this.props.helpText || "(Unknown deck)"}</HelpBlock>
                </FormGroup>

            </div>
        );
    }
}

export default DeckFilter;
