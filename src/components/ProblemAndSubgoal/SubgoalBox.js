import React from 'react';
import './SubgoalBox.scss';
import InfoBox from './InfoBox';

const SubgoalBox = props => {
  return (
    <div className={"subgoal-box-container"}>
      <InfoBox labelId={"subgoalBox.writeDown"} value={props.subgoal} />
    </div>
  )
};
export default SubgoalBox;