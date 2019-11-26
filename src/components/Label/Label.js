import React, { useState } from 'react';
import './Label.scss';

const Label = props => {
  const [isSelected, setIsSelected] = useState(props.isSelected);
  const [clickedNum, setClickedNum] = useState(props.clickedNum);
  const onLabelClick = (bool, label) => {
    setIsSelected(bool);
    if (bool) {
      setClickedNum(clickedNum + 1);
    } else {
      if (clickedNum-1 == 0) {
        props.makeLabelDisappear(label);
      } else {
        setClickedNum(clickedNum - 1);
      }
    }
  }
  return (
    <div 
      className={`category-tag ${props.text.toLowerCase()} ${props.selectable ? 'selectable' : ''} ${(props.selectable && !isSelected && !props.isSelected) ? 'not-selected' : ''}`}
      onClick={props.selectable ? ()=>onLabelClick(!isSelected && !props.isSelected, props.text) : (props.onClick ? props.onClick : null)}
    >
      { props.selectable ? props.text + ' +' + clickedNum : props.text }
    </div>
  );
};

export default Label;
