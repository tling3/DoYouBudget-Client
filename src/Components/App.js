import React from "react"
import { Router, Route } from "react-router-dom"
import history from "../History"
import PageOne from "./PageOne"
import Categories from "./Categories/Categories"
import AddCategory from "./AddCategory/AddCategory"
import EditCategory from "./EditCategory/EditCategory"
import Header from "../Shared/Header"
import MonthlyLogging from "./MonthlyLogging/MonthlyLogging"

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={PageOne}></Route>
          <Route path="/categories" component={Categories}></Route>
          <Route path="/addCategory" component={AddCategory}></Route>
          <Route path='/editCategory/:id' component={EditCategory}></Route>
          <Route path='/logging' component={MonthlyLogging}></Route>
        </div>
      </Router>
    </div>
  );
};

export default App
