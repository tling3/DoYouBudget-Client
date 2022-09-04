import React from "react";
import { connect } from "react-redux";
import { getCategories } from "../../Actions/index";
import Utility from "../../Shared/Utility/Utility";
import { Link } from 'react-router-dom'
import NoPropagate from "../NoPropagate";
import "./Categories.css";

class Categories extends React.Component {
  state = {
    // you need to research this state object here - what is the purpose?
    categories: [],
  };

  componentDidMount() {
    this.props.getCategories();
  }

  onSubmit(event) {
    event.preventDefault();
  }

  mapCategories = () => {
    var counter = 0;
    return this.props.categories.map((item) => {
      counter++;
      return (
        <tr key={item.id}>
          <td>{counter}</td>
          <td>{item.category}</td>
          <td>$ {item.budget}</td>
          <td>{Utility.ConvertDateTime(item.postDate)}</td>
        </tr>
      );
    });
  };

  getCategoriesTotal = () => {
    var sum = 0;
    var budgetArray = this.props.categories.map((item) => {
      sum += item.budget;
      return sum;
    });
    return (
      <tfoot>
        <tr>
          <th></th>
          <th className="right aligned"><strong>Total</strong></th>
          <th><strong>$ {budgetArray[budgetArray.length - 1]}</strong></th>
          <th></th>
        </tr>
      </tfoot>
    );
  };

  render() {
    console.log("categories", this.props.categories);
    return (
      <div>
        <table className="ui selectable celled table">
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Expense</th>
              <th>Post Date</th>
            </tr>
          </thead>
          <tbody>
            {this.mapCategories()}
          </tbody>
          {this.getCategoriesTotal()}
        </table>
        <div className="ui hidden divider"></div>
        <form className="ui form" onSubmit={this.onSubmit}>
          <Link to='/addCategory' className="medium ui basic button">Add Category</Link>
          <Link to='/paw1' className="medium ui basic button">Paw 1</Link>
          <Link to='paw2' className="medium ui basic button">Paw 2</Link>
          <Link to='/paw3' className="medium ui basic button">Paw 3</Link>
          <Link to='/paw4' className="medium ui basic button">Paw 4</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: Object.values(state.categories) };
};

export default connect(mapStateToProps, { getCategories })(Categories);
