import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="ui header item">DoYouBudget</Link>
      <Link to="/monthlyLog" className="ui header item">Monthly Logs</Link>
      <Link to="/categories" className="ui header item">Categories</Link>
    </div>
  );
};

export default Header
