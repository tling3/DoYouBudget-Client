import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../History";
import PageOne from "./PageOne";
import Header from "../Shared/Header";

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Route path="/" exact component={PageOne}></Route>
      </div>
    </Router>
  );
};

export default App;
