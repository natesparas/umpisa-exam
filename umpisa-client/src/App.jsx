import Sidebar from './components/sidebar/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Customer from './pages/Customer.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoutes.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from './store/userSlice.js'
import Navbar from './components/navbar/Navbar.jsx'

axios.defaults.baseURL = 'http://localhost:8000' // server address
axios.defaults.withCredentials = true

function App() {
    // redux state
    const { authenticated } = useSelector((state) => state.user)

    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const logout = async (e) => {
        e.preventDefault()

        dispatch(logoutUser()).then((result) => {
            console.log(result.payload.error)
        })
    }

    if (authenticated) {
        document.body.classList.remove('bg-gradient-primary')
    } else {
        document.body.classList.add('bg-gradient-primary')
    }

    return (
        <div id={authenticated ? `wrapper` : `container`}>
            <BrowserRouter>
                <Toaster position="bottom-left" toastOptions={{ duration: 3000 }}></Toaster>
                {authenticated && <Sidebar onLogout={logout}></Sidebar>}
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        {/* Topbar */}
                        {authenticated && <Navbar onLogout={logout}></Navbar>}
                        {/* End of Topbar */}

                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* End Page Content */}
                            <Routes>
                                <Route element={<PrivateRoute></PrivateRoute>}>
                                    <Route
                                        element={<Dashboard title="Dashboard"></Dashboard>}
                                        path="/"
                                        exact
                                    ></Route>
                                    <Route
                                        element={<Customer title="Customer"></Customer>}
                                        path="/customer"
                                    ></Route>
                                </Route>
                                <Route
                                    element={!authenticated && <Login></Login>}
                                    path="/login"
                                ></Route>
                                <Route
                                    element={!authenticated && <Register></Register>}
                                    path="/register"
                                ></Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    )
    // const { user } = useContext(UserContext)
    // useEffect(() => {
    //     if (user) {
    //         document.body.classList.remove('bg-gradient-primary')
    //     } else {
    //         document.body.classList.add('bg-gradient-primary')
    //     }
    // })
    // console.log(user)

    // if (user) {
    //     return (
    //         <UserContextProvider>
    //             <div id="wrapper">
    //                 <Toaster position="bottom-right" toastOptions={{ duration: 3000 }}></Toaster>
    //                 <Sidebar></Sidebar>
    //                 <Routes>
    //                     <Route path="/" element={<Dashboard></Dashboard>}></Route>
    //                     <Route path="/user" element={<Users></Users>}></Route>
    //                 </Routes>
    //             </div>
    //         </UserContextProvider>
    //     )
    // } else {
    //     return (
    //         <UserContextProvider>
    //             <div id="container">
    //                 <Toaster position="bottom-right" toastOptions={{ duration: 3000 }}></Toaster>
    //                 <Routes>
    //                     <Route path="/login" element={<Login></Login>}></Route>
    //                     <Route path="/register" element={<Register></Register>}></Route>
    //                 </Routes>
    //             </div>
    //         </UserContextProvider>
    //     )
    // }
}

export default App
