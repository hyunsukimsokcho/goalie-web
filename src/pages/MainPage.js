import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ProblemTab from '../components/Tab/ProblemTab';
import ProblemTable from '../components/Table/ProblemTable';
import ProblemAndSubgoal from '../components/ProblemAndSubgoal/ProblemAndSubgoal';
import './MainPage.scss';

const MainPage = props => {
  /** 
   * From backend, we shall be able to fetch a collection of
   * problems in the following order (according to 'key'): 
   * (1) All, (2) WIP, and (3) Solved problems. Below will be deprecated.
   * */ 
  const dummyProbListCollection = [
    [
      {
        id: "print-stars",
        name: "Print stars",
        corrRate: "46.53"
      },
      {
        id: "find-average",
        name: "Find average",
        corrRate: "28.12"
      },
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        corrRate: "36.49"
      },
      {
        id: "input-and-output",
        name: "Input and output",
        corrRate: "50.87"
      },
      {
        id: "network-flow",
        name: "Network flow",
        corrRate: "46.53"
      },{
        id: "print-stars",
        name: "Print stars",
        corrRate: "46.53"
      },
      {
        id: "find-average",
        name: "Find average",
        corrRate: "28.12"
      },
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        corrRate: "36.49"
      },
      {
        id: "input-and-output",
        name: "Input and output",
        corrRate: "50.87"
      },
      {
        id: "network-flow",
        name: "Network flow",
        corrRate: "46.53"
      }
    ],
    [
      {
        id: "find-average",
        name: "Find average",
        corrRate: "28.12"
      }
    ],
    [
      {
        id: "print-stars",
        name: "Print stars",
        corrRate: "46.53"
      },
      {
        id: "dynamic-programming",
        name: "Dynamic Programming",
        corrRate: "36.49"
      },
    ]
  ];
  const [ currShownList, setShownList ] = useState({key: 0, id: 'problemtab.all'});
  return(
    <div className={'main-page-container'}>
      <Navbar />
      <div className={'main-content-container'}>
        <Switch>
          <Route
            exact 
            path="/" 
            render={()=>(
              <div className={"problem-tab-and-table-container"}>
                <ProblemTab
                  setClickedItem={setShownList} 
                  currClickedItem={currShownList}
                />
                <ProblemTable
                  problemListCollection={dummyProbListCollection} 
                  currShownList={currShownList}
                />
              </div>
            )}
          />
          <Route
            path="/:probId"
            children={<ProblemAndSubgoal />}
          />
        </Switch>
      </div>
    </div>
  );
}
export default MainPage;