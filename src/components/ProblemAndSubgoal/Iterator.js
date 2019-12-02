import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import SubgoalDnD from './SubgoalDnD/SubgoalDnD';

import './Iterator.scss';

const Iterator = props => {
  return (
    <div className={"iterator-box-container"}>
      {props.labelId && 
        <FormattedMessage id={props.labelId}>
          {msg => <div className={"iterator-box-label"}>{msg}</div>}
        </FormattedMessage>
      }
      <DndProvider backend={HTML5Backend}>
        <SubgoalDnD subgoal={props.subgoal} setSubgoal={props.setSubgoal} />
      </DndProvider>
    </div>
  );
}
export default Iterator;