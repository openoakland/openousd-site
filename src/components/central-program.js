import React from "react"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from 'react-bootstrap'

import StaffRolesTable from "../components/central-program/staff-roles-table"
import ProgramDataOverviewTable from "../components/central-program/program-data-overview-table"
import "./central-program/central-program.scss"
import { graphql } from 'gatsby'

const CentralProgram= ({ data }) => {
    const centralProgram = data.centralProgramsJson
    return (
        <Layout>
        <SEO title={centralProgram.name} />
            <Container>
                <Row>
                    <Col md={9} xl={6} className="mx-auto">
                        <h1>{centralProgram.name}</h1>
                        <h2>Program Data for the {data.site.siteMetadata.latestSchoolYear} School Year</h2>
                        <ProgramDataOverviewTable data={data}/>
                        <StaffRolesTable data={centralProgram.staff_roles} />
                    </Col>
                </Row>
            </Container>
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
    centralProgramsJson(code: {eq: $code }) {
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
    }
  }
`

CentralProgram.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
}

CentralProgram.defaultProps = {
    data: [],
}

export default CentralProgram
