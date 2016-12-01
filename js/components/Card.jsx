import React from 'react';
import marked from 'marked';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showing: 'front', visibility: 'visible', dragStartX: -1 };

    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    onClick(e) {
        this.props.toggleVisibleSide(e);
    }

    onDrag(e) {
        console.log('Dragging! - ' + e.screenX);
        this.setState({ visibility: 'hidden', dragStartX: e.screenX });
    }

    onDrop(e) {

        const delta = e.screenX - this.state.dragStartX;
        console.log(e.screenX, this.state.dragStartX, delta);
        if (delta > 100) {
            // Swipe to the right => knew the word
            this.props.advance(true);
        }
        else if (delta < -100) {
            // Swipe to the left => didn't know the card
            this.props.advance(false);
        }

        console.log('Dropped');
        this.setState({ visibility: 'visible', dragStartX: -1 });
    }

    render() {

        const card = this.props.card;
        const side = this.props.flipped ? card.back : card.front;

        const cardStyle = {
            visibility: this.state.visibility
        };

        let context1 = side.context1;
        context1 = context1 ? marked(context1) : context1;
        const context1Style = {
            display: context1 ? 'block' : 'none'
        };

        let context2 = side.context2;
        context2 = context2 ? marked(context2) : context2;
        const context2Style = {
            display: context2 ? 'block' : 'none'
        };

        const frontHintStyle = {
            display: this.props.flipped ? 'block' : 'none'
        };

        return (
            <div className="card" style={cardStyle} draggable="true"
                 onClick={this.onClick.bind(this)} onDrag={this.onDrag.bind(this)} onDragEnd={this.onDrop.bind(this)}>

                <div className="card-top"></div>

                <div className="card-content">
                    <div className="card-content-wrapper">
                        <div className="main-card-content">
                            {side.text}
                        </div>
                        <div className="context-1" style={context1Style} dangerouslySetInnerHTML={{__html: context1}}>
                        </div>
                        <div className="context-2" style={context2Style} dangerouslySetInnerHTML={{__html: context2}}>
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
