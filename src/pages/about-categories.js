import React, { useState } from "react"
import { graphql } from "gatsby"
import { Container, Row, Col, Tab } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import CategoriesTable from "../components/categories-table"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/pages/about-categories.scss"

const AboutCategoriesPage = ({ data, pageContext }) => {
  const [key, setKey] = useState("funding-sources")

  const {language: nodeLocale} = pageContext
  const {
    allCentralProgramsJson,
    allCentralProgramsResourcesJson,
    allContentfulCentralProgramCategory,
    allContentfulFundingSourceCategory,
    contentfulPage,
  } = data

  
  const localizeCategory = (row, contentfulNodes) => {
    let localizedCategory = row.category;

    // If we're in a locality other than English, use the fetched English category name to find the corresponding Contentful node in the English locale,
    // and then use the ID of that Contentful node to find the localized category name by looking up the Contentful node by ID for the given node locale.
    // This is kind of hacky, but was the quickest way forward given that we don't currently store category IDs in the database.
    if (nodeLocale !== 'en') {
      const englishNode = contentfulNodes.find(node => node.categoryName === row.category && node.node_locale === 'en')
      if (!englishNode) {
        console.log(`No category found in Contentful with English name ${row.category}; displaying name in English`)
      } else {
        const localizedNode = contentfulNodes.find(node => node.contentful_id === englishNode.contentful_id && node.node_locale === nodeLocale)
        if (!localizedNode) {
          console.log(`No category found in Contentful with ID ${englishNode.category_id} for node locale ${nodeLocale}; displaying name in English`)
        } else {
          localizedCategory = localizedNode.categoryName
        }
      }
    }

    return {
      ...row,
      category: localizedCategory
    }
  }

  const expenditureCategories = allCentralProgramsJson.nodes.map(node => localizeCategory(node, allContentfulCentralProgramCategory.nodes))
  const revenueCategories = allCentralProgramsResourcesJson.nodes.map(node => localizeCategory(node, allContentfulFundingSourceCategory.nodes))

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
              <p>{documentToReactComponents(introText.json)}</p>
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
                    <p>
                      {documentToReactComponents(fundingSources.content.json)}
                    </p>
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
                    <p>
                      {documentToReactComponents(programExpenses.content.json)}
                    </p>
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
    allContentfulCentralProgramCategory {
      nodes {
        categoryName
        node_locale
        contentful_id
      }
    }
    allContentfulFundingSourceCategory {
      nodes {
        categoryName
        node_locale
        contentful_id
      }
    }
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
