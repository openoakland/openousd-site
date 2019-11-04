import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import "./header.scss"
import logo from "../images/oo-logo-combined.svg"


const Header = ({ siteTitle }) => (
    <header>
        <Navbar bg="white" variant="light" fixed="top" expand="md"  className="d-md-flex flex-column">
                <div id="logo-row" className="d-flex flex-row align-items-center">
                    <div id="logo" className="mx-auto ml-md-4">
                        <Link to="/"><img src={logo} alt="Logo" /></Link>
                    </div>
                    <div id="tagline" className="d-none d-lg-block">
                        Volunteers providing transparent access to Oakland Unified School District budget & data
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </div>
                <div id="menu-row">
                    <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-1 text-right">
                        <Nav className="menu mx-auto flex-nowrap">
                            <Nav.Item>Home</Nav.Item>
                            <Nav.Item>Departments</Nav.Item>
                            <Nav.Item><Link to="/page-2/">Contact</Link></Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
        </Navbar>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}


export default Header
