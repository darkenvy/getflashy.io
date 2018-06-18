/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import $ from 'jquery';

/**
 * A rendered card (either the current card, or the one beneath it).
 */
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardFlipped: false,
      visibility: 'visible',
      dragStartX: -1,
    };

    this.onClick = this.onClick.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {}

  componentDidMount() {
    // Poor man's way of knowing we're not the "top" card
    // TODO: Detect this scenario better
    if (this.props.advance) {
      $(document).on('keyup.deck', e => {
        if (this.state.animating) {
          console.log('animating, not honoring key press');
          return;
        }
        console.log('not animating, honoring key press');
        switch (e.key) {
          case 'ArrowRight':
            this.setUserKnew(true);
            e.stopPropagation();
            e.preventDefault();
            break;
          case 'ArrowLeft':
            this.setUserKnew(false);
            e.stopPropagation();
            e.preventDefault();
            break;
          case 'ArrowDown':
            if (!this.state.cardFlipped) {
              this.setState({ cardFlipped: true });
            }
            e.stopPropagation();
            e.preventDefault();
            break;
          case 'ArrowUp':
            if (this.state.cardFlipped) {
              this.setState({ cardFlipped: false });
            }
            e.stopPropagation();
            e.preventDefault();
            break;
          default:
            break;
        }
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps) this.setState(props => Object.assign({}, props, { cardFlipped: newProps.flipped }));
    console.log('component will recieve props', this.props, newProps);
  }

  componentWillUnmount() {
    console.log(':(:(:(:(:(');
    $(document).off('keyup.deck');
  }

  onClick(e) {
    console.log('clicking', e, this);
    this.props.toggleVisibleSide(e);
  }

  onDrag(e) {
    console.log(`Dragging! - ${e.screenX}`);
    this.setState({ visibility: 'hidden', dragStartX: e.screenX });
  }

  onDrop(e) {
    const delta = e.screenX - this.state.dragStartX;
    console.log(e.screenX, this.state.dragStartX, delta);
    if (delta > 100) {
      // Swipe to the right => knew the word
      this.props.advance(true);
    } else if (delta < -100) {
      // Swipe to the left => didn't know the card
      this.props.advance(false);
    }

    console.log('Dropped');
    this.setState({ visibility: 'visible', dragStartX: -1 });
  }

  setUserKnew(knew) {
    const animClassName = knew ? 'sliding-right' : 'sliding-left';

    const $card = $('.card.topCard');
    $card.addClass(animClassName);
    this.setState({ animating: true });
    $card.one('animationend', () => {
      console.log('Animation ended');
      $card.removeClass(animClassName);
      this.setState({ animating: false });
      this.props.advance(knew);
    });
  }

  render() {
    const { card } = this.props;
    console.log(`flipped? - ${this.state.cardFlipped}`);
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
      className += ' topCard';
    } // TODO: Find a better way to determine the "topmost" card

    return (
      <div className="card-wrapper">
        <div
          className={className}
          style={cardStyle}
          // draggable="true"
          onClick={this.onClick}
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
