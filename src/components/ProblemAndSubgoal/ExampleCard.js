import React, { useState } from 'react';
import './ExampleCard.scss';

const style = {
  padding: '8px 10px 8px 10px',
  width: '100%',
  marginLeft: '-10px',
  zIndex: '1'
};
const ExampleCard = props => {
  return (
    <div className={'example-card-container'}>
      <div className={"step-text"}>Step {props.index+1}</div>
      <div className={"example-icons-container"}>
        <div className={"example-icons-only"}>
          <img 
            className={"example-minus-icon"}
            src={require('../../static/image/minus.png')} 
          />
          <img 
            className={"example-plus-icon"}
            src={require('../../static/image/plus.png')} 
          />
          <div className={'example-handle'}>::</div>
        </div>
        <div style={{ ...style}}>
          <textarea className={'example-card-textarea'} value={props.text} readOnly={true}/>
        </div>
      </div>
    </div>
  )
}
export default ExampleCard;
