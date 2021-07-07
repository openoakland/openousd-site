import React from "react"
import { graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../styles/pages/about-categories.scss"

const AboutDataPage = ({ data }) => {
  const { title: contentfulTitle, content: contentfulContent } =
    data.contentfulPage

  return (
    <Layout pageClassName="about-data-page">
      <Seo title={contentfulTitle} />
      <Container>
        <h1>{contentfulTitle}</h1>
        {contentfulContent.contentBlocks.map((contentBlock) => (
          <Row key={contentBlock.blockId}>
            <Col md={8}>
              <div>
                <p>
                  <strong>{contentBlock.heading}</strong>
                </p>
                {documentToReactComponents(contentBlock.content.json)}
              </div>
            </Col>
          </Row>
        ))}
      </Container>
    </Layout>
  )
}

export default AboutDataPage

// https://app.contentful.com/spaces/tqd0xcamk1ij/entries/4o3GVGNEpBX8QONf5C5P3u
export const query = graphql`
  query AboutDataPage($language: String) {
    contentfulPage(slug: { eq: "about-data" }, node_locale: { eq: $language }) {
      title
      content {
        ... on ContentfulAboutDataPageContent {
          contentBlocks {
            blockId
            heading
            content {
              json
            }
          }
        }
      }
    }
  }
`
