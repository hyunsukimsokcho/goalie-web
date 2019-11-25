import React from 'react';
import './SubgoalBox.scss';
import InfoBox from './InfoBox';
import Button from '../Button/Button';

const SubgoalBox = props => {
  return (
    <div className={"subgoal-box-container"}>
      <InfoBox labelId={"subgoalBox.writeDown"} value={props.subgoal} />
      <Button theme={"primary"} textId={"button.submit"}/>
    </div>
  )
};
export default SubgoalBox;