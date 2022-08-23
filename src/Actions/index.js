import { GET_CATEGORIES } from "./Types";
import DoYouBudget from "../Apis/DoYouBudget";

export const getCategories = () => async (dispatch) => {
  const response = await DoYouBudget.get("/api/categories");
  dispatch({ type: GET_CATEGORIES, payload: response.data });
};
