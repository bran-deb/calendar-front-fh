import { types } from "../types/types"



const initialState = {
    checking: true,     //isAuth
    // uid: null,
    // name: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_LOGIN:
            return {
                ...state,
                checking: false,
                ...action.payload   //contiene user(uid,name)
            }
        default:
            return state
    }
}