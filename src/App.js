import React, { useReducer, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  Redirect,
  HashRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBoardForm from "./Pages/CreateBoardPage/CreateBoardForm";
import NavBar from "./Layout/NavBar/NavBar";
import HomePage from "./Pages/BoardsHomePage/HomePage";
import Board from "./Components/Boards/Board";
import { GET_DATA } from "./Context/ActionTypes";
import { OrganiserContext } from "./Context/Context";
import reducer from "./Context/Reducer";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig/FirebaseConfig";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp Page/SignUp";

firebase.initializeApp(firebaseConfig);

const initialState = {
  boards: null,
  selectedBoardKey: null,
  selectedBoardValue: null,
  viewCard: false,
  setCardKey: null,
  setColumnKey: null,
  setCardValue: null,
  editCard: false,
  setCard: false,
  dragggedColumnKey: null,
  draggesCardData: null,
  setUser: null,
  error: null,
  complete: [],
  setColumn: false,
  boardColumnsData: null,
  cardEditValue: {},
  loader: false,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  console.log(state.setCardValue);
  console.log(state.editCard);
  console.log(state.setCard);
  console.log(state.setUser);

  // console.log(state.selectedBoardValue);

  return (
    <div>
      <HashRouter basename="/">
        <OrganiserContext.Provider value={{ state, dispatch }}>
          <ToastContainer />

          <Switch>
            <Route exact path="/" component={LandingPage}></Route>

            <Route
              path="/:email/boards/board/:boardKey/:boardName"
              component={Board}
            ></Route>

            <Route path={`/:email/boards`} component={HomePage} />

            <Route path="/:email/createBoard" component={CreateBoardForm} />
            {state.setUser ? (
              <Redirect to={{ pathname: `/${state.setUser.email}/boards` }} />
            ) : (
              <Route path="/login" component={Login}></Route>
            )}
            {state.setUser ? (
              <Redirect to={{ pathname: `/boards` }} />
            ) : (
              <Route path="/signup" component={SignUp}></Route>
            )}
          </Switch>
        </OrganiserContext.Provider>
      </HashRouter>
    </div>
  );
};

export default App;
