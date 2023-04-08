import _ from 'lodash'
import {
    DELETE_MONTHLY_LOG_BY_ID,
    GET_MONTHLY_LOG_BY_ID,
    GET_USER_MONTHLY_LOG_BY_MONTH,
    INSERT_MONTHLY_LOG,
    UPDATE_MONTHLY_LOG_BY_ID
} from '../Actions/Types'

const MonthlyLogReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USER_MONTHLY_LOG_BY_MONTH:
            return { ...state, ..._.mapKeys(action.payload, "id") }
        case INSERT_MONTHLY_LOG:
            return { ...state, [action.payload.id]: action.payload }
        case GET_MONTHLY_LOG_BY_ID:
            console.log("GET_MONTHLY_LOG_BY_ID reducer fired")
            return { ...state, [action.payload.id]: action.payload }
        case UPDATE_MONTHLY_LOG_BY_ID:
            // todo: there is no state return here - look into this
            return {}
        case DELETE_MONTHLY_LOG_BY_ID:
            return {}
        default:
            return state
    }
}

export default MonthlyLogReducer
