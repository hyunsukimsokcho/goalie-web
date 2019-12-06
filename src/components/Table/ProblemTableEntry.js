import React from 'react';
import './ProblemTableEntry.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import SmartLabel from '../Label/SmartLabel';
import { submitStatus } from '../../utils';

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
          : <div className={"problem-name-content"}>
              <div>{props.problem.title}</div>
              {/* <SmartLabel text="Creative" selectable={false} /> */}
            </div>
        }
      </div>
      <div className={'problem-correct-rate'}>
        {props.isHeader
          ? <FormattedMessage id={'problemTableEntry.correctRate'} />
          : <div>{(props.submissionRate * 100).toFixed(2) + '%'}</div>
        }
      </div>
      <div className={'problem-submit-status'}>
        {props.isHeader
          ? <FormattedMessage id={'problemTableEntry.status'} />
          : <div className={'status-text-container'}>
              {props.userInfo && props.userInfo[props.problem.meta]
                ? (props.userInfo[props.problem.meta]===submitStatus.done
                    ? <div className={'complete'}>
                        <FormattedMessage id={'problemTableEntry.complete'} />
                      </div>
                    : <div className={'wip'}>
                        <FormattedMessage id={'problemTableEntry.wip'} />
                      </div>
                  )
                : null
              }
            </div>
        }
      </div>
    </div>
  );
}
export default connect(null, { push })(ProblemTableEntry);
