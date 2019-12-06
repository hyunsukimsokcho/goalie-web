import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import './Navbar.scss';
import ProblemTab from '../Tab/ProblemTab';

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
        {props.problem.title && props.pathname !== '/' &&
          <div className={"problem-title-container"}>
            <FormattedMessage id={"navbar.problemTitle"} />
            <div className={"problem-title"}>{props.problem.title}</div>
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