import React from 'react';
import './ProblemTableEntry.scss';
import { FormattedMessage } from 'react-intl';

const ProblemTableEntry = props => {
  return (
    <div className={`problem-table-entry-container ${props.isHeader ? 'table-header' : ''}`}>
      <div className={'problem-number'}>
        <FormattedMessage id={props.isHeader ? 'problemTableEntry.number' : props.problem} />
      </div>
      <div className={'problem-name'}>
        <FormattedMessage id={props.isHeader ? 'problemTableEntry.name' : props.problem} />
      </div>
      <div className={'problem-correct-rate'}>
        <FormattedMessage id={props.isHeader ? 'problemTableEntry.correctRate' : props.problem} />
      </div>
    </div>
  );
}

export default ProblemTableEntry;