import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'

export default ({ data }) => {
  const centralProgram = data.centralProgramsJson
  return (
    <Layout>
    <SEO title={centralProgram.name} />
      <div>This is a placeholder for the {centralProgram.name} page.</div>
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
    }
  }
`
