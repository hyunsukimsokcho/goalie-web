import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import ProblemTab from '../components/Tab/ProblemTab';
import ProblemTable from '../components/Table/ProblemTable';
import './MainPage.scss';

const MainPage = () => {
  return(
    <div className={'main-page-container'}>
      <Navbar />
      <div className={'main-content-container'}>
        <ProblemTab />
        <ProblemTable problemList={[]} />
      </div>
    </div>
  );
}
export default MainPage;