import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

const Routes = props => {

  return (
    <div>
      <Route path="/" component={MainPage} />
    </div>
  );
};

export default Routes;