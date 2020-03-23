import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import "../styles/pages/index.scss"

import { Container, Col, Row, Button } from 'react-bootstrap';

const IndexPage = () => (
  <Layout pageClassName="index-page">
    <SEO title="Home" />

        <div className="hero mx-auto">
            <Image />
            </div>

    <Container className="px-0">
        <Row className="descriptions justify-content-center mx-0">
          <Col xs={11} md={5} className="px-md-5 py-md-4 px-3 py-3">
            <h1 className="">What Is OpenOUSD?</h1>
            <p>OpenOUSD is a project created out of OpenOakland, a volunteer run group with the mission of increasing access to government through technology. OpenOUSD aims to bring greater transparency to the Oakland Unified School District's central office so that the community can better participate in the discussions about how it can best serve our schools.</p>
          </Col>

          <Col xs={11} md={5} className="px-md-5 py-md-4 px-3 py-3">
            <h1 className="">What Are Central Programs?</h1>
            <p>We define a central program as any activity managed by OUSD's central office rather than individual school sites. For example, a staff member working at a school site but hired by the central office would be considered part of a central program. There are more than 50 centrally managed programs at OUSD.</p>
            <Link to="/central-programs/"><Button variant="primary" size="lg" className="cta">Explore Central Programs</Button></Link>
          </Col>
        </Row>
    </Container>
  </Layout>

)

export default IndexPage
