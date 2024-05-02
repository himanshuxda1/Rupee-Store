    import React from 'react'
    import { Link } from 'react-router-dom'

    export default function Navbar() {
        return (
            <div >
                <nav className="navbar navbar-expand-lg nav mb-4">
                    <div className="container-fluid">
                        <Link to={"/home"} className="navbar-brand">
                            <img className='img-responsive rounded navlogo' src="../images/Designer.png" alt="" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />    
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={"/home"} className="nav-link active text-white" aria-current="page" >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link text-white" href="#">
                                        Link
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a  
                                        className="nav-link dropdown-toggle text-white"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Dropdown
                                    </a>
                                    <ul style={{backgroundColor:"#113056"}} className="dropdown-menu ">
                                        <li>
                                            <a className="dropdown-item text-white hoverItem" href="#">
                                                Action
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item text-white hoverItem" href="#">
                                                Another action
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item text-white hoverItem" href="#">
                                                Something else here
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search Products"
                                    aria-label="Search"
                                />
                                <button className="me-5 btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </nav></div>
        )
    }
