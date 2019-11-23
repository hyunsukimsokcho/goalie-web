import React from 'react';
import ProblemTableEntry from './ProblemTableEntry';
import './ProblemTable.scss';

const ProblemTable = props => {
  return (
    <div className={'problem-table-conatiner'}>
      <ProblemTableEntry isHeader={true} />
      {
        props.problemList.map(problem => {
          return (<ProblemTableEntry problem={problem} />);
        })
      }
    </div>
  );
}

export default ProblemTable;