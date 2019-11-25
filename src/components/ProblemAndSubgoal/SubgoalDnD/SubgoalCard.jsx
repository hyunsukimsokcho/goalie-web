import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './itemTypes';
import './SubgoalCard.scss';

const style = {
  padding: '8px 10px',
  backgroundColor: 'white',
  cursor: 'grab',
  width: '100%'
};
const SubgoalCard = ({ id, text, index, moveCard, addCard, deleteCard }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return ;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return ;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return ;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return ;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div className={'subgoal-card-container'}>
      <div className={"step-text"}>Step {index+1}</div>
      <div className={"subgoal-icons-container"}>
        <div className={"subgoal-icons-only"}>
          <img 
            className={"subgoal-minus-icon"}
            src={require('../../../static/image/minus.png')} 
            onClick={()=>deleteCard(index)}
          />
          <img 
            className={"subgoal-plus-icon"}
            src={require('../../../static/image/plus.png')} 
            onClick={()=>addCard(index)} 
          />
        </div>
        <div ref={ref} style={{ ...style, opacity }}>
          {text}
        </div>
      </div>
    </div>
  )
}
export default SubgoalCard;
