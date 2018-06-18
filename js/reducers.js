import { combineReducers } from 'redux';

const currentDeck = (state = null, action) => {
  switch (action.type) {
    case 'CONFIGURE_DECK':
    case 'START_DECK':
      return action.deckId;
    default:
      return state;
  }
};

const decks = (state = {}, action) => {
  switch (action.type) {
    case 'DECK_METADATA_LOADED':
      return action.deckMetadata;
    default:
      return state;
  }
};

const deckMetadata = (state = {}, action) => {
  return state;
};

const config = (state = { randomize: false, showSide: 'front' }, action) => {
  switch (action.type) {
    case 'START_DECK':
      return action.config;
    default:
      return state;
  }
};

export default combineReducers({
  currentDeck,
  config,
  decks,
  deckMetadata
});
