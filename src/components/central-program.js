import React from "react"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Container, Row, Col } from 'react-bootstrap'

import StaffRolesTable from "../components/central-program/staff-roles-table"
import ProgramDataOverviewTable from "../components/central-program/program-data-overview-table"
import { graphql } from 'gatsby'

const CentralProgram= ({ data }) => {
    const centralProgram = data.centralProgramsJson
    console.log(centralProgram.staff_roles)
    return (
        <Layout>
        <SEO title={centralProgram.name} />
            <Container>
                <Row>
                    <Col md={9} xl={6} className="mx-auto">
                        <div>This is a placeholder for the {centralProgram.name} page.</div>
                        <ProgramDataOverviewTable/>
                        <StaffRolesTable data={centralProgram.staff_roles} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export const query = graphql`
  query($code: Int!) {
    centralProgramsJson(code: {eq: $code }) {
        name
        budget
        spending
        year
        code
        staff_roles {
          count
          job_class_description
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
