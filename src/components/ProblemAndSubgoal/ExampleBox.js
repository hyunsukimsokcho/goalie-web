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
  const [currSelectedLabels, setCurrSelectedLabels] = useState(props.pseudoexample.selectedLabels || []);
  const [currNotSelectedLabels, setCurrNotSelectedLabels] = useState(props.pseudoexample.notSelectedLabels || []);
  const handleNewLabelClick = label => {
    const newCurrSelectedLabels = currSelectedLabels
    newCurrSelectedLabels.push({
      text: label,
      clickedNum: 1,
      isSelected: true,
    });
    const newCurrNotSelectedLabels = currNotSelectedLabels.filter(labelObj => {
      return (labelObj.text !== label);
    });
    setCurrSelectedLabels(newCurrSelectedLabels);
    setCurrNotSelectedLabels(newCurrNotSelectedLabels);
  }
  const makeLabelDisappear = label => {
    const newCurrNotSelectedLabels = currNotSelectedLabels
    newCurrNotSelectedLabels.push({
      text: label,
      clickedNum: 0,
    });
    const newCurrSelectedLabels = currSelectedLabels.filter(labelObj => {
      return (labelObj.text !== label);
    });
    setCurrSelectedLabels(newCurrSelectedLabels);
    setCurrNotSelectedLabels(newCurrNotSelectedLabels);
  }
  return (
    <div className={"example-box-container"} id={props.id}>
      <FormattedMessage id={labelId} defaultMessage={"loading"}>
        {msg => <div className={"example-box-label"}>{msg}</div>}
      </FormattedMessage>
      <div className={"example-contents-container"}>
        {props.example && props.example.content.map((step, i) => renderExampleCard(step.text, i))}
      </div>
      <div className={"labels-container"}>
        {
          currSelectedLabels.map(label => {
            return (
              <Label 
                key={label.text}
                text={label.text} 
                selectable={true} 
                clickedNum={label.clickedNum} 
                isSelected={label.isSelected}
                makeLabelDisappear={makeLabelDisappear}
              />
            );
          })
        }
        {currNotSelectedLabels.length !== 0 &&
          <img
            className={"more-label-icon"}
            src={require('../../static/image/more_label.png')}
            onClick={()=>openLabelModal('example-box-' + props.index, currNotSelectedLabels, handleNewLabelClick)}
          />
        }
        </div>
    </div>
  )
};
export default ExampleBox;
