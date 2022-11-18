import _ from 'lodash'
import {
    GET_USER_MONTHLY_LOG_BY_MONTH,
    INSERT_MONTHLY_LOG
} from '../Actions/Types'

const MonthlyLogReducer = (state = [], action) => {
    switch (action.type) {
        case GET_USER_MONTHLY_LOG_BY_MONTH:
            return { ...state, ..._.mapKeys(action.payload, "id") }
        case INSERT_MONTHLY_LOG:
            console.log("action payload reducer", action.payload)
            return { ...state }
        // return {}
        default:
            return state
    }
}

export default MonthlyLogReducer