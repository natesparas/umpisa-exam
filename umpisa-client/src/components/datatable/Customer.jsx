// import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import './Customer.css'
import Modalx from '../modal/Modalx'
import toast from 'react-hot-toast'
import { getCustomer, createCustomer, updateCustomer } from '../../api/Customer'
import { useSelector } from 'react-redux'

function Customer({ showDeleteAlert, reRender, showAddForm, modalAddTitle, reShowAddForm }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [data, setData] = useState([])
    const [rend, setRender] = useState(false)
    // const dataFetchedRef = useRef(false)
    // const { token } = useSelector((state) => state.token)
    const { token, refreshToken } = useSelector((state) => state.user)

    const fetchData = async () => {
        try {
            const apiData = await getCustomer(token, refreshToken)
            setData(apiData)
        } catch (error) {
            console.log(error)
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        // if (dataFetchedRef.current) return
        // dataFetchedRef.current = true
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const showToast = (data) => {
        console.log(data)
        if (Object.prototype.hasOwnProperty.call(data, 'error')) {
            toast.error(data.error)
        } else {
            toast.success(data.msg)
        }
    }

    const handleSubmit = async () => {
        try {
            let result
            if (rowData.add) {
                // Create customer API
                result = await createCustomer(rowData, token, refreshToken)
                result.msg = 'Successfully Added!'
            } else {
                result = await updateCustomer(rowData, token, refreshToken)
                result.msg = 'Successfully updated!'
            }

            if (result.error) {
                // toast.error(result.error)
                showToast(result)
            } else {
                setRender(!rend)
                closeModal()
                // toast.success(msg)
                showToast(result)
            }
        } catch (error) {
            showToast(error)
            // toast.error(error)
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
