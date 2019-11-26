import React from 'react';
import ExampleBox from './ExampleBox';

const SubgoalExamples = props => {
  const examples = [
    ["Add", "Average", "Print"],
    ["AddADd", "AverageAVERAGE", "PrintOPRINT"],
  ];
  const renderExamples = (example, index) => {
    return (
      <ExampleBox
        id={'example-box-' + index}
        key={index}
        index={index}
        example={example}
      />
    )
  };
  return (
    <>
      <div className={"subgoal-examples-conatiner"}>{examples.map((example, i) => renderExamples(example, i))}</div>
    </>
  )
};
export default SubgoalExamples;
