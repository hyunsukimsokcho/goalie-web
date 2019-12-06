import React, { useEffect, useState } from 'react';
import ProblemTableEntry from './ProblemTableEntry';
import './ProblemTable.scss';
import firebase, { auth } from '../../firebase';
import Loading from '../Loading/Loading';

const ProblemTable = props => {
  const [ numAllUsers, setNumAllUsers ] = useState();
  const [ subgoalSubmissionNum, setSubgoalSubmissionNum ] = useState();
  const [ userInfo, setUserInfo ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      await firebase
        .firestore()
        .collection('users')
        .where('email', '==', user.email)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length !== 0 && snapshot.docs[0].data()) {
            console.log(snapshot.docs[0].data());
            setUserInfo(snapshot.docs[0].data());
          }
        });
      await firebase
        .firestore()
        .collection('users')
        .get()
        .then(snapshot => {
          setNumAllUsers(snapshot.docs.length);
        });
      await firebase
        .firestore()
        .collection('subgoals')
        .get()
        .then(snapshot => {
          let tempSubgoalSubmissionNum = {};
          snapshot.docs.map(doc => {
            tempSubgoalSubmissionNum[doc.id] = Object.keys(doc.data()).length;
          });
          setSubgoalSubmissionNum(tempSubgoalSubmissionNum);
        })
      props.setIsStatLoading(false);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className={'problem-table-container'}>
      <ProblemTableEntry isHeader={true} />
      {!props.isStatLoading && isLoading && 
        <div className={"problem-table-loading-container"}>
          <Loading />
        </div>
      }
      {subgoalSubmissionNum &&
        props.problemListCollection[props.currShownList.key].map((problem, i) => {
          const submissionRate = subgoalSubmissionNum[problem.meta]/numAllUsers;
          return (
            <ProblemTableEntry 
              key={i+1} 
              number={i+1} 
              problem={problem} 
              setProblem={props.setProblem} 
              submissionRate={submissionRate}
            />
          );
        })
      }
    </div>
  );
}

export default ProblemTable;