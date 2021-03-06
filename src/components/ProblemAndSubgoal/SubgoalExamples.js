import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import stringSimilarity from 'string-similarity';

import ExampleBox from './ExampleBox';
import firebase, { auth } from '../../firebase';
import { concatSubgoal } from '../../utils';

var randomExNumMax;

const SubgoalExamples = props => {
  const computeUpvotes = exampleObj => {
    let upvotes = 0;
    Object.values(exampleObj.labels).map((voters => {
      Object.values(voters).map(voted => {
        if (voted) {
          upvotes += 1;
        }
      })
    }));
    return upvotes;
  }
  const parsedSubgoal = concatSubgoal(props.subgoal);
  const computeSim = exampleObj => {
    const parsedExample = concatSubgoal(exampleObj.content);
    return stringSimilarity.compareTwoStrings(parsedSubgoal, parsedExample);
  }
  const [ mostUpvoted, setMostUpvoted ] = useState('');
  const [ mostSimilar, setMostSimilar ] = useState('');
  const [ latest, setLatest ] = useState('');
  const [ examples, setExamples ] = useState([]);
  const [ randomExamples, setRandomExamples ] = useState([]);
  const [ isExampleFetched, setIsExampleFetched ] = useState(false);
  const [ email, setEmail ] = useState('');
  const meta = props.pathname.split('/')[1];
  useEffect(() => {
    // (1) GET subgoal collections from DB.
    // (2) Select reprsentative examples w.r.t each criteria
    if (meta) {
      return firebase
        .firestore()
        .collection('subgoals')
        .doc(meta)
        .onSnapshot(snapshot => {
          const exampleCollection = snapshot.data();
          if (exampleCollection) {
            const exampleSubgoals = Object.entries(exampleCollection);
            const tempRaw = [...exampleSubgoals];
            if (!isExampleFetched) {
              auth.onAuthStateChanged(user => {
                if (user) {
                  setEmail(user.email);
                  // Firstly filter user's own subgoals.
                  const temp = tempRaw.filter(ex => {
                    return ex[1].email !== user.email;
                  });
                  // Get latest, remove, splice the list of examples.
                  temp.sort((ex1, ex2) => {
                    return ex2[1].timestamp - ex1[1].timestamp;
                  });
                  setLatest(temp.length!==0 && temp[0][0]);
                  temp.splice(0, 1);
                  // Sort the rest of the examples according to # of upvotes.
                  // Again, remove and splice.
                  temp.sort((ex1, ex2) => {
                    return computeUpvotes(ex2[1]) - computeUpvotes(ex1[1]);
                  })
                  setMostUpvoted(temp.length!==0 && temp[0][0]);
                  temp.splice(0, 1);
                  // Get the most similar example.
                  temp.sort((ex1, ex2) => {
                    return computeSim(ex2[1]) - computeSim(ex1[1]);
                  });
                  setMostSimilar(temp.length!==0 && temp[0][0]);
                  temp.splice(0, 1);
                  temp.sort((ex1, ex2) => {
                    return 0.5 - Math.random();
                  });
                  if (temp.length!==0) {
                    setRandomExamples(temp.length!==0 && temp.map(ex => [ex[0], exampleCollection[ex[0]]]));
                    props.setMoreExamplesDisabled(false);
                  }
                  randomExNumMax = temp.length;
                }
              });
            }
            // Get examples according to found key from above.
            setExamples([
              [mostUpvoted, exampleCollection[mostUpvoted]],
              [mostSimilar, exampleCollection[mostSimilar]],
              [latest, exampleCollection[latest]]
            ]);
            setIsExampleFetched(true);
          }
        });
    }
  });

  const renderExamples = (exampleTuple, index) => {
    if (exampleTuple && exampleTuple[1]) {
      return (
        <ExampleBox
          id={'example-box-' + index}
          key={index}
          index={index}
          exampleTuple={exampleTuple}
          meta={meta}
          email={email}
        />
      )
    } else {
      // UI for no example yet?
    }
  };
  return (
    <>
      <div className={"subgoal-examples-conatiner"}>
        {isExampleFetched && examples.map((exampleTuple, i) => renderExamples(exampleTuple, i))}
        {isExampleFetched && props.randomExNum > 0 && randomExamples.slice(0, Math.min(props.randomExNum, randomExNumMax)).map((randomExampleTuple, i) => renderExamples(randomExampleTuple, 3 + i))}
      </div>
    </>
  )
};
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps, { push })(SubgoalExamples);

export { randomExNumMax };