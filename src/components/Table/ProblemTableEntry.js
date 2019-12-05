import React from 'react';
import './ProblemTableEntry.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const ProblemTableEntry = props => {
  const goToProblem = () => {
    props.push(`/${props.problem.meta}`);
    if (props.problem) {
      props.setProblem(props.problem);
    }
  }
  return (
    <div 
      className={`problem-table-entry-container ${props.isHeader ? 'table-header' : ''}`}
      onClick={props.isHeader ? null : ()=>goToProblem()}
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
          : <div>{(props.submissionRate * 100).toFixed(2) + '%'}</div>
        }
      </div>
    </div>
  );
}
export default connect(null, { push })(ProblemTableEntry);
