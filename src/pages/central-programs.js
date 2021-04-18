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
import PieChart from "../components/pie-chart"

import sankeyProgramData from "../../data/sankey.json"
import sankeyRestrictedProgramData from "../../data/sankey-restricted.json"

import { useLocalizeCategory } from "../utilities/content-utilities"

import "../components/sankey-chart.scss"

const pieChartFakeContent = {
  heading: "Central Programs in Context",
  central_programs: "Central Programs",
  school_sites: "School Sites",
  other_spending: "All Other Spending",
  increase: "an increase of",
  decrease: "a decrease of",
  stat_descriptor: "of spending",
  description:
    "of the district's budget is spent on central programs which is a",
}

const CentralProgramsPage = ({ data, pageContext }) => {
  const centralProgramsOverviewData = data.centralProgramsOverviewJson
  let centralPrograms = data.allCentralProgramsJson.nodes
  const content = data.contentfulPage.content
  Object.assign(content, { spendingPieChart: pieChartFakeContent })
  const translatedProgramNames = data.allContentfulCentralProgram.nodes
  const localizeCategory = useLocalizeCategory(pageContext.language)

  // Translating content for the table
  centralPrograms = centralPrograms.map(program => {
    try {
      program.name = translatedProgramNames.find(
        t => t.siteCode === program.code
      ).programName
    } catch (e) {
      console.warn(`Could not find Contentful translation for ${program.name}`)
      // throw new Error(`Could not find Contentful translation for ${program.name}`)
    }
    program.category = localizeCategory(program.category)
    return program
  })

  // Translating for the sankey chart
  const localizeCategoryFields = (fields, object) => {
    const localizedObject = { ...object }
    for (let field of fields) {
      localizedObject[field] = localizeCategory(object[field])
    }
    return localizedObject
  }

  const localizeSankeyData = ({ nodes, links }) => {
    return {
      nodes: nodes.map(localizeCategoryFields.bind(null, ["id"])),
      links: links.map(localizeCategoryFields.bind(null, ["target", "source"])),
    }
  }

  const translatedSankeyProgramData = localizeSankeyData(sankeyProgramData)
  const translatedSankeyRestrictedProgramData = localizeSankeyData(
    sankeyRestrictedProgramData
  )

  return (
    <Layout pageClassName="central-programs-page">
      <SEO title={data.contentfulPage.title} />
      <Container>
        <Row>
          <Col>
            <h1>
              {content.spendingPieChart.heading} (
              {data.site.siteMetadata.latestSchoolYear})
            </h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={6}>
            <PieChart
              data={centralProgramsOverviewData}
              content={content.spendingPieChart}
            />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <h1 className="pb-3 pt-5">
              {content.spendingSankeyChart.heading} (
              {data.site.siteMetadata.latestSchoolYear})
            </h1>
          </Col>
        </Row>
      </Container>
      <RequireWideScreen minScreenWidth={"sm"}>
        <SankeyChart
          data={translatedSankeyProgramData}
          restrictedData={translatedSankeyRestrictedProgramData}
          labelContent={content.spendingSankeyChart}
          margin={{ top: 50, right: 200, bottom: 20, left: 240 }}
          gaEventCategory="Overview"
          includeCategoriesLink={true}
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
    allContentfulCentralProgram(filter: { node_locale: { eq: $language } }) {
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
    centralProgramsOverviewJson {
      all_ousd_eoy_total_fte
      all_ousd_eoy_total_positions
      all_ousd_spending
      eoy_total_fte
      eoy_total_positions
      spending
      year
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
