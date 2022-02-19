import React from "react"
import { graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import Layout from "../components/layout"
import Seo from "../components/seo"
import BasicTable from "../components/basic-table"

import "../components/sankey-chart.scss"

const CovidOverviewPage = ({ data, pageContext }) => {
  let covidObjects = data.allCovidObjectsJson.nodes
  const content = data.contentfulPage.content

  const objectsColumns = [
    {
      dataField: "object",
      text: "Expense",
    },
    {
      dataField: "spending",
      text: "Spending",
    },
  ]

  return (
    <Layout pageClassName="covid-overview-page">
      <Seo title={data.contentfulPage.title} />
      <Container id="programs-section">
        <Row>
          <Col>
            <h1 className="pb-3 pt-5">
              COVID-19 Funds ({data.site.siteMetadata.latestSchoolYear})
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <BasicTable data={covidObjects} columns={objectsColumns} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default CovidOverviewPage

export const query = graphql`
  query CovidOverviewPage($language: String) {
    site {
      siteMetadata {
        latestSchoolYear
      }
    }

    allCovidObjectsJson {
      nodes {
        object
        spending
        code
      }
    }

    contentfulPage(
      slug: { eq: "central-programs" }
      node_locale: { eq: $language }
    ) {
      content {
        ... on ContentfulCentralProgramsOverviewPageContent {
          spendingSankeyChart {
            heading
            groupingLabel
            groupingOptions {
              optionId
              optionLabel
              helperDescription {
                raw
              }
            }
            rightLabel
            leftLabel
            readMoreLink
            footnote {
              footnote
            }
          }
          programsTable {
            heading
            columns {
              displayName
              dataFieldName
              helperText {
                helperText
              }
            }
            labels {
              columnsNotShownLabel
              currentlyShownColumnsLabel
              downloadDataLabel
              showHideColumnsLabel
              searchLabel
              totalLabel
            }
            footnote {
              footnote
            }
          }
        }
      }
      slug
      title
      node_locale
    }
  }
`
