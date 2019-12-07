import React, { useEffect } from 'react';
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

  useEffect(()=>{
    var obj = document.getElementsByClassName(`info-box-input ${type}` + (props.labelId.endsWith('example')? ` ` + props.num : ``));
    obj[0].style.height = '0px';
    obj[0].style.height = (obj[0].scrollHeight+5)+`px`;
  });

  return (
    <div className={"info-box-container"}>
      {props.labelId && 
        <FormattedMessage id={props.labelId}>
          {msg => 
            <div className={"info-box-label"}>
              {props.labelId.endsWith('example') ? (msg + " " + props.num) : msg}
            </div>
          }
        </FormattedMessage>
      }
      <textarea 
        readOnly={props.readOnly}
        className={`info-box-input ${type}` + (props.labelId.endsWith('example')? ` ` + props.num : ``)}
        value={props.value}
      />
    </div>
  );
}
export default InfoBox;