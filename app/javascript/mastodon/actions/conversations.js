import api from '../api';
import {
  importFetchedAccounts,
  importFetchedStatuses,
  importFetchedStatus,
} from './importer';

export const CONVERSATIONS_FETCH_REQUEST = 'CONVERSATIONS_FETCH_REQUEST';
export const CONVERSATIONS_FETCH_SUCCESS = 'CONVERSATIONS_FETCH_SUCCESS';
export const CONVERSATIONS_FETCH_FAIL    = 'CONVERSATIONS_FETCH_FAIL';
export const CONVERSATIONS_UPDATE        = 'CONVERSATIONS_UPDATE';

export const expandConversations = () => (dispatch, getState) => {
  dispatch(expandConversationsRequest());

  api(getState).get('/api/v1/conversations')
    .then(({ data }) => {
      dispatch(importFetchedAccounts(data.reduce((aggr, item) => aggr.concat(item.accounts), [])));
      dispatch(importFetchedStatuses(data.map(item => item.last_status).filter(x => !!x)));
      dispatch(expandConversationsSuccess(data));
    })
    .catch(err => dispatch(expandConversationsFail(err)));
};

export const expandConversationsRequest = () => ({
  type: CONVERSATIONS_FETCH_REQUEST,
});

export const expandConversationsSuccess = conversations => ({
  type: CONVERSATIONS_FETCH_SUCCESS,
  conversations,
});

export const expandConversationsFail = error => ({
  type: CONVERSATIONS_FETCH_FAIL,
  error,
});

export const updateConversations = conversation => dispatch => {
  dispatch(importFetchedAccounts(conversation.accounts));

  if (conversation.last_status) {
    dispatch(importFetchedStatus(conversation.last_status));
  }

  dispatch({
    type: CONVERSATIONS_UPDATE,
    conversation,
  });
};
