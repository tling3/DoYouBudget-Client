import {
  GET_CATEGORIES,
  GET_CATEGORY,
  UPDATE_CATEGORY,
  INSERT_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_TYPE,
  GET_USER_MONTHLY_LOG_BY_MONTH,
  INSERT_MONTHLY_LOG
} from "./Types"
import DoYouBudget from "../Apis/DoYouBudget"
import history from "../History"

var fsdf = "fsdf"

export const getCategories = () => async dispatch => {
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
  dispatch({ type: GET_CATEGORY_TYPE, payload: response.data })
}

export const getMonthlyLogs = (userId, month) => async dispatch => {
  // TODO: check if you need to parse
  console.log("getMonthlyLogs action fired")

  let userIdInt = parseInt(userId)
  let monthInt = parseInt(month)
  // let url = `/api/monthlyLogs/${userIdInt}/${monthInt}`
  // console.log("url", url)

  const response = await DoYouBudget.get(`/api/monthlyLogs/${userIdInt}/${monthInt}`)
  dispatch({ type: GET_USER_MONTHLY_LOG_BY_MONTH, payload: response.data })
}

export const insertMonthlyLog = (amount, category, date, comment, month) => dispatch => {

  // console.log("action amount", parseInt(amount))
  // console.log("action category", category)
  // console.log("action date", date)
  // console.log("action comment", comment)
  // console.log("action month", month)

  console.log("insertMonthlyLog action fired")


  let body = {
    userId: 1,
    amount: parseInt(amount),
    category: category,
    transactionDate: date,
    comment: comment,
    month: month,
    modifiedBy: "TL",
  }

  const response = DoYouBudget.post('api/monthlyLogs', body)
  console.log("action response hopefully: ", response.data)

  dispatch({ type: INSERT_MONTHLY_LOG, payload: response.data })
  // history.push("/")
}
