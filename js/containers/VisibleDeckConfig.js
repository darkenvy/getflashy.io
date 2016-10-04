import { connect } from 'react-redux';
import Deck from '../components/DeckConfig';

const mapStateToProps = (state, ownProps) => {
    return {
        deckId: ownProps.routeParams.deckId // Don't rely on state for bookmarking
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const VisibleDeckConfig = connect(
    mapStateToProps,
    mapDispatchToProps
)(Deck);

export default VisibleDeckConfig;
