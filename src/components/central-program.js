import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"

import StaffRolesTable from "../components/central-program/staff-roles-table"
import StaffLaborUnionsTable from "../components/central-program/staff-labor-unions-table"
import ProgramDataOverviewTable from "../components/central-program/program-data-overview-table"
import StaffLaborUnionsChart from "../components/central-program/staff-labor-unions-chart"
import ScrollWidget from "../components/scroll-widget"
import "./central-program/central-program.scss"

const ELEMENT_NAME_PREFIX = "program-section"

const CentralProgram = ({ data }) => {
  const centralProgram = data.centralProgramsJson
  return (
    <Layout>
      <SEO title={centralProgram.name} />
      <ScrollWidget
        className="scroll-widget"
        sectionIdPrefix={ELEMENT_NAME_PREFIX}
        numSections={3}
      />
      <div className="central-program-page-template">
        <Container>
          <Row>
            <Col md={9} xl={6} className="mx-auto">
              <h1>{centralProgram.name}</h1>
              <div id={`${ELEMENT_NAME_PREFIX}-0`} className="pt-4">
                <h2>
                  Program Data for the {data.site.siteMetadata.latestSchoolYear}{" "}
                  School Year
                </h2>
                <ProgramDataOverviewTable data={data} className="pt-2" />
              </div>
            </Col>
          </Row>
        </Container>
        {/* // TODO Figure out how to present large negative numbers in program expenditures
            {data.centralProgramsSankeyJson &&
                <RequireWideScreen minScreenWidth={"sm"}>
                    <SankeyChart
                        data={data.centralProgramsSankeyJson}
                        margin={{top: 50, right: 240, bottom: 20, left: 200}}
                        gaEventCategory="Central Program - Resourcing"
                        includeCategoriesLink={false}/>
                </RequireWideScreen>
            }
            */}
        <Container>
          <Row>
            <Col md={9} xl={6} className="mx-auto">
              <div id={`${ELEMENT_NAME_PREFIX}-1`} className="pt-4 pt-sm-4">
                <h2 className="pb-3 pt-sm-3 pt-md-2">{`Staff Roles (${data.site.siteMetadata.latestSchoolYear})`}</h2>
                <StaffRolesTable data={centralProgram.staff_roles} />
              </div>
              <div id={`${ELEMENT_NAME_PREFIX}-2`} className="pt-4">
                <h2 className="pb-3">{`Staff Labor Unions (${data.site.siteMetadata.latestSchoolYear})`}</h2>
                <StaffLaborUnionsChart
                  data={centralProgram.staff_bargaining_units}
                />
                <StaffLaborUnionsTable
                  data={centralProgram.staff_bargaining_units}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($code: Int!) {
    site {
      siteMetadata {
        latestSchoolYear
      }
    }
    centralProgramsJson(code: { eq: $code }) {
      name
      budget
      remaining_budget_percent
      eoy_total_fte
      eoy_total_positions
      spending
      year
      code
      staff_roles {
        eoy_total_positions_for_role
        role_description
      }
      staff_bargaining_units {
        eoy_total_positions_for_bu
        description
        abbreviation
      }
    }
    centralProgramsSankeyJson(site_code: { eq: $code }) {
      nodes {
        total
        type
        id
      }
      links {
        source
        target
        value
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
