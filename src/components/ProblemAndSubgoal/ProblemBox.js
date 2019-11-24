import React from 'react';
import './ProblemBox.scss';
import InfoBox from './InfoBox';

const ProblemBox = props => {
  return (
    <div className={"problem-box-container"}>
      <InfoBox readOnly={true} labelId={"problemBox.description"} value={props.problem.description} />
      <InfoBox readOnly={true} labelId={"problemBox.input"} value={props.problem.input} />
      <InfoBox readOnly={true} labelId={"problemBox.output"} value={props.problem.output} />
    </div>
  )
};

export default ProblemBox;