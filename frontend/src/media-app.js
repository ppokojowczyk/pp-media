import React from "react";
import "./dist/style.css";
import Menu from "./components/menu";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Logo from "./components/logo";
import {
  ALBUM_TYPE,
  APP_TITLE,
  BOOK_TYPE,
  GAME_TYPE,
  MOVIE_TYPE,
} from "./utils/constants";
import { makeList } from "./utils/list-factory";
import Statistics from "./components/statistics";
import Import from "./contexts/import";

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
            <Route exact path="/movies/:id?" render={() => makeList(MOVIE_TYPE)} />
            <Route exact path="/games/:id?" render={() => makeList(GAME_TYPE)} />
            <Route exact path="/books/:id?" render={() => makeList(BOOK_TYPE)} />
            <Route exact path="/albums/:id?" render={() => makeList(ALBUM_TYPE)} />
            <Route exact path="/statistics" component={Statistics} />
            <Route exact path="/import" component={Import} />
          </div>
        </Router>
      </div>
    </div>
  );
};

export default MediaApp;
