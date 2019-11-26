import React, { useState } from 'react';
import './Label.scss';

// interface Props {
//   text: string;
//   deleteable?: boolean;
//   onClick?: () => void;
// }
const Label = props => {
  const [isSelected, setIsSelected] = useState(false);
  const [clickedNum, setClickedNum] = useState(props.clickedNum);
  const onLabelClick = bool => {
    setIsSelected(bool);
    if (bool) {
      setClickedNum(clickedNum + 1);
    } else {
      setClickedNum(clickedNum - 1);
    }
  }
  return (
    <div 
      className={`category-tag ${props.text.toLowerCase()} ${props.selectable ? 'selectable' : ''} ${props.selectable && !isSelected ? 'not-selected' : ''}`}
      onClick={props.selectable ? ()=>onLabelClick(!isSelected) : null}
    >
      { props.selectable ? props.text + '   +' + clickedNum : props.text}
      {/* {props.selectable && (
        <div className="label-clicked-num">+{clickedNum}</div>
      )} */}
    </div>
  );
};

export default Label;
