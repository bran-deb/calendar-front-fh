import { types } from '../types/types'

const initialState = {
    modalOpen: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UI_OPEN_MODAL:
            return {
                ...state,
                modalOpen: true
            }
        default:
            return state
    }
}