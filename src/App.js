import React, { useReducer } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBoardForm from "./Pages/CreateBoardPage/CreateBoardForm";
import HomePage from "./Pages/BoardsHomePage/HomePage";
import Board from "./Components/Boards/Board";
import { OrganiserContext } from "./Context/Context";
import reducer from "./Context/Reducer";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig/FirebaseConfig";

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
  return (
    <Router>
      <OrganiserContext.Provider value={{ state, dispatch }}>
        <ToastContainer />

        <Switch>
          <Route exact path={`/`} component={HomePage} />

          <Route exact path={`/boards`} component={HomePage} />

          <Route exact path="/createBoard" component={CreateBoardForm} />

          <Route
            exact
            path="/board/:boardKey/:boardName"
            component={Board}
          ></Route>
        </Switch>
      </OrganiserContext.Provider>
    </Router>
  );
};

export default App;
