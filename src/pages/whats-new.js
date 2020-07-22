import React from "react"
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link, Element } from "react-scroll";

import twitterIcon from '../images/icons/twitter-icon-blue.svg'
import NewFeature from "../components/new-feature"
import Layout from "../components/layout"
import SEO from "../components/seo"

import newFeaturesData from "../../data/new-features.json"
import image from "../images/feature-june.gif"

import "../styles/pages/whats-new.scss"

const dateToDivID = (date) => {return "#" + date.replace(/[\W_]+/g, '-').toLowerCase()}

const WhatsNew = () => (
  <Layout pageClassName="whats-new-page">
    <SEO title="What's New" />
    <Container>
    {/*<Row><Col><h2>What's New</h2></Col></Row>*/}
        <Row className="d-flex bd-highlight">
            <Col md={4} className="d-none d-sm-block p-2 w-100 bd-highlight" id="left-dates">
                <ListGroup variant="flush" className="mt-3">
                {
                    newFeaturesData.map(feature => (
                        <ListGroup.Item action >
                            <Link
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-150}
                            duration= {550} 
                            to={dateToDivID(feature.date)}>
                                {feature.date}
                            </Link>
                        </ListGroup.Item>
                    ))
                }
                </ListGroup>
            </Col>
            <Col md={8} className="px-3 flex-shrink-1 bd-highlight" id="right-content">
                {
                    newFeaturesData.map(feature => (
                        <Element name={dateToDivID(feature.date)}  style={{marginBottom: '80px'}}>
                            <NewFeature
                                heading={feature.heading}
                                date={feature.date}
                                description={feature.description}
                                path={feature.page_path}
                                image={image}
                            />
                        </Element>
                    ))}
            </Col>
        </Row>
    </Container>
  </Layout>
)

export default WhatsNew
