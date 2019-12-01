import React from 'react';
import './Dimmer.scss';

const Dimmer = props => {
  return (
    <div>
      { props.active ?
        <div className={'dimmer'} onClick={props.onClick}></div>
        : ''}
    </div>
  )
}

export default Dimmer;
