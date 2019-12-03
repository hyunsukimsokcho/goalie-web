import React, { useState } from 'react';
import './SubgoalBox.scss';
import Iterator from './Iterator';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import firebase, { auth } from '../../firebase';

const SubgoalBox = props => {
  const [isLoading, setIsLoading] = useState(false);
  const submitSubgoal = () => {
    setIsLoading(true);
    auth.onAuthStateChanged(async user => {
      await firebase
        .firestore()
        .collection("subgoals")
        .doc(props.problem.meta)
        .set({
          [user.uid]: props.subgoal
        })
        .then(function() {
          if (!props.isRevise) {
            setIsLoading(false);
            props.push(`/${props.probId}/compare`);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    })
  }
  const checkVoidSubgoal = subgoal => {
    let isFilled = true;
    subgoal.map(s => {
      isFilled = isFilled && !s.text;
    })
    return isFilled;
  }

  return (
    <div className={"subgoal-box-container"}>
      <Iterator labelId={props.isRevise ? "subgoalBox.revise" : "subgoalBox.writeDown"} subgoal={props.subgoal} setSubgoal={props.setSubgoal} />
      <div className={"subgoal-submit-button-container"}>
        <Button 
          theme={"primary"} 
          textId={props.isRevise ? "button.revise" : "button.submit"} 
          onClick={submitSubgoal}
          isDisabled={checkVoidSubgoal(props.subgoal)}
          isLoading={isLoading} 
        />
      </div>
    </div>
  )
};
export default connect(null, { push })(SubgoalBox);