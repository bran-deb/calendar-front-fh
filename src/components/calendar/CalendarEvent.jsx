import React from 'react'

export const CalendarEvent = ({ event }) => {

    const { title, user } = event
    const { name } = user

    return (
        <div>
            <strong> {title} </strong>
            <span>- {name} </span>
        </div>
    )
}
