import React, { useState, useCallback } from 'react';
import SubgoalCard from './SubgoalCard';
import update from 'immutability-helper';
import showToast from '../../Toast/Toast';

const SubgoalDnD = props => {
  const [globalIndex, setGlobalIndex] = useState(props.subgoals.length);
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = props.subgoals[dragIndex]
      props.setSubgoals(
        update(props.subgoals, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [props.subgoals],
  );
  const addCard = useCallback(clickIndex => {
    const newCard = {
      id: globalIndex + 1,
      text: ''
    };
    setGlobalIndex(globalIndex+1);
    props.setSubgoals(update(props.subgoals, {$splice: [[clickIndex+1, 0, newCard]]}));
  });
  const deleteCard = useCallback(clickIndex => {
    if (props.subgoals.length > 1) {
      props.setSubgoals(update(props.subgoals, {$splice: [[clickIndex, 1]]}));
    } else {
      showToast("subgoalDnd.minimumWarning", 2000);
    }
  });
  const editCard = useCallback((clickId, clickIndex, newText) => {
    const newCard = {
      id: clickId,
      text: newText
    };
    props.setSubgoals(update(props.subgoals, {$splice: [[clickIndex, 1, newCard]]}));
  });
  const renderCard = (card, index) => {
    return (
      <SubgoalCard
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        addCard={addCard}
        deleteCard={deleteCard}
        editCard={editCard}
      />
    )
  };
  console.log('cards', props.subgoals);
  return (
    <>
      <div className={"subgoal-dnd-conatiner"}>{props.subgoals.map((card, i) => renderCard(card, i))}</div>
    </>
  )
};
export default SubgoalDnD;
