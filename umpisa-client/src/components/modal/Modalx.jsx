import PropTypes from 'prop-types'
// import './Modal.css'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CustomerForm from '../datatable/CustomerForm'
// import { useState } from 'react'

function Modalx({
    isOpen,
    onRequestClose,
    modalTitle,
    rowData,
    onInputChange,
    handleSubmit,
    showAddForm
}) {
    return (
        <Modal show={isOpen} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CustomerForm
                    data={rowData}
                    sendDataToParent={onInputChange}
                    showAddForm={showAddForm}
                ></CustomerForm>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onRequestClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
Modalx.propTypes = {
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    modalTitle: PropTypes.string,
    rowData: PropTypes.object,
    onInputChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    showAddForm: PropTypes.bool
}

export default Modalx
