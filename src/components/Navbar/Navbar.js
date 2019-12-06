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
          {props.isAuthenticated &&
            <div className={"welcome"}>
              <FormattedMessage id={"navbar.welcome"} />
              <div className={"account"}>
                { props.account }
              </div>
            </div>
          }
          {!props.isLoading &&
            <div className={"signin"} onClick={props.isAuthenticated ? props.signOut : props.signInWithGoogle}>
              <FormattedMessage id={props.isAuthenticated ? "navbar.signout" : "navbar.signin"} />
            </div>
          }
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