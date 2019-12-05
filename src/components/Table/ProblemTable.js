import React from 'react';
import ProblemTableEntry from './ProblemTableEntry';
import './ProblemTable.scss';

const ProblemTable = props => {
  console.log('p', props.problemListCollection);
  return (
    <div className={'problem-table-container'}>
      <ProblemTableEntry isHeader={true} />
      {
        props.problemListCollection[props.currShownList.key].map((problem, i) => {
          return (<ProblemTableEntry key={i+1} number={i+1} problem={problem} setProblem={props.setProblem} />);
        })
      }
    </div>
  );
}

export default ProblemTable;