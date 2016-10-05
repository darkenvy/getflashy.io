import React from 'react';
// import { Link } from 'react-router';
import { FormGroup, ButtonGroup, Button, ControlLabel, HelpBlock } from 'react-bootstrap';

class DeckConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSide: 'front' };

        // Manually bind this method to the component instance so "this" is what we expect
        this.startDeck = this.startDeck.bind(this);
        this.setShowSide = this.setShowSide.bind(this);
    }

    componentDidMount() {
    }

    startDeck() {
        console.log('Validate, then go to /decks/ + this.props.deckId (probably in an action?)');
    }

    setShowSide(side) {
        this.setState({ showSide: side });
    }

    render() {

        return (
            <div className="container">

                <div className="app-form">

                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Show me</ControlLabel>
                        <ButtonGroup>
                            <Button onClick={() => { this.setShowSide('front'); }}
                                bsStyle={this.state.showSide === 'front' ? 'primary' : 'default'}>Front side</Button>
                            <Button onClick={() => { this.setShowSide('back'); }}
                                bsStyle={this.state.showSide !== 'front' ? 'primary' : 'default'}>Back side</Button>
                        </ButtonGroup>
                        <HelpBlock>("Front side" is typical)</HelpBlock>
                    </FormGroup>

                </div>

                <div className="config-submit-button-area">
                    <Button onClick={this.startDeck}>Start flipping!</Button>
                </div>
            </div>
        );
    }
}

export default DeckConfig;
