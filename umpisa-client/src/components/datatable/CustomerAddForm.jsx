// import PropTypes from 'prop-types'

function CustomerAddForm() {
    return (
        <div className="card-body">
            <form>
                <div className="mb-3">
                    <label className="small mb-1">Name</label>
                    <input className="form-control" type="text" name="name" />
                </div>

                <div className="mb-3">
                    <label className="small mb-1">Address</label>
                    <input className="form-control" type="text" name="address" />
                </div>

                <div className="mb-3">
                    <label className="small mb-1">Contact No.</label>
                    <input className="form-control" type="text" name="contactno" />
                </div>
            </form>
        </div>
    )
}

CustomerAddForm.propTypes = {
    // data: PropTypes.object,
    // sendDataToParent: PropTypes.func
}

export default CustomerAddForm
