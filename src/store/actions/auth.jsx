import { fetchSinToken } from "../../helpers/fetch"
import { types } from "../types/types"


//action async
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
        }
    }
}

const login = (user) => ({
    type: types.AUTH_LOGIN,
    payload: user
})