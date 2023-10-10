import { useState } from 'react'
import Avatar from '../../assets/undraw_profile.svg'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

function Navbar({ onLogout }) {
    const [avatarOpen, setAvatarOpen] = useState(false)

    // redux state
    const { user } = useSelector((state) => state.user)

    const toggleAvatar = () => {
        setAvatarOpen(!avatarOpen)
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">
                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                <li className="nav-item dropdown no-arrow d-sm-none">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="searchDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fas fa-search fa-fw"></i>
                    </a>
                    {/* <!-- Dropdown - Messages --> */}
                    <div
                        className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                        aria-labelledby="searchDropdown"
                    >
                        <form className="form-inline mr-auto w-100 navbar-search">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 small"
                                    placeholder="Search for..."
                                    aria-label="Search"
                                    aria-describedby="basic-addon2"
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button">
                                        <i className="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>

                {/* <div className="topbar-divider d-none d-sm-block"></div> */}

                {/* <!-- Nav Item - User Information --> */}
                <li className={`nav-item dropdown no-arrow ${avatarOpen ? 'show' : ''}`}>
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={avatarOpen}
                        onClick={toggleAvatar}
                    >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            {user.firstname + ` ` + user.lastname}
                        </span>
                        <img className="img-profile rounded-circle" src={Avatar} />
                    </a>
                    {/* <!-- Dropdown - User Information --> */}
                    <div
                        className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${
                            avatarOpen ? 'show' : ''
                        }`}
                        aria-labelledby="userDropdown"
                    >
                        {/* <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                            Profile
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                            Settings
                        </a>
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                            Activity Log
                        </a>
                        <div className="dropdown-divider"></div> */}
                        <a
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#logoutModal"
                            onClick={onLogout}
                        >
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    onLogout: PropTypes.func,
    isOpen: PropTypes.bool
}

export default Navbar
