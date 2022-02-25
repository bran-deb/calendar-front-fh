import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../../helpers/fetch"
import { types } from "../types/types"
import { eventLogout } from "./events"


//action async session start
export const startLogin = (email, password) => {
    return async (dispatch) => {
        //fetch de la url sin token
        const resp = await fetchSinToken('auth', { email, password }, 'POST')
        const body = await resp.json()
        const { uid, name, token } = body       //obtenemos los datos de body desde el backend
        //si es correcto guardamos en el localStorageel token y cuando fue creado
        if (body.ok) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login({ uid, name }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}
//action async register session
export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        //fetch de la url sin token
        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST')
        const body = await resp.json()
        const { uid, token } = body
        //si es correcto guardamos en el localStorageel token y cuando fue creado
        if (body.ok) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login({ uid, name: body.name }))   //usa body.name por que ya hay un name
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}
//mantiene el estado de autenticacion con el localstorage
export const startChecking = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew', {})  //GET
        const body = await resp.json()
        const { name, uid, token } = body
        //si es correcto guardamos en el localStorageel token y cuando fue creado
        if (body.ok) {
            localStorage.setItem('token', token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login({ uid, name }))
        } else {
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => ({
    type: types.AUTH_CHECKING_FINISH
})

const login = (user) => ({
    type: types.AUTH_LOGIN,
    payload: user
})

export const startLogout = () => {
    return async (dispatch) => {
        localStorage.clear()
        dispatch(eventLogout())
        dispatch(logout())
    }
}

const logout = () => ({
    type: types.AUTH_LOGOUT
})