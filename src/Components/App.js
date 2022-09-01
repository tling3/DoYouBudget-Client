import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../History";
import Header from "../Shared/Header";
import PageOne from "./PageOne";
import Categories from "./Categories/Categories";
import Pawfl from './Sand/pawfl';
import Paw2 from './Sand/paw2';
import Paw3 from './Sand/paw3';
import Paw4 from './Sand/paw4';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={PageOne}></Route>
          <Route path="/categories" exact component={Categories}></Route>
          <Route Path="/pawfl" exact component={Pawfl}></Route>
          <Route path="/paw2" exact component={Paw2}></Route>
          <Route path="/paw3" exact component={Paw3}></Route>
          <Route path="/paw4" exact component={Paw4}></Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
