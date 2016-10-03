import { connect } from 'react-redux';
import { startDeck } from '../actions';
import DeckList from '../components/DeckList';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
};

const mapStateToProps = (state) => {
    //
    return {
        // todos: getVisibleTodos(state.todos, state.visibilityFilter)
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
