import React from "react"
import { Link } from "gatsby"
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

import twitterIcon from '../images/icons/twitter-icon-blue.svg'
import NewFeature from "../components/new-feature"
import Layout from "../components/layout"
import SEO from "../components/seo"

import newFeaturesData from "../../data/new-features.json"
import image from "../images/feature-june.gif"

const WhatsNew = () => (
  <Layout pageClassName="whats-new-page">
    <SEO title="What's New" />
    <Container>
    {/*<Row><Col><h2>What's New</h2></Col></Row>*/}
        <Row>
            <Col md={4}>
                <ListGroup variant="flush" className="mt-3">
                {
                    newFeaturesData.map(feature => (
                        <ListGroup.Item action>
                            {feature.date}
                        </ListGroup.Item>
                    ))
                }
                </ListGroup>
            </Col>
            <Col md={8}>
                {
                    newFeaturesData.map(feature => (
                        <NewFeature
                            heading={feature.heading}
                            date={feature.date}
                            description={feature.description}
                            path={feature.page_path}
                            image={image}
                        />
                    ))}
            </Col>
        </Row>
    </Container>

  </Layout>
)

export default WhatsNew
