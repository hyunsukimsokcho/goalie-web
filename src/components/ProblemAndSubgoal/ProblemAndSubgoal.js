import React from 'react';
import { useParams } from 'react-router-dom';

const ProblemAndSubgoal = () => {
  const { probId } = useParams();
  return (
    <div>{probId}</div>
    // <div>
    //   <ProblemBox />
    //   <SubgoalBox isMine={true} />
    // </div>
  );
}

export default ProblemAndSubgoal;