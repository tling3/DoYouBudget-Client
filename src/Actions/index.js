import {
  GET_CATEGORIES,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  INSERT_CATEGORY,
  DELETE_CATEGORY
} from "./Types"
import DoYouBudget from "../Apis/DoYouBudget"
import history from "../History"

export const getCategories = () => async dispatch => {
  const response = await DoYouBudget.get("/api/categories")
  dispatch({ type: GET_CATEGORIES, payload: response.data })
}

export const getCategory = id => async dispatch => {
  const response = await DoYouBudget.get(`/api/categories/${id}`)
  dispatch({ type: GET_CATEGORY, payload: response.data })
}

export const updateCategory = (id, budget, category, postDate, userId) => async dispatch => {
  let budgetInt = parseInt(budget)
  let idInt = parseInt(id)
  let userIdInt = parseInt(userId)

  var body = {
    id: idInt,
    budget: budgetInt,
    category: category,
    postDate: postDate,
    userId: userIdInt,
    modifiedBy: "TL"
  }

  const response = await DoYouBudget.put(`/api/categories/${id}`, body)
  dispatch({ type: UPDATE_CATEGORY, payload: response.data })
  history.push('/categories')
}

export const insertCategory = (budget, category, postDate) => async dispatch => {
  let budgetInt = parseInt(budget)

  var body = {
    budget: budgetInt,
    category: category,
    postDate: postDate,
    userId: 1,
    modifiedBy: "TL"
  }

  const response = await DoYouBudget.post('/api/categories', body)
  dispatch({ type: INSERT_CATEGORY, payload: response.data })
  history.push('/categories')
}

export const deleteCategory = id => async dispatch => {
  let idInt = parseInt(id)
  const response = await DoYouBudget.delete(`/api/categories/${idInt}`)
  dispatch({ type: DELETE_CATEGORY, payload: response.data })
  history.push('/categories')
}
