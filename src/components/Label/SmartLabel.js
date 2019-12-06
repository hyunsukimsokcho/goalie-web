import React, { useState } from 'react';
import './SmartLabel.scss';

const SmartLabel = props => {
  return (
    <div 
      className={`smart-label-container ${props.text.toLowerCase()} ${props.selectable ? 'selectable' : ''} ${(props.selectable && !props.isSelected) ? 'not-selected' : ''}`}
      onClick={props.selectable ? ()=>props.handleOnLabelClick(props.text, props.isSelected) : (props.onClick ? props.onClick : null)}
    >
      { props.selectable ? props.text + ' +' + props.clickedNum : props.text }
    </div>
  );
};

export default SmartLabel;
