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
        <Navbar bg="white" variant="light" fixed="top" expand="md">
            <div className="mx-sm-auto">
                <Link to="/"><img id="logo" src={logo} alt="Logo" /></Link>
            </div>
            <Navbar.Text >
                <div className="d-none d-lg-block">Volunteers providing transparent access to Oakland Unified School District budget & data</div>
            </Navbar.Text>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-1 text-right">
                <Nav className="menu ml-auto flex-nowrap">
                    <Nav.Item>Home</Nav.Item>
                    <Nav.Item>Departments</Nav.Item>
                    <Nav.Item><Link to="/page-2/">Contact</Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
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
