import { fetchConToken } from "../../helpers/fetch";
import { types } from "../types/types";


//Guardar nuevo evento en la DB
export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {
        const { uid, name } = getState().auth
        //fetch de la url con token
        try {
            const resp = await fetchConToken('events', event, 'POST') //event del payload contiene los datos
            const body = await resp.json()                            //se crea el event y nos retorna los datos incluidos user y id
            //verifica si body se inserto en la db
            if (body.ok) {
                event.id = body.evento.id    //obtiene el id del evento de body
                event.user = {               //obtiene el user de body
                    _id: uid,
                    name: name
                }
                console.log(event);
                dispatch(eventAddNew(event))
            }

        } catch (error) {
            console.log(error)
        }
    }
}
//agrega un nuevo evento al array de eventos
const eventAddNew = (event) => ({
    type: types.EVENT_ADD_NEW,
    payload: event
})

export const eventSetActive = (event) => ({
    type: types.EVENT_SET_ACTIVE,
    payload: event
})

export const eventClearActiveNote = () => ({
    type: types.EVENT_CLEAR_ACTIVE_EVENT
})
export const eventUpdated = (event) => ({
    type: types.EVENT_UPDATE,
    payload: event
})
export const eventDeleted = () => ({
    type: types.EVENT_DELETED
})