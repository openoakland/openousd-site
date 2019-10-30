import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import "./header.scss"
import logo from "../images/oo-logo-color.svg"


const Header = ({ siteTitle }) => (
  <header>
    <Navbar expand="md" bg="white" variant="light" fixed="top">
      <Container>
        <Row>
          <Col sm={12} lg={6}>
            <Link to="/"><img id="logo" src={logo} alt="Logo" /></Link>
          </Col>
          <Col sm={12} lg={6}>
            <div>Volunteers providing transparent access to Oakland Unified School District budget & data</div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="menu justify-content-center">
                <Nav.Item>Home</Nav.Item>
                <Nav.Item>Departments</Nav.Item>
                <Nav.Item><Link to="/page-2/">Contact</Link></Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
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
