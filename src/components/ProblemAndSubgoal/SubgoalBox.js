import React from 'react';
import './SubgoalBox.scss';
import Iterator from './Iterator';
import Button from '../Button/Button';

const SubgoalBox = props => {
  return (
    <div className={"subgoal-box-container"}>
      <Iterator labelId={"subgoalBox.writeDown"} value={props.subgoal} />
      <div className={"subgoal-submit-button-container"}>
        <Button theme={"primary"} textId={"button.submit"}/>
      </div>
    </div>
  )
};
export default SubgoalBox;