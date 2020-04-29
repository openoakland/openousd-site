import React from "react"
import { Link } from "gatsby"
import { Container, Row, Col } from 'react-bootstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/pages/about-categories.scss"

const AboutDataPage = ({data}) => {

    return (
        <Layout pageClassName="about-data-page">
            <SEO title="About: Data & Code" />
            <Container>

                <h1>About: Data & Code Sources</h1>
                <Row>
                    <Col md={8}>
                        <div>
                            <p>Any data gathered and presented on OpenOUSD will always be made public{' '}
                            in raw form so that you can verify any calculations and conduct your own analysis.</p>
                            <p>OpenOUSD is an open source project which means all the code is available{' '}
                            for the public to view and contribute to.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <div>
                            <p><strong>Data Sources</strong></p>
                            <p>OpenOUSD raw data is posted on <a href="http://data.openoakland.org" target="_blank" rel="noopener noreferrer">
                            data.openoakland.org</a></p>
                            <ul>
                                <li>
                                    <a
                                        href="http://data.openoakland.org/dataset/oakland-unified-school-district-ousd-expenditures"
                                        target="_blank" rel="noopener noreferrer">
                                        OUSD Expenditure Data
                                    </a>
                                </li>
                            </ul>
                            <p><Link to="/contact/">Contact us</Link> to report an inaccuracy, offer feedback, or ask a question.</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <div>
                            <p><strong>OpenOUSD Source Code</strong></p>
                            <p>OpenOUSD is a volunteer project of <a href="https://openoakland.org" target="_blank" rel="noopener noreferrer">
                            OpenOakland</a> and source code is avalible on GitHub.</p>
                            <ul>
                                <li>
                                    <a
                                        href="https://github.com/openoakland/openousd-site"
                                        target="_blank" rel="noopener noreferrer">
                                        OpenOUSD website code
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/openoakland/openousd-api"
                                        target="_blank" rel="noopener noreferrer">
                                        OpenOUSD API code
                                    </a>
                                    {' '}(this API is not live, but shows how the data is queried)
                                </li>
                            </ul>
                            <p><Link to="/contact/">Contact us</Link> about making contributions to the project.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AboutDataPage
