import React from "react"
import { graphql } from "gatsby"
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import Layout from "../components/layout"
import SEO from "../components/seo"
import RequestRotateDeviceMessage from "../components/request-rotate-device-message"
import CentralProgramsTable from "../components/central-programs-table"
import Sankey from "../components/sankey-chart"

import sankeyData from "../../data/sankey.json"
import sankeyRestrictedData from "../../data/sankey-restricted.json"


import "../styles/pages/central-programs.scss"

const CentralProgramsPage = ({ data }) => {

  const centralPrograms = data.allCentralProgramsJson.nodes;
  return (
    <Layout pageClassName="central-programs-page">
      <SEO title="Central Programs" />
      <Container>
        <Row>
          <Col>
            <h1>Central Spending By Category ({data.site.siteMetadata.latestSchoolYear})</h1>
            <RequestRotateDeviceMessage showUpToScreenSize={"sm"}/>
          </Col>
        </Row>
      </Container>
      <Sankey
        data={sankeyData}
        restrictedData={sankeyRestrictedData}/>
      <Container id="programs-section">
        <Row>
          <Col>
            <h1 className="pb-3">All Central Programs for the {data.site.siteMetadata.latestSchoolYear} School Year</h1>
            <CentralProgramsTable data={centralPrograms} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default CentralProgramsPage

export const query = graphql`
  query CentralProgramsPage {
    site {
        siteMetadata {
          latestSchoolYear
        }
    }
    allCentralProgramsJson {
      nodes {
        name
        category
        percent_under_budget
        budget
        spending
        year
        code
      }
    }
  }
`
