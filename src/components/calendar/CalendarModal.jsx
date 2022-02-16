import React, { useState } from 'react'

import moment from 'moment';
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';


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
    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())

    const closeModal = () => {
        //TODO: dispatch del modal
    }
    //optiene la fecha de inicio seleccionada
    const handleStartDateChange = (e) => {
        setDateStart(e)
        console.log(e);
    }
    //optiene la fecha final seleccionada
    const handleEndDateChange = (e) => {
        setDateEnd(e)
        console.log(e)
    }

    return (
        <Modal
            isOpen={true}                  //muestra/oculta el modal
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
            <form className="container">

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
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
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
