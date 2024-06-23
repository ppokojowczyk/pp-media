import React from "react";
import "./dist/style.css";
import Menu from "./components/menu";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.dark.css";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Logo from "./components/logo";
import {
  ALBUMS_TYPE,
  APP_TITLE,
  BOOKS_TYPE,
  GAMES_TYPE,
  MOVIES_TYPE,
} from "./utils/constants";
import { makeList } from "./utils/list-factory";
import Statistics from "./components/statistics";

const MediaApp = () => {
  return (
    <div className="App">
      <div className="App-wrapper">
        <Router>
          <header className="App-header">
            <Logo />
            <div className="App-header-title">{APP_TITLE}</div>
            <Menu />
          </header>
          <div className="App-content">
            <Route exact path="/" render={() => <Redirect to="/movies" />} />
            <Route exact path="/movies/:id?" render={() => makeList(MOVIES_TYPE)} />
            <Route exact path="/games/:id?" render={() => makeList(GAMES_TYPE)} />
            <Route exact path="/books/:id?" render={() => makeList(BOOKS_TYPE)} />
            <Route exact path="/albums/:id?" render={() => makeList(ALBUMS_TYPE)} />
            <Route exact path="/statistics" component={Statistics} />
          </div>
        </Router>
      </div>
    </div>
  );
};

export default MediaApp;
