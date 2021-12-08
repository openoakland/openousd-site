import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES } from "@contentful/rich-text-types"

import RequireWideScreen from "../components/require-wide-screen"
import SankeyChart from "../components/sankey-chart"
import MultiYearChart from "../components/multi-year-chart"
import StaffRolesTable from "../components/central-program/staff-roles-table"
import StaffLaborUnionsTable from "../components/central-program/staff-labor-unions-table"
import ProgramDataOverviewTable from "../components/central-program/program-data-overview-table"
import StaffLaborUnionsChart from "../components/central-program/staff-labor-unions-chart"
import ScrollWidget from "../components/scroll-widget"
import ProgramLink from "../components/program-link"
import ErrorBoundary from "../components/error-boundary.js"

import LaunchIcon from "@material-ui/icons/Launch"

// Experimental: for commented out Sankey chart below
// import RequireWideScreen from "../components/require-wide-screen.js"
// import SankeyChart from "../components/sankey-chart.js"
import "./central-program/central-program.scss"

const ELEMENT_NAME_PREFIX = "program-section"

const descriptionRenderOptions = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      return (
        <ProgramLink siteCode={node.data.target.siteCode}>
          {node.data.target.programName}
        </ProgramLink>
      )
    },
  },
}

const CentralProgram = ({ data }) => {
  const centralProgram = data.centralProgramsJson
  const translatedProgramName = data.contentfulCentralProgram.programName
  const contentfulProgramDescription = data.contentfulCentralProgram.description
  const content = data.contentfulPage.content

  return (
    <Layout>
      <Seo title={translatedProgramName} />
      <div className="d-none d-lg-block">
        <ScrollWidget
          className="scroll-widget"
          sectionIdPrefix={ELEMENT_NAME_PREFIX}
          numSections={5}
        />
      </div>
      <div className="central-program-page-template">
        <Container>
          <Row>
            <Col md={9} xl={6} className="mx-auto">
              <div id={`${ELEMENT_NAME_PREFIX}-0`} className="pt-4">
                <h1>{translatedProgramName}</h1>
                {contentfulProgramDescription &&
                  renderRichText(
                    contentfulProgramDescription,
                    descriptionRenderOptions
                  )}
                {data.contentfulCentralProgram.OUSDProgramLink ? (
                  <div className="pt-3">
                    <a
                      href={data.contentfulCentralProgram.OUSDProgramLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {content.ousdWebsiteLinkText} <LaunchIcon />
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div id={`${ELEMENT_NAME_PREFIX}-1`} className="pt-4">
                <h2>
                  {content.programOverviewTable.heading} (
                  {data.site.siteMetadata.latestSchoolYear})
                </h2>
                <ProgramDataOverviewTable
                  data={data}
                  content={content.programOverviewTable}
                  className="pt-2"
                />
                {centralProgram.time_series &&
                centralProgram.time_series.length > 1 ? (
                  <MultiYearChart
                    data={centralProgram.time_series}
                    content={content.programOverviewTable.columns}
                    gaEventCategory={"Central Program Detail"}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
        {/*Sankey chart with Funding Sources > Object Codes for
        the program TODO Figure out how to present large negative numbers in
        program expenditures. For now, don't display if there's an error*/}{" "}
        {data.centralProgramsSankeyJson && (
          <ErrorBoundary>
            <Container>
              <Row>
                <Col
                  md={9}
                  xl={6}
                  id={`${ELEMENT_NAME_PREFIX}-2`}
                  className="mx-auto mt-5"
                >
                  <h2 className="pb-3">
                    Spending By Category (
                    {data.site.siteMetadata.latestSchoolYear})
                  </h2>
                </Col>
              </Row>
            </Container>
            <Row>
              <Col xl={10} className="mx-auto">
                <RequireWideScreen minScreenWidth={"sm"}>
                  <SankeyChart
                    data={data.centralProgramsSankeyJson}
                    restrictedData={data.centralProgramsSankeyRestrictedJson}
                    labelContent={content.fundingToObjectSpendingSankey}
                    margin={{ top: 50, right: 240, bottom: 20, left: 200 }}
                    gaEventCategory="Central Program - Resourcing"
                    includeCategoriesLink={false}
                  />
                </RequireWideScreen>
              </Col>
            </Row>
          </ErrorBoundary>
        )}
        <Container>
          <Row>
            <Col md={9} xl={6} className="mx-auto">
              <div id={`${ELEMENT_NAME_PREFIX}-3`} className="pt-4 pt-sm-4">
                <h2 className="pb-3 pt-sm-3 pt-md-2">
                  {`${content.staffRolesTable.heading} (${data.site.siteMetadata.latestSchoolYear})`}
                </h2>
                <StaffRolesTable
                  data={centralProgram.staff_roles}
                  content={content.staffRolesTable}
                />
              </div>
              {/* if staff_bargaining_units array is 0 length or 0 value
                return Staff Labor Union section null
              */}
              {centralProgram.staff_bargaining_units.length === 0 ||
              centralProgram.staff_bargaining_units.includes(0) ? null : (
                <div id={`${ELEMENT_NAME_PREFIX}-4`} className="pt-4">
                  <h2 className="pb-3">{`${content.staffLaborUnionsTable.heading} (${data.site.siteMetadata.latestSchoolYear})`}</h2>
                  <StaffLaborUnionsChart
                    data={centralProgram.staff_bargaining_units}
                  />
                  <StaffLaborUnionsTable
                    data={centralProgram.staff_bargaining_units}
                    content={content.staffLaborUnionsTable}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($code: Int!, $language: String) {
    site {
      siteMetadata {
        latestSchoolYear
      }
    }
    contentfulCentralProgram(
      siteCode: { eq: $code }
      node_locale: { eq: $language }
    ) {
      programName
      description {
        raw
        references {
          ... on ContentfulCentralProgram {
            __typename
            siteCode
            programName
            contentful_id
          }
        }
      }
      OUSDProgramLink
    }
    centralProgramsJson(code: { eq: $code }) {
      ...ProgramOverviewData
      ...StaffRolesData
      ...StaffLaborUnionsData
      time_series {
        year
        eoy_total_fte
        eoy_total_positions
        spending
        budget
      }
    }
    centralProgramsSankeyJson(site_code: { eq: $code }) {
      nodes {
        total
        type
        id
        subnodes
      }
      links {
        source
        target
        value
      }
    }
    centralProgramsSankeyRestrictedJson(site_code: { eq: $code }) {
      nodes {
        total
        type
        id
        subnodes
      }
      links {
        source
        target
        value
      }
    }
    contentfulPage(
      slug: { eq: "central-programs/*" }
      node_locale: { eq: $language }
    ) {
      content {
        ... on ContentfulProgramDetailsPageTemplate {
          ousdWebsiteLinkText
          ...ProgramOverviewContent
          ...StaffLaborUnionsContent
          ...StaffRolesContent
          fundingToObjectSpendingSankey {
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
        }
      }
    }
  }
`

CentralProgram.propTypes = {
  data: PropTypes.object,
}

CentralProgram.defaultProps = {
  data: {},
}

export default CentralProgram
