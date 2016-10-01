import React from 'react';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };

    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className="card">
                <div className="card-top"></div>
                <div>
                    Front: {this.props.card.front}
                </div>
                <div>
                    Back: {this.props.card.back}
                </div>
            </div>
        );
    }
}

export default Card;
