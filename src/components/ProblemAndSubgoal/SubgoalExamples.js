import React from 'react';
import ExampleBox from './ExampleBox';

const SubgoalExamples = props => {
  const examples = [
    {
      subgoal: ["Get an input of N and N numbers.", "Add up the N numbers.", "Divide the calculated sum by N to find an average.", "Print the average."],
      selectedLabels: [ 
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
  const renderExamples = (example, index) => {
    return (
      <ExampleBox
        id={'example-box-' + index}
        key={index}
        index={index}
        example={example}
      />
    )
  };
  return (
    <>
      <div className={"subgoal-examples-conatiner"}>
        {examples.map((example, i) => renderExamples(example, i))}
        {props.moreSubgoal && renderExamples(moreExample, 3)}
      </div>
    </>
  )
};
export default SubgoalExamples;
