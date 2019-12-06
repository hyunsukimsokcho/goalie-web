import React from 'react';
import './SmartLabel.scss';

const SmartLabel = props => {
  return (
    <div 
      className={`smart-label-container ${props.text.toLowerCase()} ${props.selectable ? 'selectable' : ''} ${(props.selectable && !props.isSelected) ? 'not-selected' : ''}`}
      onClick={props.selectable ? ()=>props.handleOnLabelClick(props.text, props.isSelected) : (props.onClick ? props.onClick : null)}
    >
      {'+' + props.clickedNum}
      <span className={"tooltip-text"}>{props.text}</span>
    </div>
  );
};

export default SmartLabel;
