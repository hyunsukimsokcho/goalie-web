import React, { useState } from 'react';
import './SubgoalBox.scss';
import Iterator from './Iterator';

const SubgoalCollection = props => {
  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // props.push(`/${props.probId}/compare`);
    }, 2000);
  }
  return (
    <div className={"subgoal-box-container"}>
      <Iterator labelId={props.isRevise ? "subgoalBox.revise" : "subgoalBox.writeDown"} subgoals={props.subgoals} setSubgoals={props.setSubgoals} />
      <div className={"subgoal-submit-button-container"}>
        <Button theme={"black"} textId={"button.moreSubgoal"} onClick={handleButtonClick} />
      </div>
    </div>
  )
};
export default SubgoalCollection;