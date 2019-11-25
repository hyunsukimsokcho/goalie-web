import React, { useState, useCallback } from 'react';
import SubgoalCard from './SubgoalCard';
import update from 'immutability-helper';
import showToast from '../../Toast/Toast';

const Container = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 4,
      text: 'Create some examples',
    },
    {
      id: 5,
      text:
        'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
    },
    {
      id: 6,
      text: '???',
    },
    {
      id: 7,
      text: 'PROFIT',
    },
  ]);
  const [globalIndex, setGlobalIndex] = useState(cards.length);
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      )
    },
    [cards],
  );
  const addCard = useCallback((clickIndex) => {
    const temp = cards;
    const newCard = {
      id: globalIndex+1,
      text: 'newCard' + globalIndex
    }
    setGlobalIndex(globalIndex+1);
    setCards(update(cards, {$splice: [[clickIndex+1, 0, newCard]]}));
  });
  const deleteCard = useCallback((clickIndex) => {
    if (cards.length > 1) {
      setCards(update(cards, {$splice: [[clickIndex, 1]]}));
    } else {
      showToast("subgoalDnd.minimumWarning", 2000);
    }
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
      />
    )
  };
  return (
    <>
      <div className={"subgoal-dnd-conatiner"}>{cards.map((card, i) => renderCard(card, i))}</div>
    </>
  )
};
export default Container;
