import { types } from "../types/types"

// {
//     id: new Date().getTime(),
//     title: 'Cumpleaños del jefe',
//     notes: 'comprar el pastel',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     allDay: true,
//     user: {
//         _id: '123',
//         name: 'Frans',
//     }
// }

const initialState = {
    events: [],
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
        case types.EVENT_DELETED:
            //filtra todos los eventos que tengan el id diferente a el evento actual
            //actualiza activeEvent a null por que ya no existe
            return {
                ...state,
                events: state.events.filter(
                    event => (event.id !== state.activeEvent.id)
                ),
                activeEvent: null
            }
        case types.EVENT_LOADED:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.EVENT_LOGOUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}
