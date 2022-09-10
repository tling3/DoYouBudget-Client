import React from "react";
import { connect } from "react-redux";
import { getCategories } from "../../Actions/index";
import Utility from "../../Shared/Utility/Utility";
import { Link } from 'react-router-dom'
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

  renderAdmin(item) {
    return (
      <React.Fragment>
        <Link to={`/editCategory/${item.id}`} className="medium ui right floated basic button">Edit</Link>
      </React.Fragment>
    );
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
          <td>{this.renderAdmin(item)}</td>
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
          <th></th>
        </tr>
      </tfoot>
    );
  };

  render() {
    return (
      <div>
        <div className="margin right">
          <Link to='/addCategory' className="medium ui right basic button">Add Category</Link>
        </div>
        <table className="ui selectable celled table">
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
              <th>Expense</th>
              <th>Post Date</th>
              <th className="ui right aligned">Admin</th>
            </tr>
          </thead>
          <tbody>
            {this.mapCategories()}
          </tbody>
          {this.getCategoriesTotal()}
        </table>
        <div className="ui hidden divider"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: Object.values(state.categories) };
};

export default connect(mapStateToProps, { getCategories })(Categories);
