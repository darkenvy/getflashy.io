import { connect } from 'react-redux';
import Deck from '../components/Deck';

const mapStateToProps = (state, ownProps) => {
    return {
        deckId: ownProps.params.deckId // Don't use redux state for bookmarking purposes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const VisibleDeck = connect(
    mapStateToProps,
    mapDispatchToProps
)(Deck);

export default VisibleDeck;
