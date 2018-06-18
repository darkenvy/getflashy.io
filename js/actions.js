import { browserHistory } from 'react-router';
import $ from 'jquery';
import log from '../js/components/Logger';

// Action creator function that returns a function (i.e., a thunk).  This fetches the list of decks from the server.
export const fetchDeckMetadata = dispatch => {
  // Notification of the request for decks, for e.g. busy spinner display
  dispatch({ type: 'START_DECK_METADATA_FETCH' });

  return new Promise((resolve, reject) => {
    $.ajax({
      url: '/api/decks',
      dataType: 'json',
      success: resolve,
      error: reject,
    });
  })
    .then(data => {
      for (const deckId in data) data[deckId].id = deckId;
      log.debug(`datum === ${JSON.stringify(data)}`);
      dispatch({ type: 'DECK_METADATA_LOADED', deckMetadata: data });
    })
    .catch((xhr, status, err) => {
      log.fatal('#GET Error', status, err.toString());
    });
};

export const configureDeck = deckId => {
  browserHistory.push(`/config/${deckId}`); // TODO: This is probably very, very bad, but how do we programmatically navigate?
  return { type: 'CONFIGURE_DECK', deckId };
};

export const startDeck = (deckId, config) => {
  browserHistory.push(`/decks/${deckId}`); // TODO: This is probably very, very bad, but how do we programmatically navigate?
  return { type: 'START_DECK', deckId, config };
};

export const showResults = deckId => {
  browserHistory.push(`/results/${deckId}`); // TODO: This is probably very, very bad, but how do we programmatically navigate?
  return { type: 'SHOW_RESULTS', deckId };
};

export const goHome = () => {
  browserHistory.push('/'); // TODO: This is probably very, very bad, but how do we programmatically navigate?
  return { type: 'RETURN_HOME' };
};
