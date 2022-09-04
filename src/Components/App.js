import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../History";
import PageOne from "./PageOne";
import Categories from "./Categories/Categories";
import AddCategory from "./AddCategory/AddCategory";
import Paw1 from './Paw1';
import Paw2 from './Paw2';
import Paw3 from "./Paw3";
import Paw4 from './Paw4'
import Header from "../Shared/Header";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
            <Route path="/" exact component={PageOne}></Route>
            <Route path="/categories" component={Categories}></Route>
            <Route path="/addCategory" component={AddCategory}></Route>
            <Route path="/paw1" component={Paw1}></Route>
            <Route path="/paw2" component={Paw2}></Route>
            <Route path='/paw3' component={Paw3}></Route>
            <Route path='/paw4' component={Paw4}></Route>
        </div>
      </Router>
    </div>
  );
};

export default App;
