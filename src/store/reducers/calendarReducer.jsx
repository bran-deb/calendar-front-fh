import moment from "moment"
import { types } from "../types/types"


const initialState = {
    events: [
        {
            id: new Date().getTime(),
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
        case types.EVENT_UPDATE:
            //verifica si el evento es igual al evento de la accion
            //si es actualiza en nuevo payload sino retorna el event
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id)
                        ? action.payload
                        : event
                )
            }
        default:
            return state
    }
}
