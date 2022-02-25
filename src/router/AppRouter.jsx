import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { startChecking } from '../store/actions/auth'

export const AppRouter = () => {

    const dispatch = useDispatch()
    //cuando se renderiza verifica si esta autenticado
    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])


    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/' element={<CalendarScreen />} />

                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
