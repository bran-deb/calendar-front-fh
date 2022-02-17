import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../store/actions/ui';
import { eventAddNew } from '../../store/actions/events';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}
Modal.setAppElement('#root')
//fecha actual
const now = moment().minutes(0).seconds(0).add(1, 'hours') //3:00:00
// const end = moment().minutes(0).seconds(0).add(2, 'hours')
const nowPlus1 = now.clone().add(1, 'hours')                //fecha 1 hora diferencia


export const CalendarModal = () => {
    const dispatch = useDispatch()

    const { modalOpen } = useSelector(state => state.ui)

    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: nowPlus1.toDate(),
    })
    const { title, notes, start, end } = formValues

    const handleImputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const closeModal = () => {
        dispatch(uiCloseModal())
    }
    //optiene la fecha de inicio seleccionada
    const handleStartDateChange = (e) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }
    //optiene la fecha final seleccionada
    const handleEndDateChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }
    const handleSubmitForm = (e) => {
        e.preventDefault()

        const momentStart = moment(start)
        const momentEnd = moment(end)
        //si la fecha start es igual o esta despues de end es un error
        if (momentStart.isSameOrAfter(momentEnd)) {    //isSameOrAfter function moment
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha de inicio', 'error')
        }
        if (title.trim().length < 3) {
            return setTitleValid(false)
        }

        //TODO: realizar grabacion
        dispatch(eventAddNew({
            ...formValues,
            id: new Date().getTime(),
            user: {
                _id: '123',
                name: 'bran',
            }
        }))
        setTitleValid(true)
        closeModal()
    }

    return (
        <Modal
            isOpen={modalOpen}                  //muestra/oculta el modal
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}            //animacion .2s
            className='modal'
            overlayClassName='modal-fondo'
        >
            {/* mensaje del modal */}
            <h1> Nuevo evento </h1>
            <hr />
            <form
                onSubmit={handleSubmitForm}
                className="container"
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}                   //guarda cambios en la fecha
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}                 //valida fecha final despues de start
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        autoComplete="off"
                        name="title"
                        value={title}
                        onChange={handleImputChange}
                    />
                    <small
                        id="emailHelp"
                        className="form-text text-muted">Una descripción corta
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleImputChange}
                    >
                    </textarea>
                    <small
                        id="emailHelp"
                        className="form-text text-muted">
                        Información adicional
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
