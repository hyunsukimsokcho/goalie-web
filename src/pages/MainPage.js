import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Navbar from '../components/Navbar/Navbar';
import ProblemTab from '../components/Tab/ProblemTab';
import ProblemTable from '../components/Table/ProblemTable';
import ProblemAndSubgoal from '../components/ProblemAndSubgoal/ProblemAndSubgoal';
import './MainPage.scss';
import firebase, { auth } from '../firebase';
import { verifyError } from '../utils';
import Dimmer from '../components/Dimmer/Dimmer';
import Loading from '../components/Loading/Loading';
import showToast from '../components/Toast/Toast';

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
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const [ account, setAccount ] = useState('');
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
    auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
        setAccount(user.email);
        showToast("toast.welcome", 2000, user.email);
      } else {
        setIsAuthenticated(false);
        showToast("toast.pleaseSignin", 2000);
      }
      setIsLoading(false);
    })
  }, [isAuthenticated]);
  return(
    <div className={'main-page-container'}>
      <Dimmer active={isLoading} />
      {isLoading && 
        <Loading />
      }
      <Navbar signInWithGoogle={signInWithGoogle} isLoading={isLoading} isAuthenticated={isAuthenticated} signOut={signOut} account={account} />
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
const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
})
export default connect(mapStateToProps, { push })(MainPage);