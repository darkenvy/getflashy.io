import React from 'react';
// import { Link } from 'react-router';
import { FormGroup, ButtonGroup, Button, ControlLabel, HelpBlock, Panel } from 'react-bootstrap';

class DeckConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSide: 'front' };

        // Manually bind this method to the component instance so "this" is what we expect
        this.startDeck = this.startDeck.bind(this);
        this.setShowSide = this.setShowSide.bind(this);
    }

    startDeck() {
        // TODO: Validation of inputsw
        this.props.onDeckConfigure(this.props.deckId);
    }

    setShowSide(side) {
        this.setState({ showSide: side });
    }

    render() {

        return (
            <div className="container">

                <div className="config-header">
                    <h2>Get Ready!</h2>
                    <p>
                        Let us know how you'd like to go through this deck of flashcards.
                    </p>
                </div>

                <Panel className="app-form">

                    <FormGroup controlId="formBasicText">
                        <ControlLabel className="config-label">Show me:</ControlLabel>
                        <div className="nonstandard-form-control">
                            <ButtonGroup>
                                <Button onClick={() => { this.setShowSide('front'); }}
                                    bsStyle={this.state.showSide === 'front' ? 'primary' : 'default'}>Front side</Button>
                                <Button onClick={() => { this.setShowSide('back'); }}
                                    bsStyle={this.state.showSide !== 'front' ? 'primary' : 'default'}>Back side</Button>
                            </ButtonGroup>
                            <HelpBlock className="inline-help-block">("Front side" is typical)</HelpBlock>
                        </div>
                    </FormGroup>


                    <div className="config-submit-button-area">
                        <Button onClick={this.startDeck}>Start flipping!</Button>
                    </div>
                </Panel>
            </div>
        );
    }
}

export default DeckConfig;
