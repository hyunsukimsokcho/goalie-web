import React from 'react';
import './ProblemTableEntry.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const ProblemTableEntry = props => {
  return (
    <div 
      className={`problem-table-entry-container ${props.isHeader ? 'table-header' : ''}`}
      onClick={props.isHeader ? null : ()=>{props.push(`/${props.problem.meta}`); props.setProblem(props.problem)}}
    >
      <div className={'problem-number'}>
        {props.isHeader
          ? <FormattedMessage id={'problemTableEntry.number'} />
          : <div>{props.number}</div>
        }
      </div>
      <div className={'problem-name'}>
        {props.isHeader
          ? <FormattedMessage id={'problemTableEntry.name'} />
          : <div>{props.problem.title}</div>
        }
        
      </div>
      <div className={'problem-correct-rate'}>
        {props.isHeader
          ? <FormattedMessage id={'problemTableEntry.correctRate'} />
          : <div>{props.problem.corrRate + '%'}</div>
        }
      </div>
    </div>
  );
}
export default connect(null, { push })(ProblemTableEntry);
