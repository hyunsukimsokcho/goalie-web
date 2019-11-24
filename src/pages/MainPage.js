import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProblemTab from '../components/Tab/ProblemTab';
import ProblemTable from '../components/Table/ProblemTable';
import './MainPage.scss';

const MainPage = () => {
  /** 
   * From backend, we shall be able to fetch a collection of
   * problems in the following order (according to 'key'): 
   * (1) All, (2) WIP, and (3) Solved problems. Below will be deprecated.
   * */ 
  const dummyProbListCollection = [
    [
      {
        name: "Print stars",
        corrRate: "46.53"
      },
      {
        name: "Find average",
        corrRate: "28.12"
      },
      {
        name: "Dynamic Programming",
        corrRate: "36.49"
      },
      {
        name: "Input and output",
        corrRate: "50.87"
      },
      {
        name: "Network flow",
        corrRate: "46.53"
      }
    ],
    [
      {
        name: "Find average",
        corrRate: "28.12"
      }
    ],
    [
      {
        name: "Print stars",
        corrRate: "46.53"
      },
      {
        name: "Dynamic Programming",
        corrRate: "36.49"
      }
    ]
  ];
  const [ currShownList, setShownList ] = useState({key: 0, id: 'problemtab.all'});
  return(
    <div className={'main-page-container'}>
      <Navbar />
      <div className={'main-content-container'}>
        <ProblemTab setClickedItem={setShownList} currClickedItem={currShownList}/>
        <ProblemTable problemListCollection={dummyProbListCollection} currShownList={currShownList}/>
      </div>
    </div>
  );
}
export default MainPage;