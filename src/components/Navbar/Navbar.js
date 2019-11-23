import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import './Navbar.scss';

const Navbar = () => {
  return (
    <div className={"navbar-container"}>
      <div className={"navbar-inner-container"}>
        <img
          className={"logo"}
          src={require('../../static/image/logo.png')}
          alt={'goalie-logo'}
        />
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

export default Navbar;