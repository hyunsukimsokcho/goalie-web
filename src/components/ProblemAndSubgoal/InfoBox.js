import React from 'react';
import { FormattedMessage } from 'react-intl';
import './InfoBox.scss';

const InfoBox = props => {
  let type = '';
  if (props.labelId) {
    if (props.labelId === 'problemBox.description') {
      type = 'desc';
    } else if (props.labelId === 'problemBox.input') {
      type = 'input';
    } else if (props.labelId === 'problemBox.output') {
      type = 'output';
    } else if (props.labelId === 'problemBox.inputexample') {
      type = 'inputexample';
    } else if (props.labelId === 'problemBox.outputexample') {
      type = 'outputexample';
    } else if (props.labelId === "subgoalBox.writeDown") {
      type = 'subgoal'
    }
  }
  return (
    <div className={"info-box-container"}>
      {props.labelId && 
        <FormattedMessage id={props.labelId}>
          {msg => <div className={"info-box-label"}>
            {props.labelId.endsWith('example')? (msg + " " + props.num) : msg}
          </div>}
        </FormattedMessage>
      }
      <textarea 
        readOnly={props.readOnly}
        className={`info-box-input ${type}`}
        value={props.value}
      />
    </div>
  );
}
export default InfoBox;