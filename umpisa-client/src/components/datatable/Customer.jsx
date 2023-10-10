// import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import './Customer.css'
import Modalx from '../modal/Modalx'
import toast from 'react-hot-toast'
import { getCustomer, createCustomer, updateCustomer } from '../../api/Customer'

function Customer({ showDeleteAlert, reRender, showAddForm, modalAddTitle, reShowAddForm }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([])
    const [rend, setRender] = useState(false)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getCustomer()
                setData(apiData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [reRender, rend])

    const handleDelete = (row) => {
        row.showAlert = true
        showDeleteAlert(row)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [rowData, setRowData] = useState({})
    const [modalTitle, setModalTitle] = useState('')

    const handleEdit = (row) => {
        setRowData(row)
        setIsModalOpen(true)
        setModalTitle('Edit Customer')
    }

    useEffect(() => {
        setIsModalOpen(showAddForm ? true : false)
    }, [showAddForm])

    const closeModal = () => {
        setRowData({
            name: '',
            address: '',
            contactno: ''
        })
        reShowAddForm(false)
        setIsModalOpen(false)
    }

    const handleInputChange = (newData) => {
        // console.log(newData)
        setRowData(newData)
    }

    const columns = [
        {
            name: 'LN',
            selector: (row) => row.id
        },
        {
            name: 'Name',
            selector: (row) => row.name
        },
        {
            name: 'Address',
            selector: (row) => row.address
        },
        {
            name: 'Contact No',
            selector: (row) => row.contactno
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button
                        className="btn btn-xs btn-primary btn-icon"
                        onClick={() => handleEdit(row)}
                    >
                        <i className="fa-regular fa-pen-to-square"></i> Edit
                    </button>
                    <button
                        className="btn btn-xs btn-danger btn-icon"
                        onClick={() => handleDelete(row)}
                    >
                        <i className="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            )
        }
    ]

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: 'lightblue'
            }
        },
        headCells: {
            style: {
                fontWeight: 'bold'
            }
        },
        rows: {
            style: {
                cursor: 'pointer'
            }
        },
        cells: {
            style: {
                paddingLeft: '8px', // Custom padding for cells
                paddingRight: '8px'
            }
        }
    }

    const handleSubmit = async () => {
        try {
            let result, msg
            if (rowData.add) {
                // Create customer API
                result = await createCustomer(rowData)
                msg = 'Successfully Added!'
            } else {
                result = await updateCustomer(rowData)
                msg = 'Successfully updated!'
            }

            if (result.error) {
                toast.error(result.error)
            } else {
                setRender(!rend)
                closeModal()
                toast.success(msg)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <Modalx
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                modalTitle={showAddForm ? modalAddTitle : modalTitle}
                rowData={rowData}
                onInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                showAddForm={showAddForm}
            ></Modalx>
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
            ></DataTable>
        </>
    )
}

Customer.propTypes = {
    showDeleteAlert: PropTypes.func,
    reRender: PropTypes.bool,
    showAddForm: PropTypes.bool,
    modalAddTitle: PropTypes.string,
    reShowAddForm: PropTypes.func
}

export default Customer
