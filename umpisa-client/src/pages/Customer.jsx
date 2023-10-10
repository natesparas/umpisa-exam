import PropTypes from 'prop-types'
import CustomerTable from '../components/datatable/Customer'
import SweetAlert from 'react-bootstrap-sweetalert'
import { useState } from 'react'
import { deleteCustomer } from '../api/Customer'
import toast from 'react-hot-toast'

function Customer(props) {
    const [showAlert, setShowAlert] = useState({})
    const [alerContent, setAlertContent] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)

    // Function to show the alert
    const showDeleteAlert = (data) => {
        setShowAlert(data)
        setAlertContent(data.name)
    }

    // Function to hide the alert
    const hideAlertHandler = () => {
        setShowAlert(false)
    }

    const handleRefreshData = async (data) => {
        setRefresh(data)
    }

    const handleDelete = async () => {
        try {
            const result = await deleteCustomer(showAlert.id)
            if (result.deletedCount > 0) {
                // success
                toast.success('Successfully deleted!')
            } else {
                // error
                toast.error(result.error)
            }
            handleRefreshData(true)
            setShowAlert((showAlert.showAlert = false))
        } catch (error) {
            toast.error(error)
        }
    }

    const handleShowAddForm = async () => {
        setShowAddForm(true)
    }

    const handleReShowAddForm = async (data) => {
        setShowAddForm(data)
    }

    return (
        <>
            {showAlert.showAlert && (
                <SweetAlert
                    warning
                    showCancel
                    title="Are you sure you want to delete?"
                    onConfirm={handleDelete} // Function to handle submit
                    onCancel={hideAlertHandler} // Function to handle cancel
                    confirmBtnText="Yes, delete it!" // Text for the submit button
                    confirmBtnBsStyle="danger"
                    cancelBtnText="Cancel" // Text for the cancel button
                    focusCancelBtn
                >
                    Name: {alerContent}
                </SweetAlert>
            )}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">{props.title}</h1>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="row">
                        <div className="col-xl-6 col-md-6" style={{ paddingTop: '7px' }}>
                            <h6 className="m-0 font-weight-bold text-primary">Customer List</h6>
                        </div>
                        <div className="col-xl-6 col-md-6 text-end">
                            <button
                                className="btn btn-sm btn-primary btn-icon"
                                onClick={handleShowAddForm}
                            >
                                <i className="fa-regular fa-pen-to-square"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <CustomerTable
                            showDeleteAlert={showDeleteAlert}
                            reRender={refresh}
                            showAddForm={showAddForm}
                            modalAddTitle={'Add Customer'}
                            reShowAddForm={handleReShowAddForm}
                        ></CustomerTable>
                    </div>
                </div>
            </div>
        </>
    )
}

Customer.propTypes = {
    title: PropTypes.string
}

export default Customer
