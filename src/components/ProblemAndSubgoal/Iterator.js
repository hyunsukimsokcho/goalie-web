import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import SubgoalDnD from './SubgoalDnD/SubgoalDnD';

import './Iterator.scss';

const Iterator = props => {
  const [subgoals, setSubgoals] = useState(props.value); 
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
      <DndProvider backend={HTML5Backend}>
        <SubgoalDnD />
      </DndProvider>
    </div>
  );
}
export default Iterator;