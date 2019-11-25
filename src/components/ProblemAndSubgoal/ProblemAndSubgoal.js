import React from 'react';
import { useParams } from 'react-router-dom';
import ProblemBox from './ProblemBox';
import SubgoalBox from './SubgoalBox';
import './ProblemAndSubgoal.scss';

const ProblemAndSubgoal = () => {
  const { probId } = useParams();
  const dummyProbObj = {
    find_average: {
      description: 
        `Find an average of the given numbers. For example, if you have 1, 2, 3, 4, 5, then the average of the given 5 numbers is calculated as (1+2+3+4+5)/5 = 3`,
      input: 
        `N in the first row and N numbers in the second row.

[Example]
3
10 20 30`,
      output: 
        `Average of the given N numbers.

[Example]
20`
    },
  }
  return (
    <div className={"problem-and-subgoal-container"}>
      <ProblemBox problem={dummyProbObj["find_average"]}/>
      <SubgoalBox isMine={true} subgoal={["first", "second"]} />
    </div>
  );
}

export default ProblemAndSubgoal;