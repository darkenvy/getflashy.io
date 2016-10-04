import { connect } from 'react-redux';
import { startDeck } from '../actions';
import DeckList from '../components/DeckList';

const mapStateToProps = (state) => {
    return {
        decks: state.decks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDeckClick: (deck) => {
            dispatch(startDeck(deck.id));
        }
    };
};

const VisibleDeckList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckList);

export default VisibleDeckList;
