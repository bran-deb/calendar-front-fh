import Swal from "sweetalert2"
import { fetchSinToken } from "../../helpers/fetch"
import { types } from "../types/types"


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
        console.log(body)
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

const login = (user) => ({
    type: types.AUTH_LOGIN,
    payload: user
})