import React, { useState } from 'react';
import './SubgoalBox.scss';
import Iterator from './Iterator';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import firebase, { auth } from '../../firebase';
import { submitStatus } from '../../utils';

const SubgoalBox = props => {
  const [isLoading, setIsLoading] = useState(false);
  const submitSubgoal = () => {
    setIsLoading(true);
    auth.onAuthStateChanged(async user => {
      if (user) {
        await firebase
          .firestore()
          .collection("subgoals")
          .doc(props.problem.meta)
          .update({
            [user.uid]: props.subgoal
          })
          .then(async () => {
            await firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({
                [props.problem.meta]: props.isRevise ? submitStatus.done : submitStatus.wip
              }).then(() => {
                if (!props.isRevise) {
                  setIsLoading(false);
                  props.push(`/${props.problem.meta}/compare`);
                }
              })
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
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