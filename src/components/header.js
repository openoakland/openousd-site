import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import "./header.scss"


const Header = ({ siteTitle }) => (
  <header>
  <Container>
    <Navbar expand="md" fixed="top">
      <Navbar.Brand>
        <Link to="/"> {siteTitle} </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="menu justify-content-center">
          <Nav.Item>Home</Nav.Item>
          <Nav.Item>Departments</Nav.Item>
          <Nav.Item><Link to="/page-2/">Contact</Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </Container>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>

      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
