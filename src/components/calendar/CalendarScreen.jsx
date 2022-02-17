import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../store/actions/ui'
import { eventSetActive } from '../../store/actions/events'
import { AddNewFab } from '../ui/AddNewFab'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'


//cambia idioma a español
moment.locale('es')

const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {
    const dispatch = useDispatch()

    const { events } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')
    //abre modal
    const onDoubleClick = (e) => {
        dispatch(uiOpenModal())
    }
    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e))
    }
    const onViewChange = (e) => {
        setLastView(e)
        localStorage.setItem('lastView', e)
    }

    //personaliza eventos del calendar
    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    }

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}       //fechas e idioma de localizacion
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}         //idioma mensajes es
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}       //retorna nombre vista
                view={lastView}             //vista actual
                components={{
                    event: CalendarEvent    //muestra nombre y title de event
                }}
            />
            <AddNewFab />
            <CalendarModal />
        </div>
    )
}
