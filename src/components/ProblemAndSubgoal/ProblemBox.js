import React from 'react';
import './ProblemBox.scss';
import InfoBox from './InfoBox';

const ProblemBox = props => {
  return (
    <div className={"problem-box-container"}>
      <InfoBox readOnly={true} labelId={"problemBox.description"} value={props.problem.description} />
      <InfoBox readOnly={true} labelId={"problemBox.input"} value={props.problem.input} />
      <InfoBox readOnly={true} labelId={"problemBox.output"} value={props.problem.output} />
      {props.problem.example
        .map((example, i) => 
          <div>
            <InfoBox readOnly={true} labelId={"problemBox.inputexample"} value={example[0]} num={i+1} />
            <InfoBox readOnly={true} labelId={"problemBox.outputexample"} value={example[1]} num={i+1} />
          </div>
        )
      }
    </div>
  )
};

export default ProblemBox;