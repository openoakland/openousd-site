import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/departments-table"
import { graphql } from "gatsby"


const SecondPage = ({ data }) => {
  const departments = data.allDepartmentsJson.nodes;
  return (
    <Layout>
      <SEO title="Departments" />
      <h1>Departments</h1>
      <Table data={departments} />
    </Layout>
  )
}

export default SecondPage

export const query = graphql`
  query DepartmentList {
    allDepartmentsJson {
      nodes {
        name
        budget
        spending
        year
        code
      }
    }
  }
`
