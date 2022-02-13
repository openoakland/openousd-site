import React from "react"
import { graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CentralProgramsTable from "../components/central-programs-table"

import sankeyProgramData from "../../data/sankey.json"
import sankeyRestrictedProgramData from "../../data/sankey-restricted.json"

import "../components/sankey-chart.scss"

const CovidOverviewPage = ({ data, pageContext }) => {
  // let centralPrograms = data.allCentralProgramsJson.nodes
  // const content = data.contentfulPage.content

  return (
    <Layout pageClassName="central-programs-page">
      <Seo title={data.contentfulPage.title} />
      <Container id="programs-section">
        <Row>
          <Col>
            <h1 className="pb-3 pt-5">
              {content.programsTable.heading} (
              {data.site.siteMetadata.latestSchoolYear})
            </h1>
            <CentralProgramsTable
              data={centralPrograms}
              labelContent={content.programsTable}
            />
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
    centralProgramsOverviewJson {
      all_ousd_eoy_total_fte
      all_ousd_eoy_total_positions
      all_ousd_spending
      eoy_total_fte
      eoy_total_positions
      spending
      year
      time_series {
        year
        eoy_total_positions
        eoy_total_fte
        spending
        budget
        all_ousd_spending
        all_ousd_budget
        all_ousd_eoy_total_fte
        all_ousd_eoy_total_positions
      }
      change_from_previous_year {
        eoy_total_fte
        eoy_total_positions
        spending
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
