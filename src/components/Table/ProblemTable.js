import React from 'react';
import ProblemTableEntry from './ProblemTableEntry';
import './ProblemTable.scss';

const ProblemTable = props => {
  return (
    <div className={'problem-table-container'}>
      <ProblemTableEntry isHeader={true} />
      {
        props.problemListCollection[props.currShownList.key].map((problem, i) => {
          return (<ProblemTableEntry key={i+1} number={i+1} problem={problem} />);
        })
      }
    </div>
  );
}

export default ProblemTable;