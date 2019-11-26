import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import './Navbar.scss';

const Navbar = props => {
  return (
    <div className={"navbar-container"}>
      <div className={"navbar-inner-container"}>
        <img
          className={"logo"}
          src={require('../../static/image/logo.png')}
          alt={'goalie-logo'}
          onClick={props.pathname === '/' ? null : ()=>props.push('/')}
        />
        {false &&
          <div className={"main-buttons"}>
            <div className={"project-look-around"}>
              <FormattedMessage id={"navbar.recommend"}>
                {msg => <div className={'text'}>{msg}</div>}
              </FormattedMessage>
            </div>
            <div className={"project-start"}>
              <FormattedMessage id={"navbar.recent"} />
            </div>
          </div>
        }
        <div className={"search-and-sub-buttons"}>
          <div className={"signup"}>
            <FormattedMessage id={"navbar.signup"} />
          </div>
          <div className={"signin"}>
            <FormattedMessage id={"navbar.signin"} />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})
export default connect(mapStateToProps, { push })(Navbar);