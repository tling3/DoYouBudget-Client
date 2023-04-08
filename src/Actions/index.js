import {
  GET_CATEGORIES,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  INSERT_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_TYPE,
  GET_USER_MONTHLY_LOG_BY_MONTH,
  INSERT_MONTHLY_LOG,
  GET_MONTHLY_LOG_BY_ID,
  UPDATE_MONTHLY_LOG_BY_ID,
  DELETE_MONTHLY_LOG_BY_ID
} from "./Types"
import DoYouBudget from "../Apis/DoYouBudget"
import history from "../History"

export const getCategories = () => async dispatch => {
  console.log("action getCategories fired")
  const response = await DoYouBudget.get("/api/categories")
  dispatch({ type: GET_CATEGORIES, payload: response.data })
}

export const getCategory = id => async dispatch => {
  const response = await DoYouBudget.get(`/api/categories/${id}`)
  dispatch({ type: GET_CATEGORY, payload: response.data })
}

export const updateCategory = (id, budget, category, postDate, userId, typeId) => async dispatch => {
  let budgetInt = parseInt(budget)
  let idInt = parseInt(id)
  let userIdInt = parseInt(userId)
  let typeIdInt = parseInt(typeId)

  var body = {
    id: idInt,
    budget: budgetInt,
    typeId: typeIdInt,
    category: category,
    postDate: postDate,
    userId: userIdInt,
    modifiedBy: "TL"
  }

  const response = await DoYouBudget.put(`/api/categories/${id}`, body)
  dispatch({ type: UPDATE_CATEGORY, payload: response.data })
  history.push('/categories')
}

export const insertCategory = (budget, category, postDate, categoryTypeId) => async dispatch => {
  let budgetInt = parseInt(budget)

  let body = {
    budget: budgetInt,
    category: category,
    typeId: categoryTypeId,
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

export const getCategoryType = () => async dispatch => {
  const response = await DoYouBudget.get('/api/categoryType')
  console.log("index response.data", response.data)
  dispatch({ type: GET_CATEGORY_TYPE, payload: response.data })
}

export const getMonthlyLogs = (userId, month) => async dispatch => {
  
  // TODO: check if you need to parse
  let userIdInt = parseInt(userId)
  let monthInt = parseInt(month)
  const response = await DoYouBudget.get(`/api/monthlyLogs/${userIdInt}/${monthInt}`)
  dispatch({ type: GET_USER_MONTHLY_LOG_BY_MONTH, payload: response.data })
}

export const insertMonthlyLog = (amount, category, date, comment, month) => async dispatch => {
  let body = {
    userId: 1,
    amount: parseInt(amount),
    category: category,
    transactionDate: date,
    comment: comment,
    month: month,
    modifiedBy: "TL",
  }

  const response = await DoYouBudget.post('api/monthlyLogs', body)
  dispatch({ type: INSERT_MONTHLY_LOG, payload: response.data })
}

export const getMonthlyLogById = id => async dispatch => {
  console.log("action getMonthlyLogById fired")
  // TODO: Check if you need to parse
  let idInt = parseInt(id)
  const response = await DoYouBudget.get(`/api/monthlyLogs/${id}`)
  dispatch({ type: GET_MONTHLY_LOG_BY_ID, payload: response.data })
}

export const updateMonthlyLogById = (id, amount, category, transactionDate, comment, month) => async dispatch => {
  let body = {
    id: parseInt(id),
    userId: 1,
    amount: parseInt(amount),
    category: category,
    transactionDate: transactionDate,
    comment: comment,
    month: parseInt(month),
    modifiedBy: "TL",
  }

  const response = await DoYouBudget.put(`api/monthlyLogs/${id}`, body)

  dispatch({ type: UPDATE_MONTHLY_LOG_BY_ID, payload: response.data })
  history.push('/monthlyLogging')
}

export const deleteMonthlyLog = id => async dispatch => {
  console.log("action, ml id:", id)
  const response = await DoYouBudget.delete(`api/monthlyLogs/${id}`)
  dispatch({ type: DELETE_MONTHLY_LOG_BY_ID, payload: response.data })
  history.push('/monthlyLogging')
}
