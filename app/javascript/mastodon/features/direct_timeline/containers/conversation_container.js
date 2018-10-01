import { connect } from 'react-redux';
import Conversation from '../components/conversation';

const mapStateToProps = (state, { conversation }) => ({
  accounts: conversation.get('accounts').map(accountId => state.getIn(['accounts', accountId], null)),
  last_status: state.getIn(['statuses', conversation.get('last_status')], null),
});

export default connect(mapStateToProps)(Conversation);
