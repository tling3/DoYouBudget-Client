import React from "react"
import { Router, Route } from "react-router-dom"
import history from "../History"
import Categories from "./Categories/Categories"
import AddCategory from "./AddCategory/AddCategory"
import EditCategory from "./EditCategory/EditCategory"
import Header from "../Shared/Header"
import MonthlyLogging from "./MonthlyLogging/MonthlyLogging"
import BudgetDashboard from "./BudgetDashboard"
import EditMonthlyLog from "./EditMonthlyLog/EditMonthlyLog"

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={BudgetDashboard}></Route>
          <Route path="/categories" component={Categories}></Route>
          <Route path="/addCategory" component={AddCategory}></Route>
          <Route path='/editCategory/:id' component={EditCategory}></Route>
          <Route path='/monthlyLogging' component={MonthlyLogging}></Route>
          <Route path='/editMonthlyLog/:id' component={EditMonthlyLog}></Route>
        </div>
      </Router>
    </div>
  );
};

export default App
