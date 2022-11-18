import { combineReducers } from "redux"
import CategoriesReducer from "./CategoriesReducer"
import CategoryTypeReducer from "./CategoryTypeReducer"
import MonthlyLogReducer from "./MonthlyLogReducer"

export default combineReducers({
  categories: CategoriesReducer,
  categoryType: CategoryTypeReducer,
  monthlyLogs: MonthlyLogReducer
});
