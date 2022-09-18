import { combineReducers } from "redux"
import CategoriesReducer from "./CategoriesReducer"
import CategoryTypeReducer from "./CategoryTypeReducer";

export default combineReducers({
  categories: CategoriesReducer,
  categoryType: CategoryTypeReducer
});
