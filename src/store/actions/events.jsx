import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { prepareEvents } from "../../helpers/prepareEvents";
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

//verifica que usuario puede editar el evento
export const eventStartActiveUpdate = (event) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json()

            if (body.ok) {
                dispatch(eventUpdated(event))
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error);
        }
    }
}
const eventUpdated = (event) => ({
    type: types.EVENT_UPDATE,
    payload: event
})

//verifica si el usuario puede eliminar un evento
export const eventStartDeleted = () => {
    return async (dispatch, getState) => {
        const { id } = getState().calendar.activeEvent
        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
            const body = await resp.json()

            if (body.ok) {
                dispatch(eventDeleted())
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log(error);
        }
    }
}
const eventDeleted = () => ({
    type: types.EVENT_DELETED
})

//cargar lista de eventos desde la bd
export const eventStartLoading = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('events', {})
            const body = await resp.json()
            //preparamos el evento para que coincida con los datos
            const events = prepareEvents(body.eventos)      //obtiene la lista de eventos

            dispatch(eventLoaded(events))

        } catch (error) {
            console.log(error);
        }
    }
}
const eventLoaded = (events) => ({
    type: types.EVENT_LOADED,
    payload: events
})

//retorna el initialstate
export const eventLogout = () => ({
    type: types.EVENT_LOGOUT
})