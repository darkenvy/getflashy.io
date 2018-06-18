import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import log from '../components/Logger';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFlipped: false,
      visibility: 'visible',
      answerWasShown: false,
      // dragStartX: -1,
    };

    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    // this.onDrag = this.onDrag.bind(this);
    // this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    this.cardRef.focus();
  }

  componentWillReceiveProps(newProps) {
    if (newProps) {
      this.setState(props => Object.assign({}, props, {
        answerWasShown: true,
        cardFlipped: newProps.flipped,
      }));
    }
  }

  componentDidUpdate() {
    this.cardRef.focus();
  }

  onClick(e) {
    log.trace('clicking', e, this);
    this.props.toggleVisibleSide(e);
  }

  onKeyPress(e) {
    log.trace('key down', e.keyCode);
    switch (e.keyCode) {
      case 37: // left
        if (this.state.answerWasShown) this.props.advance(false);
        break;
      case 38: // up
        // TODO: hide card until later
        break;
      case 39: // right
        if (this.state.answerWasShown) this.props.advance(true);
        break;
      case 40: // down
        this.props.toggleVisibleSide(e);
        break;
      default:
        break;
    }
  }

  render() {
    const { card } = this.props;
    log.trace(`flipped? - ${this.state.cardFlipped}`);
    const side = this.state.cardFlipped ? card.back : card.front;

    const cardStyle = { visibility: this.state.visibility };

    let { context1, context2 } = side;
    context1 = context1 ? marked(context1) : context1;
    context2 = context2 ? marked(context2) : context2;
    const context1Style = { display: context1 ? 'block' : 'none' };
    const context2Style = { display: context2 ? 'block' : 'none' };

    const frontHintStyle = { display: this.state.cardFlipped ? 'block' : 'none' };

    let className = 'card';
    if (this.props.advance) {
      className += ' topCard'; // TODO: Find a better way to determine the "topmost" card
    }

    return (
      <div className="card-wrapper">
        <div
          className={className}
          style={cardStyle}
          draggable="true"
          tabIndex={0}
          role="button"
          ref={input => {
            this.cardRef = input;
          }}
          onClick={this.onClick}
          onKeyDown={this.onKeyPress}
          // onDrag={this.onDrag}
          // onDragEnd={this.onDrop}
        >
          <div className="card-top" />

          <div className="card-content">
            <div className="card-content-wrapper">
              <div className="main-card-content">{side.text}</div>
              <div className="context-1" style={context1Style} dangerouslySetInnerHTML={{ __html: context1 }} />
              <div className="context-2" style={context2Style} dangerouslySetInnerHTML={{ __html: context2 }} />
            </div>
          </div>

          <div className="frontHint" style={frontHintStyle}>
            {this.props.card.front.text}
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  toggleVisibleSide: PropTypes.func,
  advance: PropTypes.any,
  card: PropTypes.any,
};

export default Card;
