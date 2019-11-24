import React from 'react';
import './ProblemTableEntry.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const ProblemTableEntry = props => {
  return (
    <div 
      className={`problem-table-entry-container ${props.isHeader ? 'table-header' : ''}`}
      onClick={props.isHeader ? null : ()=>props.push(`/${props.problem.id}`)}
    >
      <div className={'problem-number'}>
        <FormattedMessage id={props.isHeader ? 'problemTableEntry.number' : props.number} />
      </div>
      <div className={'problem-name'}>
        <FormattedMessage id={props.isHeader ? 'problemTableEntry.name' : props.problem.name} />
      </div>
      <div className={'problem-correct-rate'}>
        <FormattedMessage id={props.isHeader ? 'problemTableEntry.correctRate' : props.problem.corrRate + '%'} />
      </div>
    </div>
  );
}
export default connect(null, { push })(ProblemTableEntry);
