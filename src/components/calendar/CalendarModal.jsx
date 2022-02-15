import React, { useState } from 'react'
import Modal from 'react-modal'


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


export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(!isOpen)
        //TODO: dispatch del modal
    }

    return (
        <Modal
            isOpen={isOpen}                  //muestra/oculta el modal
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}            //animacion .2s
            className='modal'
            overlayClassName='modal-fondo'
        >
            {/* mensaje del modal */}
            <h1>Hola Mundo</h1>
            <hr />
            <span>Hola de nuevo...</span>
        </Modal>
    )
}
