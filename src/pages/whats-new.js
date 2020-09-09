import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { Link, Element } from "react-scroll";
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// import twitterIcon from '../images/icons/twitter-icon-blue.svg'
import NewFeature from "../components/new-feature"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/pages/whats-new.scss"

// https://dev.to/flexdinesh/accessing-nested-objects-in-javascript--9m4
//  Access Nested Objects Using Array Reduce 
const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) =>
        (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

//  formatting date from Contenful, 2020-06-03 => June 3, 2020
const dateToString = (date, locale) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNamesES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var mydate = new Date(date); 

    return ( 
            locale ==='en' ? 
            monthNames[mydate.getMonth()] +" " + (mydate.getDate()+1) : 
            (mydate.getDate()+1) + " de " + monthNamesES[mydate.getMonth()]
            ) +", "+ mydate.getFullYear()
}


// formatting the date (June 3, 2020) into an id that react scroll can reference (#june-3-2020)
const dateToDivID = (date) => {return "#" + date.replace(/[\W_]+/g, '-').toLowerCase()}

// options to replace formatting for rich text
// rendering rich text with `documentToReactComponents` wraps it in a `<p>` so this removes it
const options = {
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) =>  children,
    },
}

const WhatsNewPage = ({data}) => {
    const {title, node_locale} = data.contentfulPage
    const changelog = data.allContentfulChangelogContent.nodes;
    return (
    <Layout pageClassName="whats-new-page">
        <SEO title={title} />
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
                            to={dateToDivID(dateToString(feature.date,node_locale))}>
                                <ListGroup.Item action >
                                    {dateToString(feature.date,node_locale)}
                                </ListGroup.Item>
                            </Link>
                        ))
                    }
                    </ListGroup>
                </Col>
                <Col md={8} className="px-3 flex-shrink-1 bd-highlight" id="right-content">
                    {
                        changelog.map(feature => (
                            <Element name={dateToDivID(dateToString(feature.date,node_locale))}  style={{marginBottom: '80px'}}>
                                <React.Fragment>
                                <NewFeature
                                    heading={feature.heading}
                                    date={dateToString(feature.date,node_locale)}
                                    description={documentToReactComponents(feature.description.json, options)}
                                    pagePath={feature.pagePath}
                                    pagePathLinkName={feature.pagePathLinkName}
                                    image={feature.imageChangelog ? 'https:' + getNestedObject(feature.imageChangelog, ['file', 'url']): ''}
                                    image_title={feature.imageChangelog ? getNestedObject(feature.imageChangelog, ['file', 'title']): ''}
                                />
                                </React.Fragment>
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
    contentfulPage(slug: {eq: "whats-new"}, node_locale: {eq: $language}) {
      slug
      title
      node_locale
    }
    allContentfulChangelogContent(filter: {node_locale: {eq: $language}}, sort: {fields: date, order: DESC}) {
      totalCount
      nodes {
        node_locale
        heading
        date
        id
        tweetId
        description {
          json
        }
        pagePathLinkName
        pagePath
        imageChangelog {
          title
          file {
            url
          }
        }
      }
    }
  }
`