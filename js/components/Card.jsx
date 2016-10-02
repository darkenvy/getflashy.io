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

        var card = this.props.card;
        var text = this.props.flipped ? card.back : card.front;

        var context1 = this.props.flipped ? card.backContext1 : card.frontContext1;
        var context1Style = {
            display: context1 ? 'block' : 'none'
        };

        var context2 = this.props.flipped ? card.backContext2 : card.frontContext2;
        var context2Style = {
            display: context2 ? 'block' : 'none'
        };

        var frontHintStyle = {
            display: this.props.flipped ? 'block' : 'none'
        };

        return (
            <div className="card">

                <div className="card-top"></div>

                <div className="card-content">
                    <div className="card-content-wrapper">
                        <div className="main-card-content">
                            {text}
                        </div>
                        <div className="context-1" style={context1Style}>
                            {context1}
                        </div>
                        <div className="context-2" style={context2Style}>
                            {context2}
                        </div>
                    </div>
                </div>

                <div className="frontHint" style={frontHintStyle}>
                    {this.props.card.front}
                </div>
            </div>
        );
    }
}

export default Card;
