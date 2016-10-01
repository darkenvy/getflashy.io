import React from 'react';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showing: 'front' };

    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {

        var text = this.props.flipped ? this.props.card.back : this.props.card.front;

        var style = {
            display: this.props.flipped ? 'block' : 'none'
        };

        return (
            <div className="card">

                <div className="card-top"></div>

                <div className="card-content">
                    <div className="main-card-content">
                        {text}
                    </div>
                </div>

                <div className="frontHint" style={style}>
                    {this.props.card.front}
                </div>
            </div>
        );
    }
}

export default Card;
