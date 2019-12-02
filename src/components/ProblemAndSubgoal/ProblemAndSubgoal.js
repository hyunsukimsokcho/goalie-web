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
  console.log('problemListCollection', props.problem);
  const { probId } = useParams();
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
            {props.pathname.split('/')[2] !== 'compare' && 
              <ProblemBox problem={props.problem}/>
            }
            <SubgoalBox 
              isMine={true} 
              isRevise={props.pathname.split('/')[2] === 'compare'} 
              subgoals={subgoals} 
              setSubgoals={setSubgoals} 
              probId={probId} 
            />
            {props.pathname.split('/')[2] === 'compare' && 
              <SubgoalCollection />
            }
          </div>
        )}
      />
    </Switch>
  );
}
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})
export default connect(mapStateToProps, { push })(ProblemAndSubgoal);
