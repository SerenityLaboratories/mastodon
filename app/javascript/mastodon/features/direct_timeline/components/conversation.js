import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
//import DisplayName from '../../../components/display_name';
import StatusContent from '../../../components/status_content';
import RelativeTimestamp from '../../../components/relative_timestamp';

const shortDisplayName = account => {
  return account.get('acct').split('@')[0];
};

export default class Conversation extends ImmutablePureComponent {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    conversation: ImmutablePropTypes.map.isRequired,
    accounts: ImmutablePropTypes.list.isRequired,
    last_status: ImmutablePropTypes.map.isRequired,
  };

  handleClick = () => {
    if (!this.context.router) {
      return;
    }

    const { last_status } = this.props;
    this.context.router.history.push(`/statuses/${last_status.get('id')}`);
  }

  render () {
    const { accounts, last_status } = this.props;

    if (last_status === null) {
      return null;
    }

    return (
      <div className='conversation'>
        <div className='conversation__names'>
          {accounts.map(account => <bdi key={account.get('id')}>{shortDisplayName(account)}</bdi>).reduce((prev, cur) => [prev, ', ', cur])}
        </div>

        <div className='conversation__time'>
          <RelativeTimestamp timestamp={last_status.get('created_at')} />
        </div>

        <StatusContent status={last_status} onClick={this.handleClick} />
      </div>
    );
  }

}
