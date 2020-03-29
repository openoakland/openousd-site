import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/central-programs-table"
import Sankey from "../components/sankey-chart"
import { graphql } from "gatsby"
import sankeyData from "../../data/sankey.json"
import sankeyRestrictedData from "../../data/sankey-restricted.json"


import "../styles/pages/central-programs.scss"

const CentralProgramsPage = ({ data }) => {

  const centralPrograms = data.allCentralProgramsJson.nodes;
  return (
    <Layout pageClassName="central-programs-page">
      <SEO title="Central Programs" />
      <h1>Central Programs Overview (2018-19)</h1>
      <Sankey data={sankeyData} restrictedData={sankeyRestrictedData} />
      <Table data={centralPrograms} />
    </Layout>
  )
}

export default CentralProgramsPage

export const query = graphql`
  query CentralProgramsList {
    allCentralProgramsJson {
      nodes {
        name
        category
        budget
        spending
        year
        code
      }
    }
  }
`
