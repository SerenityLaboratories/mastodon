import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import ConversationContainer from '../containers/conversation_container';

export default class ConversationsList extends ImmutablePureComponent {

  static propTypes = {
    conversations: ImmutablePropTypes.list.isRequired,
  };

  render () {
    const { conversations } = this.props;

    return (
      <div className='scrollable'>
        {conversations.map(item => (
          <ConversationContainer key={item.get('id')} conversation={item} />
        ))}
      </div>
    );
  }

}
