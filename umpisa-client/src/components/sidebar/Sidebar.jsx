// import { useState } from 'react'
// import Collapse from 'react-bootstrap/Collapse'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// import './Sidebar.css'
import { useState } from 'react'

function Sidebar({ onLogout }) {
    const [isCollapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
        setCollapsed(!isCollapsed)
        if (isCollapsed) {
            document.body.classList.add('sidebar-toggled')
        } else {
            document.body.classList.remove('sidebar-toggled')
        }
    }

    return (
        <ul
            className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
                isCollapsed ? 'toggled' : ''
            }`}
        >
            {/* <!-- Sidebar - Brand --> */}
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="index.html"
            >
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">UMPISA INC</div>
            </a>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0"></hr>

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item">
                <Link to="/" className="nav-link">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link to="/customer" className="nav-link">
                    <i className="fas fa-fw fa-user-alt"></i>
                    <span>Customer</span>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider my-0"></hr>

            <li className="nav-item">
                <a onClick={onLogout} className="nav-link" style={{ cursor: 'pointer' }}>
                    <i className="fas fa-fw fa-solid fa-arrow-right-from-bracket"></i>
                    <span>Logout</span>
                </a>
            </li>

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <hr className="sidebar-divider d-none d-md-block"></hr>
            <div className="text-center d-none d-md-inline">
                <button
                    className="rounded-circle border-0"
                    id="sidebarToggle"
                    onClick={toggleSidebar}
                ></button>
            </div>
        </ul>
    )
}

Sidebar.propTypes = {
    onLogout: PropTypes.func
}

export default Sidebar
