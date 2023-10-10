import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    // redux state
    const { authenticated } = useSelector((state) => state.user)

    return authenticated ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
}

export default PrivateRoutes
