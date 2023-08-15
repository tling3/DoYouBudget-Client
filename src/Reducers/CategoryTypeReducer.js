import _ from 'lodash'

import { GET_CATEGORY_TYPE } from '../Actions/Types'

const CategoryTypeReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CATEGORY_TYPE:
            return { ...state, ..._.mapKeys(action.payload, "id") }
        default:
            return state
    }
}

export default CategoryTypeReducer
