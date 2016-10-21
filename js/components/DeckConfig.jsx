import React from 'react';
// import { Link } from 'react-router';
import { FormGroup, ButtonGroup, Button, ControlLabel, HelpBlock, Panel, Checkbox } from 'react-bootstrap';

class DeckConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSide: 'front', randomize: true };

        // Manually bind this method to the component instance so "this" is what we expect
        this.startDeck = this.startDeck.bind(this);
        this.setShowSide = this.setShowSide.bind(this);
        this.toggleRandomize = this.toggleRandomize.bind(this);
    }

    startDeck() {

        // TODO: Validation of inputs
        const config = {
            showSide: this.state.showSide,
            randomize: this.state.randomize
        };
        this.props.onDeckConfigure(this.props.deckId, config);
    }

    setShowSide(side) {
        this.setState({ showSide: side });
    }

    toggleRandomize() {
        this.setState({ randomize: !this.state.randomize });
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

                    <FormGroup controlId="formBasicText">
                        <ControlLabel className="config-label">Show details:</ControlLabel>
                        <div className="nonstandard-form-control">
                            <ButtonGroup>
                                <Button onClick={() => { ; }}
                                        bsStyle={this.state.showDetails === 'always' ? 'primary' : 'default'}>Always</Button>
                                <Button onClick={() => { ; }}
                                        bsStyle={this.state.showDetails === 'never' ? 'primary' : 'default'}>Never</Button>
                                <Button onClick={() => { ; }}
                                        bsStyle={this.state.showDetails === 'beforeFlipping' ? 'primary' : 'default'}>Before flipping</Button>
                            </ButtonGroup>
                        </div>
                    </FormGroup>

                    <FormGroup controlId="formBasicText">
                        <ControlLabel className="config-label">Miscellaney:</ControlLabel>
                        <div className="nonstandard-form-control">
                            <Checkbox checked={this.state.randomize} onChange={this.toggleRandomize}>Randomize</Checkbox>
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
