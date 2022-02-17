import { types } from "../types/types";


//sync
export const eventAddNew = (event) => ({
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