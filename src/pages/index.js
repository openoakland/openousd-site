import React from "react"
import { graphql } from "gatsby"
import { Link } from 'gatsby-plugin-intl'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from "../components/layout";
import MuralImage from "../components/mural-image";
import SEO from "../components/seo";
import "../styles/pages/index.scss"

import { Container, Col, Row, Button } from 'react-bootstrap';

const IndexPage = ({data}) => (
  <Layout pageClassName="index-page">
    <SEO title="Home" />

        <div className="hero mx-auto">
            <MuralImage />
            </div>

    <Container>
        <Row className="descriptions justify-content-center">
          <Col xs={11} lg={5} className="px-lg-5 py-lg-4 px-3 py-3">
            <h1 className="">{data.contentfulPage.content.card01Title}</h1>
            {documentToReactComponents(data.contentfulPage.content.card01Content.json)}
          </Col>

          <Col xs={11} lg={5} className="px-lg-5 py-lg-4 px-3 py-3">
            <h1 className="">{data.contentfulPage.content.card02Title}</h1>
            {documentToReactComponents(data.contentfulPage.content.card02Content.json)}
            <Link to="/central-programs/">
              <Button
                variant="primary"
                size="lg"
                className="cta"
                onClick={e => trackCustomEvent({category: "Home Card",
                                                action: "Explore Central Programs",
                                                label:" What Are Central Programs?"})}
              >
                {data.contentfulPage.content.exploreCentralProgramsButton}
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={11} lg={5} className="mx-auto ml-lg-5 mt-3">
            <div className="footnote">
              {documentToReactComponents(data.contentfulPage.content.heroImageAttribution.json)}
            </div>
          </Col>
        </Row>
    </Container>
  </Layout>

)

export const query = graphql`
  query HomePageQuery($language: String) {
    contentfulPage(slug: {eq: "index"}, node_locale: {eq: $language}) {
      id
      title
      content {
        card02Title
        card01Title
        exploreCentralProgramsButton
        card02Content {
          json
        }
        card01Content {
          json
        }
        heroImageAttribution {
          json
        }
      }
    }
}
`

export default IndexPage
