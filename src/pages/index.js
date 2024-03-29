import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import Layout from "../components/layout"
import { StaticImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import "../styles/pages/index.scss"

import { Container, Col, Row, Button } from "react-bootstrap"

const IndexPage = ({ data }) => (
  <Layout pageClassName="index-page">
    <Seo title="Home" />

    <div className="hero mx-auto">
      <StaticImage
        src="../images/mural.png"
        alt="Live Learn Love mural at Roosevelt Middle School"
      />
    </div>

    <Container>
      <Row className="descriptions justify-content-center">
        <Col xs={11} lg={5} className="px-lg-5 py-lg-4 px-3 py-3">
          <h1 className="">{data.contentfulPage.content.card01Title}</h1>
          {renderRichText(data.contentfulPage.content.card01Content)}
        </Col>

        <Col xs={11} lg={5} className="px-lg-5 py-lg-4 px-3 py-3">
          <h1 className="">{data.contentfulPage.content.card02Title}</h1>
          {renderRichText(data.contentfulPage.content.card02Content)}
          <Link to="/central-programs/">
            <Button
              variant="primary"
              size="lg"
              className="cta"
              onClick={(e) =>
                trackCustomEvent({
                  category: "Home Card",
                  action: "Explore Central Programs",
                  label: " What Are Central Programs?",
                })
              }
            >
              {data.contentfulPage.content.exploreCentralProgramsButton}
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={11} lg={5} className="mx-auto ml-lg-5 mt-3">
          <div className="footnote">
            {renderRichText(data.contentfulPage.content.heroImageAttribution)}
          </div>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export const query = graphql`
  query HomePageQuery($language: String) {
    contentfulPage(slug: { eq: "index" }, node_locale: { eq: $language }) {
      content {
        ... on ContentfulHomePageContent {
          id
          card01Content {
            raw
          }
          card01Title
          card02Content {
            raw
          }
          card02Title
          exploreCentralProgramsButton
          heroImageAttribution {
            raw
          }
        }
      }
      slug
      title
    }
  }
`

export default IndexPage
