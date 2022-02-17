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