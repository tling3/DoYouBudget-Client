import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="ui header item">DoYouBudget</Link>
      <Link to="/categories" className="ui header item">Categories</Link>
      <Link to='/logging' className="ui header item">Logging</Link>
    </div>
  );
};

export default Header
