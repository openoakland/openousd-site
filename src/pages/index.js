import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import "../styles/pages/index.scss"

import { Container, Col, Row, Button } from 'react-bootstrap';

const IndexPage = () => (
  <Layout pageClassName="index">
    <SEO title="Home" />

        <div className="hero mx-auto">
            <Image />
            </div>

    <Container className="px-0">
        <Row className="descriptions justify-content-center">
          <Col sm={12} md={5} className="px-sm-5 py-sm-4 px-3 py-3">
            <h1 className="">What is OpenOUSD?</h1>
            <p>OpenOUSD is a project created out of OpenOakland. It’s a non-profit, volunteer group with the mission of bridging technology and community. OpenOUSD aims to support Oakland schools by providing transparent budget data of the OUSD central office, enabling the community to parcipate in informed conversations about the budget.</p>
          </Col>

          <Col sm={12} md={5} className="px-sm-5 py-sm-4 px-3 py-3">
            <h1 className="">What is the OUSD Central Office?</h1>
            <p>The central office is an Oakland city organization comprised of almost 50 different departments whose purposes are to support the 121 schools and 50,000 students within the district of Oakland. </p>
            <Link to="/departments/"><Button variant="primary" size="lg" className="cta">Explore the Departments</Button></Link>
          </Col>
        </Row>
    </Container>
  </Layout>

)

export default IndexPage
