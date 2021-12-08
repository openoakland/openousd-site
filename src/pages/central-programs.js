import React from "react"
import { graphql } from "gatsby"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import Layout from "../components/layout"
import Seo from "../components/seo"
import RequireWideScreen from "../components/require-wide-screen"
import CentralProgramsTable from "../components/central-programs-table"
import MultiYearChart from "../components/multi-year-chart"
import SankeyChart from "../components/sankey-chart"
import { SpendingPieChart, StaffPieChart } from "../components/pie-chart"

import sankeyProgramData from "../../data/sankey.json"
import sankeyRestrictedProgramData from "../../data/sankey-restricted.json"

import { useLocalizeCategory } from "../utilities/content-utilities"

import "../components/sankey-chart.scss"

const CentralProgramsPage = ({ data, pageContext }) => {
  const centralProgramsOverviewData = data.centralProgramsOverviewJson
  let centralPrograms = data.allCentralProgramsJson.nodes
  const content = data.contentfulPage.content
  Object.assign(content, {
    contentfulPie: data.allContentfulOverviewPieChart.nodes,
  })
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
      <Seo title={data.contentfulPage.title} />
      <Container>
        <Row>
          <Col>
            <h1>
              {content.contentfulPie[0].heading} (
              {data.site.siteMetadata.latestSchoolYear})
            </h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={6}>
            <SpendingPieChart
              data={centralProgramsOverviewData}
              content={content.contentfulPie}
            />
          </Col>
          <Col lg={6}>
            <StaffPieChart
              data={centralProgramsOverviewData}
              content={content.contentfulPie}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="mx-auto">
            <MultiYearChart
              data={centralProgramsOverviewData.time_series}
              content={content.programsTable.columns}
              gaEventCategory={"Overview"}
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
    allContentfulOverviewPieChart(filter: { node_locale: { eq: $language } }) {
      nodes {
        name
        centralProgramsLabel
        description {
          raw
        }
        heading
        otherLabel
        statDescriptor
        increaseDescriptor
        decreaseDescriptor
        node_locale
      }
    }
    allCentralProgramsJson {
      nodes {
        name
        category
        remaining_budget_percent
        eoy_total_fte
        eoy_total_positions
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
