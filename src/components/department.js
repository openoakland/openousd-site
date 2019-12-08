import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

export default ({ data }) => {
  const department = data.departmentsJson
  return (
    <Layout>
    <SEO title={department.name} />
      <div>This is a placeholder for the {department.name} page.</div>
    </Layout>
  )
}

export const query = graphql`
  query($code: Int!) {
    departmentsJson(code: {eq: $code }) {
        name
        budget
        spending
        year
        code
    }
  }
`
