import React, { useState, useCallback, useEffect } from 'react';
import SubgoalCard from './SubgoalCard';
import update from 'immutability-helper';
import showToast from '../../Toast/Toast';

const SubgoalDnD = props => {
  const [globalIndex, setGlobalIndex] = useState(props.subgoal.length);
  useEffect(() => {
    setGlobalIndex(props.subgoal.length);
  }, [props.subgoal]);
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = props.subgoal[dragIndex]
      props.setSubgoal(
        update(props.subgoal, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [props.subgoal],
  );
  const addCard = useCallback(clickIndex => {
    const newCard = {
      id: globalIndex + 1,
      text: '',
      isNew: true
    };
    setGlobalIndex(globalIndex+1);
    props.setSubgoal(update(props.subgoal, {$splice: [[clickIndex+1, 0, newCard]]}));
  });
  const deleteCard = useCallback(clickIndex => {
    if (props.subgoal.length > 1) {
      props.setSubgoal(update(props.subgoal, {$splice: [[clickIndex, 1]]}));
    } else {
      showToast("subgoalDnd.minimumWarning", 2000);
    }
  });
  const editCard = useCallback((clickId, clickIndex, newText) => {
    const newCard = {
      id: clickId,
      text: newText
    };
    props.setSubgoal(update(props.subgoal, {$splice: [[clickIndex, 1, newCard]]}));
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
        isNew={card.isNew}
      />
    )
  };
  return (
    <>
      <div className={"subgoal-dnd-conatiner"}>
        {props.subgoal.map((card, i) => renderCard(card, i))}
      </div>
    </>
  )
};
export default SubgoalDnD;
