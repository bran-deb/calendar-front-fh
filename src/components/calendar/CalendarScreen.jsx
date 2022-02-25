import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'
import { uiOpenModal } from '../../store/actions/ui'
import { eventClearActiveNote, eventSetActive, eventStartLoading } from '../../store/actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'


//cambia idioma a español
moment.locale('es')

const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {
    const dispatch = useDispatch()
    const { uid } = useSelector(state => state.auth)
    const { events, activeEvent } = useSelector(state => state.calendar)

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

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
    }//obtiene info de lo seleccionado
    const onSelectSlot = (e) => {
        console.log(e);
        dispatch(eventClearActiveNote())
    }

    //personaliza eventos del calendar
    const eventStyleGetter = (event, start, end, isSelected) => {

        console.log(event)
        if (uid === event.id) {

        }

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
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
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}       //retorna nombre vista
                view={lastView}             //vista actual
                components={{
                    event: CalendarEvent    //muestra nombre y title de event
                }}
            />
            {activeEvent && <DeleteEventFab />}
            <AddNewFab />
            <CalendarModal />
        </div>
    )
}
