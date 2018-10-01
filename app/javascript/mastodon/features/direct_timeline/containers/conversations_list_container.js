import { connect } from 'react-redux';
import ConversationsList from '../components/conversations_list';

const mapStateToProps = state => ({
  conversations: state.get('conversations'),
});

export default connect(mapStateToProps)(ConversationsList);
