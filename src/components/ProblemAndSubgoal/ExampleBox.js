import React, { useState } from 'react';
import ExampleCard from './ExampleCard';
import { FormattedMessage } from 'react-intl';
import './ExampleBox.scss';
import Label from '../Label/Label';
import { openLabelModal } from '../Label/LabelModal';

const ExampleBox = props => {
  let labelId = 'exampleBox.upvoted';
  if (props.index) {
    if (props.index === 0) {
      labelId = 'exampleBox.upvoted';
    } else if (props.index === 1) {
      labelId = 'exampleBox.similar';
    } else if (props.index === 2) {
      labelId = 'exampleBox.latest';
    } else if (props.index === 3) {
      labelId = 'exampleBox.random';
    }
  }
  const renderExampleCard = (text, index) => {
    return (
      <ExampleCard
        key={index}
        index={index}
        text={text}
      />
    )
  };
  const selectedLabels = [ 
    {
      text: 'Creative', 
      clickedNum: 4
    },
    {
      text: 'Concise', 
      clickedNum: 1
    },
    {
      text: 'Helpful',
      clickedNum: 17
    }
  ];
  const notSelectedLabels = [ 
    {
      text: 'Hmm',
      clickedNum: 0
    }, 
    {
      text: 'Documented',
      clickedNum: 0
    }, 
    {
      text: 'Fabulous',
      clickedNum: 0
    }
  ];
  return (
    <div className={"example-box-container"} id={props.id}>
      <FormattedMessage id={labelId} defaultMessage={"loading"}>
        {msg => <div className={"example-box-label"}>{msg}</div>}
      </FormattedMessage>
      <div className={"example-contents-container"}>
        {props.example.map((text, i) => renderExampleCard(text, i))}
      </div>
      <div className={"labels-container"}>
        {
          selectedLabels.map(label => {
            return (<Label text={label.text} selectable={true} clickedNum={label.clickedNum} />);
          })
        }
        <img
          className={"more-label-icon"}
          src={require('../../static/image/more_label.png')}
          onClick={()=>openLabelModal('example-box-' + props.index, notSelectedLabels)}
        />
        </div>
    </div>
  )
};
export default ExampleBox;
