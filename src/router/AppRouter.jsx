import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { startChecking } from '../store/actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'


export const AppRouter = () => {

    const { checking, uid } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    //cuando se renderiza verifica si esta autenticado
    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return <h3 className='row justify-content-center'>Loading...</h3>
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={
                        <PublicRoute isAuthenticated={!!uid}>
                            <LoginScreen />
                        </PublicRoute>
                    } />
                    <Route path='/' element={
                        <PrivateRoute isAuthenticated={!!uid}>
                            <CalendarScreen />
                        </PrivateRoute>
                    } />

                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
