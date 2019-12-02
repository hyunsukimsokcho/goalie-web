import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import update from 'immutability-helper';

import Navbar from '../components/Navbar/Navbar';
import ProblemTab from '../components/Tab/ProblemTab';
import ProblemTable from '../components/Table/ProblemTable';
import ProblemAndSubgoal from '../components/ProblemAndSubgoal/ProblemAndSubgoal';
import './MainPage.scss';
import firebase, { auth } from '../firebase';
import { verifyError, getJsonFromUrl, dummyProbListCollection, probObj404, defaultSubgoal } from '../utils';
import Dimmer from '../components/Dimmer/Dimmer';
import Loading from '../components/Loading/Loading';
import showToast from '../components/Toast/Toast';


const RedirectWithToast = () => {
  showToast("toast.pleaseSignin", 2000);
  return <Redirect to={`?next=${window.location.pathname}`} />;
}

const MainPage = props => {
  /** 
   * From backend, we shall be able to fetch a collection of
   * problems in the following order (according to 'key'): 
   * (1) All, (2) WIP, and (3) Solved problems. Below will be deprecated.
   * */ 
  const [ problemListCollection, setProblemListCollection ] = useState(dummyProbListCollection);
  const [ problem, setProblem ] = useState(probObj404);
  const [ subgoal, setSubgoal ] = useState([]);
  const [ currShownList, setShownList ] = useState({key: 0, id: 'problemtab.all'});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isProblemSetLoading, setIsProblemSetLoading ] = useState(true);
  const [ isSubgoalLoading, setIsSubgoalLoading ] = useState(true);
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const [ account, setAccount ] = useState('');
  const [ uid, setUid ] = useState('');
  const next = getJsonFromUrl().next;
  const signInWithGoogle = async () => {
    setIsLoading(true);
    var provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase
      .auth()
      .signInWithPopup(provider)
      .then(async userCredential => {
        const { user } = userCredential;
      });
    } catch (error) {
      verifyError(error);
    }
    setIsLoading(false);
  };
  const signOut = () => {
    auth
      .signOut()
      .then(res => {
        props.push('/');
        setIsAuthenticated(false);
      });
  }
  useEffect(() => {
    // (1) GET problem lists from DB.
    // (2) If 'meta' exists in url, fetch the problem data.
    auth.onAuthStateChanged(async user => {
      const meta = props.pathname.split('/')[1];
      await firebase
        .firestore()
        .collection('problems')
        .get()
        .then(snapshot => {
          const temp = dummyProbListCollection;
          temp[0] = snapshot.docs.map(doc => doc.data());
          setProblemListCollection(temp);
          if (meta) {
            setProblem(temp[0].filter(problem => problem.meta === meta)[0]);
          }
        });
      setIsProblemSetLoading(false);
    });
  }, [isAuthenticated]);
  useEffect(() => {
    const meta = props.pathname.split('/')[1];
    auth.onAuthStateChanged(async user => {
      if (user) {
        await firebase
        .firestore()
        .collection('subgoals')
        .get()
        .then(snapshot => {
          const subgoalsofProblem = snapshot.docs.filter(doc => {return (doc.id == meta)});
          if (subgoalsofProblem.length !== 0) {
            const subgoal = subgoalsofProblem[0].data()[user.uid];
            if (subgoal.length !== 0) {
              setSubgoal(subgoal);
            } else {
              setSubgoal(defaultSubgoal);
            }
          } else {
            setSubgoal(defaultSubgoal);
          }
        });
      }
    })
  }, [problem]);
  useEffect(() => {
    // Checks if signed in.
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
        setUid(user.uid);
        setAccount(user.email);
        showToast("toast.welcome", 2000, user.email);
      } else {
        setIsAuthenticated(false);
        showToast("toast.pleaseSignin", 2000);
      }
      setIsLoading(false);
    })
  }, [isAuthenticated]);
  const renderNext = (isAuthenticated, next, problemListCollection) => {
    if( isAuthenticated && next ) { 
      return () => props.push(next);
    } else {
      return () => (
        <div className={"problem-tab-and-table-container"}>
          <ProblemTab
            setClickedItem={setShownList} 
            currClickedItem={currShownList}
          />
          <ProblemTable
            problemListCollection={problemListCollection} 
            currShownList={currShownList}
            setProblem={setProblem}
          />
        </div>
      );
    }
  }
  return (
    <div className={'main-page-container'}>
      <Dimmer active={isProblemSetLoading || isLoading} />
      {(isProblemSetLoading || isLoading) && 
        <Loading />
      }
      <Navbar signInWithGoogle={signInWithGoogle} isLoading={isLoading} isAuthenticated={isAuthenticated} signOut={signOut} account={account} />
      {!isProblemSetLoading &&
        <div className={'main-content-container'}>
          <Switch>
            <Route
              exact 
              path="/" 
              render={renderNext(isAuthenticated, next, problemListCollection)}
            />
            <Route
              path="/:probId"
              children={isAuthenticated ? <ProblemAndSubgoal problem={problem} subgoal={subgoal} setSubgoal={setSubgoal} uid={uid} /> : <RedirectWithToast />}
            />
          </Switch>
        </div>
      }
    </div>
  );
}
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})
export default connect(mapStateToProps, { push })(MainPage);