import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../History";
import PageOne from "./PageOne";
import Categories from "./Categories/Categories";
import Paw1 from "./Sand/Paw1";
import Paw2 from "./Sand/Paw2";
import Paw3 from "./Sand/Paw3";
import Paw4 from "./Sand/Paw4";
import Header from "../Shared/Header";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={PageOne}></Route>
          <Route path="/categories" exact component={Categories}></Route>
          <Route path="/paw1" exact component={Paw1}></Route>
          <Route path="/paw2" exact component={Paw2} ></Route>
          <Route path="/paw3" exact component={Paw3} ></Route>
          <Route path="/paw4" exact component={Paw4} ></Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
