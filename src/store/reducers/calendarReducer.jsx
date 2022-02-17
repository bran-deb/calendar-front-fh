import moment from "moment"
import { types } from "../types/types"


const initialState = {
    events: [
        {
            title: 'Cumpleaños del jefe',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            allDay: true,
            bgcolor: '#fafafa',
            notes: 'comprar el pastel',
            user: {
                _id: '123',
                name: 'Frans',
            }
        }
    ],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EVENT_SET_ACTIVE:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.EVENT_ADD_NEW:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case types.EVENT_CLEAR_ACTIVE_EVENT:
            return {
                ...state,
                activeEvent: null
            }
        default:
            return state
    }
}
