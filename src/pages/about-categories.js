import React, { useState } from "react"
import { graphql } from "gatsby"
import { Container, Row, Col, Tab } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import CategoriesTable from "../components/categories-table"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { useLocalizeCategory } from "../utilities/content-utilities"

import "../styles/pages/about-categories.scss"

const AboutCategoriesPage = ({ data, pageContext }) => {
  const [key, setKey] = useState("funding-sources")
  const {
    allCentralProgramsJson,
    allCentralProgramsResourcesJson,
    contentfulPage,
  } = data
  const localizeCategory = useLocalizeCategory(pageContext.language)

  const expenditureCategories = allCentralProgramsJson.nodes.map(node => {
    return {
      ...node,
      category: localizeCategory(node.category),
    }
  })
  const revenueCategories = allCentralProgramsResourcesJson.nodes.map(node => {
    return {
      ...node,
      category: localizeCategory(node.category),
    }
  })

  const {
    introText,
    categoryDescriptions,
    categoriesTable,
  } = contentfulPage.content

  const getBlockWithId = blockId =>
    categoryDescriptions.find(description => description.blockId === blockId)
  const fundingSources = getBlockWithId("funding-sources")
  const programExpenses = getBlockWithId("program-expenses")

  const getColumnWithDataFieldName = dataFieldName =>
    categoriesTable.columns.find(
      column => column.dataFieldName === dataFieldName
    )
  const fundingSourcesColumn = getColumnWithDataFieldName("resourceId")
  const centralProgramColumn = getColumnWithDataFieldName("name")

  return (
    <Layout pageClassName="about-categories-page">
      <SEO title={contentfulPage.title} />
      <Container>
        <h1>{contentfulPage.title}</h1>
        <Row>
          <Col md={8}>
            <div>
              <div>{documentToReactComponents(introText.json)}</div>
            </div>
          </Col>
        </Row>

        <ButtonGroup>
          <Button
            size="lg"
            onClick={() => setKey("funding-sources")}
            active={key === "funding-sources"}
          >
            {fundingSources.heading}
          </Button>
          <Button
            size="lg"
            onClick={() => setKey("program-expenses")}
            active={key === "program-expenses"}
          >
            {programExpenses.heading}
          </Button>
        </ButtonGroup>

        <Tab.Container
          defaultActiveKey="funding-sources"
          activeKey={key}
          id="categories-tabs"
        >
          <Tab.Content>
            <Tab.Pane eventKey="funding-sources">
              <Row>
                <Col md={8}>
                  {/* <h1>Revenues</h1> */}
                  <div className="description">
                    <div>
                      {documentToReactComponents(fundingSources.content.json)}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <CategoriesTable
                    data={revenueCategories}
                    colName={fundingSourcesColumn.displayName}
                    tableInfo={categoriesTable}
                  />
                </Col>
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="program-expenses">
              <Row>
                <Col md={8}>
                  {/* <h1>Revenues</h1> */}
                  <div className="description">
                    <div>
                      {documentToReactComponents(programExpenses.content.json)}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <CategoriesTable
                    data={expenditureCategories}
                    colName={centralProgramColumn.displayName}
                    tableInfo={categoriesTable}
                  />
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </Layout>
  )
}

export default AboutCategoriesPage

// https://app.contentful.com/spaces/tqd0xcamk1ij/entries/6ETIpT6w1rcLlITOAjZU0y
export const query = graphql`
  query AboutCategoriesPage($language: String) {
    contentfulPage(
      slug: { eq: "about-categories" }
      node_locale: { eq: $language }
    ) {
      title
      content {
        ... on ContentfulAboutCategoriesPageContent {
          introText {
            json
          }
          categoryDescriptions {
            blockId
            heading
            content {
              json
            }
          }
          categoriesTable {
            columns {
              displayName
              dataFieldName
            }
            labels {
              searchLabel
              downloadDataLabel
            }
          }
        }
      }
    }
    allCentralProgramsJson {
      nodes {
        name
        category
        code
      }
    }
    allCentralProgramsResourcesJson {
      nodes {
        name
        category
        code
      }
    }
  }
`
