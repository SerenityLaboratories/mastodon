import { List as ImmutableList, fromJS as ConvertToImmutable } from 'immutable';
import { CONVERSATIONS_FETCH_SUCCESS, CONVERSATIONS_UPDATE } from '../actions/conversations';

const initialState = ImmutableList([]);

const normalize = item => ({
  id: item.id,
  accounts: item.accounts.map(a => a.id),
  last_status: item.last_status.id,
});

const normalizeConversations = items => ConvertToImmutable(items.map(normalize));

const updateConversation = (state, item) => state.map(conversation => {
  if (conversation.get('id') === item.id) {
    return ConvertToImmutable(normalize(item));
  }

  return conversation;
});

export default function conversations(state = initialState, action) {
  switch (action.type) {
  case CONVERSATIONS_FETCH_SUCCESS:
    return normalizeConversations(action.conversations);
  case CONVERSATIONS_UPDATE:
    return updateConversation(state, action.conversation);
  default:
    return state;
  }
};
