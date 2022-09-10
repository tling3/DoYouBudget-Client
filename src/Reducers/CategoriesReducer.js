import _ from "lodash"
import {
  DELETE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY,
  INSERT_CATEGORY,
  UPDATE_CATEGORY
} from "../Actions/Types"

const CategoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, ..._.mapKeys(action.payload, "id") }
    case GET_CATEGORY:
      return { ...state, [action.payload.id]: action.payload }
    case UPDATE_CATEGORY:
      return {}
    case INSERT_CATEGORY:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_CATEGORY:
      return {}
    default:
      return state
  }
};

export default CategoriesReducer
