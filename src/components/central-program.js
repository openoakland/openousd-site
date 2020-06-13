import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StaffRolesTable from "../components/central-program/staff-roles-table"
import { graphql } from 'gatsby'


export default ({ data }) => {
  const centralProgram = data.centralProgramsJson
  console.log(centralProgram.staff_roles)
  return (
    <Layout>
    <SEO title={centralProgram.name} />
      <div>This is a placeholder for the {centralProgram.name} page.</div>
      <StaffRolesTable data={centralProgram.staff_roles} />
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
