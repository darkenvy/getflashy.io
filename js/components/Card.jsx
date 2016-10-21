import React from 'react';
import marked from 'marked';

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
        var side = this.props.flipped ? card.back : card.front;

        var context1 = side.context1;
        var context1Style = {
            display: context1 ? 'block' : 'none'
        };

        var context2 = side.context2;
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
                            {side.text}
                        </div>
                        <div className="context-1" style={context1Style} dangerouslySetInnerHTML={{__html: marked(context1)}}>
                        </div>
                        <div className="context-2" style={context2Style} dangerouslySetInnerHTML={{__html: marked(context2)}}>
                        </div>
                    </div>
                </div>

                <div className="frontHint" style={frontHintStyle}>
                    {this.props.card.front.text}
                </div>
            </div>
        );
    }
}

export default Card;
