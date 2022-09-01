import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="ui header item">
        DoYouBudget
      </Link>
      <Link to="/categories" className="ui header item">
        Categories
      </Link>
      <Link to="/paw1" className="ui header item">
        Paw1
      </Link>
    </div>
  );
};

export default Header;
