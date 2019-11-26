import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import ProblemBox from './ProblemBox';
import SubgoalBox from './SubgoalBox';
import SubgoalCollection from './SubgoalCollection';
import './ProblemAndSubgoal.scss';

const ProblemAndSubgoal = props => {
  const { probId } = useParams();
  const dummyProbObj = {
    find_average: {
      description: 
        `Find an average of the given numbers. For example, if you have 1, 2, 3, 4, 5, then the average of the given 5 numbers is calculated as (1+2+3+4+5)/5 = 3`,
      input: 
        `N in the first row and N numbers in the second row.`,
      output: 
        `Average of the given N numbers.`,
      example:
        [[`3
10 20 30`, `20`],[`4
10 10 10 10`, `10`]],
    },
  }
  const [subgoals, setSubgoals] = useState([
    {
      id: 1,
      text: '',
    }
  ]);
  return (
    <Switch>
      <Route
        path={"/:probId"}
        render={() => (
          <div className={"problem-and-subgoal-container"}>
            {props.pathname.split('/')[2] !== 'compare' && <ProblemBox problem={dummyProbObj["find_average"]}/>}
            <SubgoalBox isMine={true} subgoals={subgoals} setSubgoals={setSubgoals} probId={probId} />
            {props.pathname.split('/')[2] === 'compare' && <SubgoalCollection />}
          </div>
        )}
      />
      {/* <Route
        path={"/:probId/compare"}
        render={() => (
          <div className={"problem-and-subgoal-container"}>
            <SubgoalBox isMine={true} isRevise={true} subgoals={subgoals} setSubgoals={setSubgoals} probId={probId} />
            <SubgoalCollection />
          </div>
        )}
      /> */}
    </Switch>
  );
}
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})
export default connect(mapStateToProps, { push })(ProblemAndSubgoal);
