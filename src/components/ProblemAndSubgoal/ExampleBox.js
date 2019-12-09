import React, { useState } from 'react';
import ExampleCard from './ExampleCard';
import { FormattedMessage } from 'react-intl';
import './ExampleBox.scss';
import Label from '../Label/Label';
import { openLabelModal } from '../Label/LabelModal';
import firebase, { auth } from '../../firebase';
import { makeExampleOnClickLabel } from '../../utils';

const ExampleBox = props => {
  let labelId = 'exampleBox.upvoted';
  if (props.index) {
    if (props.index === 0) {
      labelId = 'exampleBox.upvoted';
    } else if (props.index === 1) {
      labelId = 'exampleBox.similar';
    } else if (props.index === 2) {
      labelId = 'exampleBox.latest';
    } else if (props.index >= 3) {
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
  const handleOnLabelClick = (label, isClicked) => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        await firebase
          .firestore()
          .collection('subgoals')
          .doc(props.meta)
          .update({
            [props.exampleTuple[0]]: 
              makeExampleOnClickLabel(props.exampleTuple[1], label, user.email, !isClicked)
          });
      }
    })
  };
  const countClicks = labelInfo => {
    let cnt = 0;
    Object.values(labelInfo).map(clicked => {
      if (clicked) { cnt += 1 }
    });
    return cnt;
  }
  const unOccupiedLabels = example => {
    const filtered = Object.entries(example.labels)
      .filter(labelPair => {
        return countClicks(labelPair[1]) == 0;
      })
    return filtered.map(labelPair => {
        return labelPair[0];
      });
  };
  return (
    <div className={"example-box-container"} id={props.id}>
      <FormattedMessage id={labelId} defaultMessage={"loading"}>
        {msg => <div className={"example-box-label"}>{msg}</div>}
      </FormattedMessage>
      <div className={"example-contents-container"}>
        {props.exampleTuple && 
          props.exampleTuple[1] && 
          props.exampleTuple[1].content && 
          props.exampleTuple[1]
            .content.map((step, i) => renderExampleCard(step.text, i))
        }
      </div>
      <div className={"labels-container"}>
        {
          Object.entries(props.exampleTuple[1].labels).map(labelPair => {
            // labelPair : [ label: text, labelInfo: {email: string, clicked: boolean}[] ]
            const clickCnt = countClicks(labelPair[1]);
            if (clickCnt !== 0) {
              return (
                <Label 
                  key={labelPair[0]}
                  text={labelPair[0]} 
                  selectable={true}
                  clickedNum={countClicks(labelPair[1])}
                  isSelected={labelPair[1][props.email]}
                  handleOnLabelClick={handleOnLabelClick}
                />
              );
            }
          })
        }
        {unOccupiedLabels(props.exampleTuple[1]).length !== 0 &&
          <img
            className={`more-label-icon ${unOccupiedLabels(props.exampleTuple[1]).length==6 ? 'always' : ''}`}
            src={require('../../static/image/more_label.png')}
            onClick={()=>openLabelModal('example-box-' + props.index, unOccupiedLabels(props.exampleTuple[1]), handleOnLabelClick)}
          />
        }
        </div>
    </div>
  )
};
export default ExampleBox;
