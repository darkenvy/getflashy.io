import React from 'react';
// import { Link } from 'react-router';
import { FormGroup, ButtonGroup, Button, ControlLabel, HelpBlock, Panel, Checkbox } from 'react-bootstrap';

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };

        // Manually bind this method to the component instance so "this" is what we expect
        // this.startDeck = this.startDeck.bind(this);
    }

    render() {

        return (
            <div className="container">

                <div className="config-header">
                    <h2>All Done!</h2>
                    <p>
                        Here's you you did:
                    </p>
                </div>

                <Panel className="app-form">

                    Amazing!!!
                </Panel>
            </div>
        );
    }
}

export default Results;
