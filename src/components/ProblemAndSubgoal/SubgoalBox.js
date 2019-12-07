import React, { useState, useEffect } from 'react';
import './SubgoalBox.scss';
import Iterator from './Iterator';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import firebase, { auth } from '../../firebase';
import { submitStatus, makeId, freshLabels } from '../../utils';
import showToast from '../Toast/Toast';
import { openModal, closeModal } from '../Modal/Modal';

const SubgoalBox = props => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ buttonAvailable, setButtonAvailable ] = useState(true);
  const saveModalConfig = {
    title: 'modal.title.save',
    description: 'subgoalBox.willYouSave',
    buttonConfig: {
      'modal.button.return': [
        'default',
        () => {
          closeModal();
        },
      ],
      'modal.button.save': [
        'submit',
        () => {
          submitSubgoal();
          closeModal();
        },
      ],
    },
    closable: true,
  };
  const submitModalConfig = {
    title: 'modal.title.submit',
    description: 'subgoalBox.willYouSubmit',
    buttonConfig: {
      'modal.button.return': [
        'default',
        () => {
          closeModal();
        },
      ],
      'modal.button.submit': [
        'warning',
        () => {
          submitSubgoal();
          closeModal();
        },
      ],
    },
    closable: true,
  };
  useEffect(() => {
    if (props.isStatLoading) {
      props.setIsStatLoading(false);
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setButtonAvailable(false)
    }, 1000);
  })
  const submitSubgoal = () => {
    setIsLoading(true);
    const newSubgoalHistory = props.subgoalHistory;
    newSubgoalHistory[Object.keys(newSubgoalHistory).length] = props.subgoal;
    auth.onAuthStateChanged(async user => {
      if (user) {
        await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .update({
            [props.problem.meta]: {
              status: props.isRevise ? submitStatus.done : (props.isSubmitted ? submitStatus.done : submitStatus.wip),
              subgoal: newSubgoalHistory
            }
          }).then(async () => {
            if (!props.isRevise) {
              showToast("toast.saved", 2000);
              setIsLoading(false);
              props.push(`/${props.problem.meta}/compare`);
            } else {
              const newId = makeId(29);
              await firebase
                .firestore()
                .collection("subgoals")
                .doc(props.problem.meta)
                .update({
                  [newId]: {
                    content: props.subgoal,
                    email: user.email,
                    uid: user.uid,
                    labels: freshLabels,
                    timestamp: Date.now()
                  }
                })
                .then(async () => {
                  showToast("toast.submitted", 5000);
                  props.push('/');
                  props.signalUpdate();
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }
          })
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
  const checkValidProblem = () => {
    return !(props.problem && props.problem.meta);
  }
  return (
    <div className={"subgoal-box-container"}>
      <Iterator 
        labelId={props.isRevise ? "subgoalBox.revise" : "subgoalBox.writeDown"} 
        subgoal={props.subgoal} 
        setSubgoal={props.setSubgoal} 
      />
      <div className={"subgoal-submit-button-container"}>
        <Button 
          theme={props.isRevise ? "primary": "black"} 
          textId={props.isRevise ? (props.isSubmitted? "button.alreadySubmitted" : "button.revise") : "button.submit"} 
          onClick={props.isRevise ? ()=>openModal(submitModalConfig) : ()=>openModal(saveModalConfig)}
          isDisabled={buttonAvailable || checkValidProblem() || checkVoidSubgoal(props.subgoal) || (props.isSubmitted && props.isRevise)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
};
export default connect(null, { push })(SubgoalBox);