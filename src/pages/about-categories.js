import React from "react"
import { Link } from 'gatsby'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

import CategoriesTable from "../components/categories-table"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../styles/pages/about-categories.scss"

const AboutCategoriesPage = ({data}) => {

    const latestSchoolYear = data.site.siteMetadata.latestSchoolYear

    const expenditureCategories = data.allCentralProgramsJson.nodes
    const revenueCategories = data.allCentralProgramsResourcesJson.nodes

    return (
        <Layout pageClassName="about-categories-page">
            <SEO title="About: Categories" />
            <Container>

                <h1>About: Categories</h1>
                <Row>
                    <Col md={8}>
                        <div>
                            <p>This page shows how OpenOUSD categorizes revenues and expenditures{' '}
                            for <Link to="/central-programs/">central programs</Link> so that the data{' '}
                            is easier to navigate. Categorization is sometimes challenging, so we aim to be{' '}
                            transparent about our approach, and we are always open to your suggestions{' '}
                            for improvements.</p>
                        </div>
                    </Col>
                </Row>

                <Tabs defaultActiveKey="revenues" variant="tabs">
                    <Tab eventKey="revenues" title="Revenues">
                        <Row>
                            <Col md={8}>
                            {/* <h1>Revenues</h1> */}
                            <div className="description">
                                <p>OUSD receives money from over 250 sources. In expenditure data,{' '}
                                each of those sources has what is called a <strong>resource code</strong> in the{' '}
                                CA Department of Education’s Standard Accounting Code Structure (SACS).{' '}
                                Most of these sources are state or federal programs, however there{' '}
                                are also grants from local philanthropy, parcel taxes, bonds, and more.{' '}
                                To make the information easier to digest at a glance, we’ve used the resource{' '}
                                codes to group these sources into categories. You can use the table{' '}
                                below to see how we’ve categorized all of funding sources for the{' '}
                                 school year.</p>
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8}>
                                <CategoriesTable data={revenueCategories} colName="Revenues"/>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="expenditures" title="Expenditures">
                        <Row>
                            <Col md={8}>
                            {/* <h1>Revenues</h1> */}
                            <div className="description">
                                <p>OUSD has about 60 programs that are administered centrally. In the{' '}
                                expenditure data, each program has what’s called a <strong>site code</strong>{' '}
                                (even though they are not school sites). Codes greater than or equal{' '}
                                to 900 represent centrally administered programs.{' '}
                                We’ve included all of those here except School Contingency Funds.{' '}
                                School Contingency Funds are held centrally, but ultimately distributed{' '}
                                to school sites throughout the year ofor unplanned personnel costs like{' '}
                                long term substitutes. You can use the table below to see how we’ve categorized{' '}
                                all central programs for the <strong>{latestSchoolYear}</strong> school year.</p>
                            </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <CategoriesTable data={expenditureCategories} colName="Programs"/>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>

            </Container>

        </Layout>
    )
}

export default AboutCategoriesPage

export const query = graphql`
    query SiteLatestYearandCategories {
        site {
            siteMetadata {
              latestSchoolYear
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
