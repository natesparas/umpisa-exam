import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    const registerUser = async (e) => {
        e.preventDefault()

        const { firstname, lastname, email, password } = data
        try {
            const { data } = await axios.post('/register', {
                firstname,
                lastname,
                email,
                password
            })

            if (data.error) {
                toast.error(data.error)
            } else {
                setData({}) // reset fields
                toast.success('Successfully registered!')
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" onSubmit={registerUser}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                placeholder="First Name"
                                                value={data.firstname}
                                                onChange={(e) =>
                                                    setData({ ...data, firstname: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                placeholder="Last Name"
                                                value={data.lastname}
                                                onChange={(e) =>
                                                    setData({ ...data, lastname: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-user"
                                            placeholder="Email Address"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData({ ...data, email: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control form-control-user"
                                            autoComplete="off"
                                            placeholder="Password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData({ ...data, password: e.target.value })
                                            }
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary btn-user btn-block"
                                        type="submit"
                                    >
                                        Register Account
                                    </button>
                                </form>
                                <hr></hr>
                                <div className="text-center">
                                    <Link className="small" to="/login">
                                        Already have an account? Login!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
