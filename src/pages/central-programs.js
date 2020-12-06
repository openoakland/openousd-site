import React from "react"
import { graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import Layout from "../components/layout"
import SEO from "../components/seo"
import RequireWideScreen from "../components/require-wide-screen"
import CentralProgramsTable from "../components/central-programs-table"
import SankeyChart from "../components/sankey-chart"

import sankeyProgramData from "../../data/sankey.json"
import sankeyRestrictedProgramData from "../../data/sankey-restricted.json"

import "../components/sankey-chart.scss"

const CentralProgramsPage = ({ data }) => {
  let centralPrograms = data.allCentralProgramsJson.nodes
  const content = data.contentfulPage.content
  const translatedProgramNames = data.allContentfulCentralProgram.nodes

  centralPrograms = centralPrograms.map(program => {
    try {
      program.name = translatedProgramNames.find(t => t.siteCode === program.code).programName
    }
    catch(e) {
      console.warn(`Could not find Contentful translation for ${program.name}`)
      // throw new Error(`Could not find Contentful translation for ${program.name}`)
    }
    return program
  })

  return (
    <Layout pageClassName="central-programs-page">
      <SEO title={data.contentfulPage.title} />
      <Container>
        <Row>
          <Col>
            <h1>
              {content.spendingSankeyChart.heading} (
              {data.site.siteMetadata.latestSchoolYear})
            </h1>
          </Col>
        </Row>
      </Container>
      <RequireWideScreen minScreenWidth={"sm"}>
        <SankeyChart
          data={sankeyProgramData}
          restrictedData={sankeyRestrictedProgramData}
          labelContent={content.spendingSankeyChart}
          margin={{ top: 50, right: 200, bottom: 20, left: 240 }}
          gaEventCategory="Overview"
        />
      </RequireWideScreen>
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

export default CentralProgramsPage

export const query = graphql`
  query CentralProgramsPage($language: String) {
    site {
      siteMetadata {
        latestSchoolYear
      }
    }
    allContentfulCentralProgram(filter: {node_locale: {eq: $language}}) {
      nodes {
        programName
        siteCode
      }
  	}
    allCentralProgramsJson {
      nodes {
        name
        category
        remaining_budget_percent
        eoy_total_fte
        budget
        spending
        year
        code
        fields {
          slug
        }
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
              childContentfulSankeyGroupingOptionHelperDescriptionRichTextNode {
                json
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
