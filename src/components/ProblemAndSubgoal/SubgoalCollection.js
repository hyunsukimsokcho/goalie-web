import React, { useState } from 'react';
import './SubgoalCollection.scss';
import SubgoalExamples from './SubgoalExamples';
import Button from '../Button/Button';

const SubgoalCollection = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [moreSubgoal, setMoreSubgoal] = useState(false);
  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMoreSubgoal(true);
      setIsDisabled(true);
    }, 2000);
  }
  return (
    <div className={"subgoal-collection-container"}>
      <SubgoalExamples moreSubgoal={moreSubgoal} subgoal={props.subgoal} />
      <div className={"subgoal-see-more-button-container"}>
        <Button theme={"black"} textId={"button.moreSubgoal"} isLoading={isLoading} onClick={handleButtonClick} isDisabled={isDisabled} />
      </div>
    </div>
  )
};
export default SubgoalCollection;