import { connect } from 'react-redux';
import { startDeck } from '../actions';
import App from '../components/App';

const mapStateToProps = (state) => {
    return {
        currentDeckId: state.currentDeck
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const VisibleApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default VisibleApp;
