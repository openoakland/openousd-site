import React from "react"
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link, Element } from "react-scroll";
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// import twitterIcon from '../images/icons/twitter-icon-blue.svg'
import NewFeature from "../components/new-feature"
import Layout from "../components/layout"
import SEO from "../components/seo"

import newFeaturesData from "../../data/new-features.json"
import image from "../images/feature-june.gif"

import "../styles/pages/whats-new.scss"

//  2020-06-03 => June 3, 2020
const dateToString = (date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var mydate = new Date(date); 
  return monthNames[mydate.getMonth()]+ " " + (mydate.getDate()+1) +", "+ mydate.getFullYear();
}

// formatting the date (June 3, 2020) into an id that react scroll can reference (#june-3-2020)
const dateToDivID = (date) => {return "#" + date.replace(/[\W_]+/g, '-').toLowerCase()}

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => children,
  },
}

const WhatsNewPage = ({data}) => {

  const changelog = data.allContentfulChangelogContent.nodes;
  console.log(changelog);

  return (
  <Layout pageClassName="whats-new-page">
    <SEO title="What's New" />
    <Container>
    <Row><Col><h1>{data.contentfulPage.title}</h1></Col></Row>
        <Row className="d-flex bd-highlight">
            <Col md={4} className="d-none d-sm-block p-2 w-100 bd-highlight" id="left-dates">
                <ListGroup variant="flush" className="mt-3">
                {
                    changelog.map((feature,i) => (
                        <Link
                        key={i}
                        className="btn"
                        activeClass="active"
                        spy={true}
                        smooth={true}
                        offset={-150}
                        duration= {550} 
                        to={dateToDivID(dateToString(feature.date))}>
                            <ListGroup.Item action >
                                {dateToString(feature.date)}
                            </ListGroup.Item>
                        </Link>
                    ))
                }
                </ListGroup>
            </Col>
            <Col md={8} className="px-3 flex-shrink-1 bd-highlight" id="right-content">
                {
                    changelog.map(feature => (
                        <Element name={dateToDivID(dateToString(feature.date))}  style={{marginBottom: '80px'}}>
                            <React.Fragment>
                              {console.log(documentToReactComponents(feature.description.json))}
                              <NewFeature
                                heading={feature.heading}
                                date={dateToString(feature.date)}
                                description={documentToReactComponents(feature.description.json, options)}
                                pagePath={feature.pagePath}
                                image={image}
                            />
                            
                            </React.Fragment>
                            
                        </Element>
                    ))}

                    {
                      newFeaturesData.map(feature => (
                        <Element name={dateToDivID(feature.date)}  style={{marginBottom: '80px'}}>
                            <NewFeature
                                heading={feature.heading}
                                date={feature.date}
                                description={feature.description}
                                pagePath={feature.page_path}
                                image={image}
                            />
                        </Element>
                    ))}
            </Col>
        </Row>
    </Container>
  </Layout>
)}

export default WhatsNewPage



export const query = graphql`
query WhatsNewPage($language: String) {
  site(siteMetadata: {}) {
    siteMetadata {
      latestSchoolYear
    }
  }
  contentfulPage(slug: {eq: "whats-new"}, node_locale: {eq: $language}) {
    slug
    title
    node_locale
  }
  allContentfulChangelogContent(filter: {node_locale: {eq: $language}}) {
    totalCount
    nodes {
      node_locale
      heading
      date
      id
      tweetId
      pagePath
      description {
        json
      }
    }
  }
}
`
