import React from 'react';
import './ProblemBox.scss';
import InfoBox from './InfoBox';

const ProblemBox = props => {
  return (
    <div className={"problem-box-container"}>
      <InfoBox readOnly={true} labelId={"problemBox.description"} value={props.problem.description.replace(/\\n/g, '\n')} />
      <InfoBox readOnly={true} labelId={"problemBox.input"} value={props.problem.input.replace(/\\n/g, '\n')} />
      <InfoBox readOnly={true} labelId={"problemBox.output"} value={props.problem.output.replace(/\\n/g, '\n')} />
      {props.problem.examples
        .map((example, i) => 
          <div>
            <InfoBox readOnly={true} labelId={"problemBox.inputexample"} value={example.input.replace(/\\n/g, '\n')} num={i+1} />
            <InfoBox readOnly={true} labelId={"problemBox.outputexample"} value={example.output.replace(/\\n/g, '\n')} num={i+1} />
          </div>
        )
      }
    </div>
  )
};

export default ProblemBox;