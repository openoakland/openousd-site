import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/departments-table"
import Sankey from "../components/sankey-chart"
import { graphql } from "gatsby"



const DepartmentsPage = ({ data }) => {
    const sankeyData = {
    "nodes": [
      {
        "id": "John",
        "color": "hsl(156, 70%, 50%)"
      },
      {
        "id": "Raoul",
        "color": "hsl(337, 70%, 50%)"
      },
      {
        "id": "Jane",
        "color": "hsl(12, 70%, 50%)"
      },
      {
        "id": "Marcel",
        "color": "hsl(25, 70%, 50%)"
      },
      {
        "id": "Ibrahim",
        "color": "hsl(292, 70%, 50%)"
      },
      {
        "id": "Junko",
        "color": "hsl(221, 70%, 50%)"
      }
    ],
    "links": [
      {
        "source": "Jane",
        "target": "Raoul",
        "value": 170
      },
      {
        "source": "Jane",
        "target": "Junko",
        "value": 189
      },
      {
        "source": "Jane",
        "target": "Marcel",
        "value": 102
      },
      {
        "source": "Raoul",
        "target": "Ibrahim",
        "value": 32
      },
      {
        "source": "Raoul",
        "target": "John",
        "value": 50
      },
      {
        "source": "John",
        "target": "Marcel",
        "value": 169
      },
      {
        "source": "John",
        "target": "Ibrahim",
        "value": 183
      },
      {
        "source": "John",
        "target": "Junko",
        "value": 143
      },
      {
        "source": "Marcel",
        "target": "Ibrahim",
        "value": 149
      }
    ]
  }

  const departments = data.allDepartmentsJson.nodes;
  return (
    <Layout pageClassName="departments-page">
      <SEO title="Departments" />
      <h1>Departments</h1>
      <div id="sankey-chart">
        <Sankey data={sankeyData} />
      </div>
      <Table data={departments} />
    </Layout>
  )
}

export default DepartmentsPage

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
