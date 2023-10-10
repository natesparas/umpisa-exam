import PropTypes from 'prop-types'
import { useState } from 'react'

function CustomerForm({ data, sendDataToParent, showAddForm }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target
        sendDataToParent({ ...data, [name]: value })
    }

    const [newData, setNewData] = useState({
        name: '',
        address: '',
        contactno: ''
    })

    const handleNewInput = (e) => {
        const { name, value } = e.target
        setNewData({ ...newData, [name]: value })
        sendDataToParent({})
        sendDataToParent({ ...newData, [name]: value, ['add']: true })
    }

    // useEffect(() => {
    //     console.log(newData)
    //     sendDataToParent(newData)
    // }, [newData])

    return (
        <>
            {showAddForm ? (
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="small mb-1">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={newData.name}
                                onChange={handleNewInput}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1">Address</label>
                            <input
                                className="form-control"
                                type="text"
                                name="address"
                                placeholder="Enter address"
                                value={newData.address}
                                onChange={handleNewInput}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1">Contact No.</label>
                            <input
                                className="form-control"
                                type="text"
                                name="contactno"
                                placeholder="Enter contact no."
                                value={newData.contactno}
                                onChange={handleNewInput}
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="small mb-1">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1">Address</label>
                            <input
                                className="form-control"
                                type="text"
                                name="address"
                                value={data.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1">Contact No.</label>
                            <input
                                className="form-control"
                                type="text"
                                name="contactno"
                                value={data.contactno || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

CustomerForm.propTypes = {
    data: PropTypes.object,
    sendDataToParent: PropTypes.func,
    showAddForm: PropTypes.bool
}

export default CustomerForm
