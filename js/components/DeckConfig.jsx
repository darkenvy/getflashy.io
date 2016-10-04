import React from 'react';
import { Link } from 'react-router';

class DeckConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };

    }

    componentDidMount() {
    }

    // onDeckFilterChange(filter) {
    //     this.setState({ deckFilter: filter });
    // }

    render() {

        return (
            <div className="container">
                <p>
                    Configure that deck! - {this.props.deckId}
                </p>
                <Link to={"/" + this.props.deckId}>Start flipping!</Link>
            </div>
        );
    }
}

export default DeckConfig;
