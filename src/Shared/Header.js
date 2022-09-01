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
      <Link to="/pawfl" className="ui header item">
        Paw Front Left
      </Link>
      <Link to="/paw2" className="ui header item">
        Paw2
      </Link>
      <Link to="/paw3" className="ui header item">
        Paw3
      </Link>
      <Link to="/paw4" className="ui header item">
        Paw4
      </Link>
    </div>
  );
};

export default Header;
