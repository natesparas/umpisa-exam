// import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../store/userSlice'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // redux state
    const { loading } = useSelector((state) => state.user)

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const login = async (e) => {
        e.preventDefault()

        dispatch(loginUser(data)).then((result) => {
            const payload = result.payload
            if ('error' in payload) {
                toast.error(result.payload.error)
            } else {
                setData({}) // reset fields
                toast.success('You are successfully logged in')
                navigate('/')
            }
        })
    }

    return (
        <div className="container">
            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* <!-- Nested Row within Card Body --> */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={login}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    placeholder="Enter Email Address..."
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
                                                        setData({
                                                            ...data,
                                                            password: e.target.value
                                                        })
                                                    }
                                                />
                                            </div>
                                            <button
                                                className="btn btn-primary btn-user btn-block"
                                                type="submit"
                                            >
                                                {loading ? 'Loading...' : 'Login'}
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/register">
                                                Already have an account? Login!
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
