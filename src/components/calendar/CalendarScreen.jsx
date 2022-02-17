import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../store/actions/ui'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'


//cambia idioma a español
moment.locale('es')

const localizer = momentLocalizer(moment)
const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    allDay: true,
    bgcolor: '#fafafa',
    notes: 'comprar el pastel',
    user: {
        _id: '123',
        name: 'Frans',
    }
}]


export const CalendarScreen = () => {
    const dispatch = useDispatch()

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        console.log('abrir el modal');
        dispatch(uiOpenModal())
    }
    const onSelect = (e) => {
        console.log(e)
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
                onSelectEvent={onSelect}
                onView={onViewChange}       //retorna nombre vista
                view={lastView}             //vista actual
                components={{
                    event: CalendarEvent    //muestra nombre y title de event
                }}
            />
            <CalendarModal />
        </div>
    )
}
