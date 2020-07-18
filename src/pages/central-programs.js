import React from "react"
import { graphql } from "gatsby"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import Layout from "../components/layout"
import SEO from "../components/seo"
import RequireWideScreen from "../components/require-wide-screen"
import CentralProgramsTable from "../components/central-programs-table"
import Sankey from "../components/sankey-chart"

import sankeyData from "../../data/sankey.json"
import sankeyRestrictedData from "../../data/sankey-restricted.json"


import "../styles/pages/central-programs.scss"

const CentralProgramsPage = ({ data }) => {

  const centralPrograms = data.allCentralProgramsJson.nodes;
  return (
    <Layout pageClassName="central-programs-page">
      <SEO title="Central Programs Overview" />
      <Container>
        <Row>
          <Col>
            <h1>Central Spending By Category ({data.site.siteMetadata.latestSchoolYear})</h1>
          </Col>
        </Row>
      </Container>
      <RequireWideScreen minScreenWidth={"sm"}>
        <Sankey
          data={sankeyData}
          restrictedData={sankeyRestrictedData}/>
      </RequireWideScreen>
      <Container id="programs-section">
        <Row>
          <Col>
            <h1 className="pb-3">All Central Programs for the {data.site.siteMetadata.latestSchoolYear} School Year</h1>
            <CentralProgramsTable data={centralPrograms} />
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
    allCentralProgramsJson {
      nodes {
        name
        category
        remaining_budget_percent
        eoy_total_staff
        budget
        spending
        year
        code
      }
    }

    contentfulPage(slug: {eq: "central-programs"}, node_locale: {eq: $language}) {
      content {
        ... on ContentfulCentralProgramsOverviewPageContent {
          spendingSankeyChart {
            groupingLabel
            groupingOptions {
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
            }
          }
        }
      }
      slug
      title
    }
  }
`
