import _ from "lodash";
import { GET_CATEGORIES } from "../Actions/Types";

const CategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};

export default CategoriesReducer;
