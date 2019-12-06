import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Navbar from '../components/Navbar/Navbar';
import ProblemTab from '../components/Tab/ProblemTab';
import ProblemTable from '../components/Table/ProblemTable';
import ProblemAndSubgoal from '../components/ProblemAndSubgoal/ProblemAndSubgoal';
import './MainPage.scss';
import firebase, { auth } from '../firebase';
import { verifyError, getJsonFromUrl, probObj404, defaultSubgoal, submitStatus } from '../utils';
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
  const [ problemListCollection, setProblemListCollection ] = useState([[], [], []]);
  const [ problem, setProblem ] = useState(probObj404);
  const [ subgoal, setSubgoal ] = useState([]);
  const [ currShownList, setShownList ] = useState({key: 0, id: 'problemtab.all'});
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isProblemSetLoading, setIsProblemSetLoading ] = useState(true);
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const [ account, setAccount ] = useState('');
  const [ uid, setUid ] = useState('');
  const [ numAllUsers, setNumAllUsers] = useState(1);
  const [ subgoalSubmissionNum, setSubgoalSubmissionNum ] = useState({});
  const [ needUpdate, setNeedUpdate ] = useState(0);
  const [ isStatLoading, setIsStatLoading ] = useState(true);
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
        await firebase
          .firestore()
          .collection('users')
          .where('email', '==', user.email)
          .get()
          .then(async snapshot => {
            if (snapshot.empty) {
              await firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .set({
                  email: user.email
                });
            }
          })
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
        window.location = '/';
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
          const temp = problemListCollection;
          temp[0] = snapshot.docs.map(doc => doc.data());
          setProblemListCollection(temp);
          if (meta) {
            if (temp[0].filter(problem => problem.meta === meta)[0]) {
              setProblem(temp[0].filter(problem => problem.meta === meta)[0]);
            }
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
        .collection('users')
        .where('email', '==', user.email)
        .get()
        .then(snapshot => {
          const subgoalOfUser = snapshot.docs.length !== 0 && snapshot.docs[0].data() && snapshot.docs[0].data()[meta];
          if (subgoalOfUser) {
            const subgoal = subgoalOfUser.subgoal;
            const status = subgoalOfUser.status;
            // const submit
            if (subgoal && subgoal.length !== 0) {
              setSubgoal(subgoal);
              if (status === submitStatus.done) {
                setIsSubmitted(true);
              }
            } else {
              setSubgoal(defaultSubgoal);
            }
          } else {
            setSubgoal(defaultSubgoal);
          }
        });
      }
    })
  }, [problem, needUpdate]);
  useEffect(() => {
    // Checks if signed in.
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
        setUid(user.uid);
        setAccount(user.email);
        setIsLoading(false);
        showToast("toast.welcome", 2000, user.email);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
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
            isNotUser={!isAuthenticated}
          />
          <ProblemTable
            problemListCollection={problemListCollection} 
            currShownList={currShownList}
            setProblem={setProblem}
            subgoalSubmissionNum={subgoalSubmissionNum}
            numAllUsers={numAllUsers}
            isStatLoading={isStatLoading}
            setIsStatLoading={setIsStatLoading}
          />
        </div>
      );
    }
  }
  return (
    <div className={'main-page-container'}>
      <Dimmer active={isProblemSetLoading || isLoading || isStatLoading} />
      {(isProblemSetLoading || isLoading || isStatLoading) && 
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
              children={isAuthenticated 
                          ? <ProblemAndSubgoal 
                              problem={problem} 
                              subgoal={subgoal} 
                              setSubgoal={setSubgoal} 
                              uid={uid} isSubmitted={isSubmitted} 
                              isStatLoading={isStatLoading} 
                              setIsStatLoading={setIsStatLoading} 
                              setNeedUpdate={setNeedUpdate} 
                            /> 
                          : <RedirectWithToast />
                        }
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