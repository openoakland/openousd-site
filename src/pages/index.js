import React from "react"
import { Link } from "gatsby"
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'

import Layout from "../components/layout";
import MuralImage from "../components/mural-image";
import SEO from "../components/seo";
import "../styles/pages/index.scss"

import { Container, Col, Row, Button } from 'react-bootstrap';

const IndexPage = () => (
  <Layout pageClassName="index-page">
    <SEO title="Home" />

        <div className="hero mx-auto">
            <MuralImage />
            </div>

    <Container>
        <Row className="descriptions justify-content-center">
          <Col xs={11} md={5} className="px-md-5 py-md-4 px-3 py-3">
            <h1 className="">What Is OpenOUSD?</h1>
            <p>OpenOUSD is a project created out of OpenOakland, a volunteer run group with the mission of increasing access to government through technology. OpenOUSD aims to bring greater transparency to the Oakland Unified School District's central office so that the community can fully participate in discussions about how it can best serve our students.</p>
          </Col>

          <Col xs={11} md={5} className="px-md-5 py-md-4 px-3 py-3">
            <h1 className="">What Are Central Programs?</h1>
            <p>We define a central program as any activity managed by OUSD's central office rather than individual school sites. For example, a staff member working at a school site but hired by the central office would be considered part of a central program. There are more than 50 centrally managed programs at OUSD.</p>
            <Link to="/central-programs/">
              <Button
                variant="primary"
                size="lg"
                className="cta"
                onClick={e => trackCustomEvent({category: "Home Card",
                                                action: "Explore Central Programs",
                                                label:" What Are Central Programs?"})}
              >
                Explore Central Programs
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={11} sm={10} className="mx-auto mt-3">
            <div className="footnote">
              <p>The image above is the Live Learn Love mural at Roosevelt Middle School.</p>
              <p> "Change will not come if we wait for some other person or{' '}
                  some other time.<br/>
                  We are the ones we've been waiting for.<br/>
                  We are the change the we seek."</p>
              <p>- B.H. OBAMA</p>
              <p>Artists: V. Lopez / J. C. Bustamante / B. C. Conner</p>
              <p>Source: <a href="https://localwiki.org/oakland/Live_Learn_Love_mural">Oakland Wiki</a></p>
            </div>
          </Col>
        </Row>
    </Container>
  </Layout>

)

export default IndexPage
