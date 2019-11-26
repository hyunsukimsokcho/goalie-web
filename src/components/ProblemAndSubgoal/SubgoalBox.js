import React, { useState } from 'react';
import './SubgoalBox.scss';
import Iterator from './Iterator';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const SubgoalBox = props => {
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (!props.isRevise) {
        props.push(`/${props.probId}/compare`);
      }
    }, 2000);
  }
  return (
    <div className={"subgoal-box-container"}>
      <Iterator labelId={props.isRevise ? "subgoalBox.revise" : "subgoalBox.writeDown"} subgoals={props.subgoals} setSubgoals={props.setSubgoals} />
      <div className={"subgoal-submit-button-container"}>
        <Button theme={"primary"} textId={props.isRevise ? "button.revise" : "button.submit"} onClick={handleButtonClick} isLoading={isLoading} />
      </div>
    </div>
  )
};
export default connect(null, { push })(SubgoalBox);