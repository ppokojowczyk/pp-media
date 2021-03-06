import React from "react";
import "./assets/style.css";
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
            <Route exact path="/movies" render={() => makeList(MOVIES_TYPE)} />
            <Route exact path="/games" render={() => makeList(GAMES_TYPE)} />
            <Route exact path="/books" render={() => makeList(BOOKS_TYPE)} />
            <Route exact path="/albums" render={() => makeList(ALBUMS_TYPE)} />
          </div>
        </Router>
      </div>
    </div>
  );
};

export default MediaApp;
