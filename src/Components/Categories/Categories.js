import React from "react";
import { connect } from "react-redux";
import { getCategories } from "../../Actions/index";
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
        <div className="ui one column grid" key={item.id}>
          <div className="column">
            <div className="ui fluid card">
              <div className="content">
                <button
                  type="button"
                  className={`right floated ui button hidden`}
                >
                  Edit
                </button>
                <div className="header">
                  {counter}. {item.category}
                </div>
                <div className="content">
                  <div className="description">$ {item.budget}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <div className="ui statistic">
        <div className="label">Categories Total</div>
        <div className="value">$ {budgetArray[budgetArray.length - 1]}</div>
      </div>
    );
  };

  render() {
    console.log("categories", this.props.categories);
    return (
      <div>
        {this.mapCategories()}
        <div className="ui hidden divider"></div>
        <div className="ui divider"></div>
        <div className="ui hidden divider"></div>

        <form className="ui form" onSubmit={this.onSubmit}>
          <button type="button" className="medium ui button">
            Add Category
          </button>
        </form>

        <div className="ui hidden divider"></div>
        {this.getCategoriesTotal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: Object.values(state.categories) };
};

export default connect(mapStateToProps, { getCategories })(Categories);
