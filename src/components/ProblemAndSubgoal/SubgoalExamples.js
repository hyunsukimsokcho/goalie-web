import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import similarity from 'string-cosine-similarity';

import ExampleBox from './ExampleBox';
import firebase, { auth } from '../../firebase';
import { concatSubgoal } from '../../utils';


const SubgoalExamples = props => {
  const pseudoexamples = [
    {
      subgoal: ["Get an input of N and N numbers.", "Add up the N numbers.", "Divide the calculated sum by N to find an average.", "Print the average."],
      selectedLabels: [ 
        {
          text: 'Creative', 
          clickedNum: 4,
        },
        {
          text: 'Concise', 
          clickedNum: 1
        },
        {
          text: 'Helpful',
          clickedNum: 17
        }
      ],
      notSelectedLabels: [ 
        {
          text: 'Unique',
          clickedNum: 0
        }, 
        {
          text: 'Detailed',
          clickedNum: 0
        }, 
        {
          text: 'Optimal',
          clickedNum: 0
        }
      ]
    },
    {
      subgoal: ["Get N and N numbers.", "Add up all the numbers.", "Divide the sum by the number of the given numbers.", "Print out the calculated average."],
      selectedLabels: [ 
        {
          text: 'Creative', 
          clickedNum: 1
        },
        {
          text: 'Unique',
          clickedNum: 2
        }, 
      ],
      notSelectedLabels: [ 
        {
          text: 'Concise', 
          clickedNum: 0
        },
        {
          text: 'Detailed',
          clickedNum: 0
        }, 
        {
          text: 'Optimal',
          clickedNum: 0
        },
        {
          text: 'Helpful',
          clickedNum: 0
        }
      ]
    },
    {
      subgoal: ["Input", "Sum", "Divide and output"],
      selectedLabels: [ 
        {
          text: 'Concise', 
          clickedNum: 3
        },
      ],
      notSelectedLabels: [ 
        {
          text: 'Creative', 
          clickedNum: 4
        },
        {
          text: 'Unique',
          clickedNum: 0
        }, 
        {
          text: 'Detailed',
          clickedNum: 0
        }, 
        {
          text: 'Optimal',
          clickedNum: 0
        },
        {
          text: 'Helpful',
          clickedNum: 0
        }
      ]
    }
  ];
  const moreExample = {
    subgoal: ["Add the numbers one by one, while incrementing the count.", "Print the sum divided by count."],
    selectedLabels: [ 
      {
        text: 'Detailed',
        clickedNum: 2
      }, 
      {
        text: 'Optimal',
        clickedNum: 1
      },
    ],
    notSelectedLabels: [ 
      {
        text: 'Unique',
        clickedNum: 0
      }, 
      {
        text: 'Creative', 
        clickedNum: 0
      },
      {
        text: 'Concise', 
        clickedNum: 0
      },
      {
        text: 'Helpful',
        clickedNum: 0
      }
     
    ]
  };
  const computeUpvotes = exampleObj => {
    let upvotes = 0;
    exampleObj.labels.map(label => {
      upvotes += label.clickedNum;
    });
    return upvotes;
  }
  const parsedSubgoal = concatSubgoal(props.subgoal);
  const computeSim = exampleObj => {
    const parsedExample = concatSubgoal(exampleObj.content);
    return similarity(parsedSubgoal, parsedExample);
  }
  const [ mostUpvoted, setMostUpvoted ] = useState('');
  const [ mostSimilar, setMostSimilar ] = useState('');
  const [ latest, setLatest ] = useState('');
  const [ randomPick, setRandomPick ] = useState('');
  const [ examples, setExamples ] = useState([]);
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
                const randInd = Math.floor(Math.random() * temp.length);
                setRandomPick(temp.length!==0 && temp[randInd][0]);
                temp.splice(randInd, 1);
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
          pseudoexample={index == 3 ? moreExample : pseudoexamples[index]}
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
        {isExampleFetched && props.moreSubgoal && renderExamples(randomPick, 3)}
      </div>
    </>
  )
};
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps, { push })(SubgoalExamples);