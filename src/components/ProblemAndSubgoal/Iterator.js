import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './Iterator.scss';

const Iterator = props => {
  const [subgoals, setSubgoals] = useState(props.value);
  const updateSubgoals = () => {
    setSubgoals
  }
  const addNewSubgoal = i => {
    const temp = subgoals;

  }
  const 
  return (
    <div className={"iterator-box-container"}>
      {props.labelId && 
        <FormattedMessage id={props.labelId}>
          {msg => <div className={"iterator-box-label"}>{msg}</div>}
        </FormattedMessage>
      }
      {/* {subgoals
        .map((subgoal, i) => {
          <SubgoalInput key={i} order={i} value={subgoal} onUpdate={props.setSubgoal}/>
        })
      } */}
      <SubgoalDnD />
    </div>
  );
}
export default Iterator;