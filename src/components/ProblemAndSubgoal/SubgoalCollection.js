import React, { useState } from 'react';
import './SubgoalCollection.scss';
import SubgoalExamples from './SubgoalExamples';
import { randomExNumMax } from './SubgoalExamples';
import Button from '../Button/Button';

const SubgoalCollection = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [moreSubgoal, setMoreSubgoal] = useState(false);
  const [randomExNum, setRandomExNum] = useState(0);
  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      if(randomExNum + 1 >= randomExNumMax) setIsDisabled(true);
      setRandomExNum(randomExNum + 1);
      setIsLoading(false);
      setMoreSubgoal(true);
      
    }, 2000);
  }
  return (
    <div className={"subgoal-collection-container"}>
      <SubgoalExamples randomExNum={randomExNum} moreSubgoal={moreSubgoal} subgoal={props.subgoal} setMoreExamplesDisabled={setIsDisabled} />
      {!isDisabled &&
        <div className={"subgoal-see-more-button-container"}>
          <Button 
            theme={"black"} 
            textId={"button.moreSubgoal"} 
            isLoading={isLoading} 
            onClick={handleButtonClick} 
            isDisabled={isDisabled} 
          />
        </div>
      }
    </div>
  )
};
export default SubgoalCollection;