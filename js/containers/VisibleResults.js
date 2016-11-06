import { connect } from 'react-redux';
import Results from '../components/Results';

const mapStateToProps = (state, ownProps) => {
    return {
        deckId: ownProps.params.deckId, // Don't use redux state for bookmarking purposes
        config: state.config
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const VisibleResults = connect(
    mapStateToProps,
    mapDispatchToProps
)(Results);

export default VisibleResults;
