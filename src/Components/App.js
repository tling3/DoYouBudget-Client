import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../History";
import PageOne from "./PageOne";
import Categories from "./Categories/Categories";
import Header from "../Shared/Header";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={PageOne}></Route>
          <Route path="/categories" exact component={Categories}></Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
