import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { Container, Col, Row } from 'react-bootstrap';

const IndexPage = () => (
  <Layout>
    <Container>
      <div style={{ background: `#eee` }}>
        <SEO title="Home" />

          <div style={{ maxWidth: `100%`}}>
            <Image />
          </div>

        <Row>
          <Col sm={12} md={6}>
            <h1 className="">What is OpenOUSD?</h1>
            <p>OpenOUSD is a project created out of OpenOakland. It’s a non-profit, volunteer group with the mission of bridging technology and community. OpenOUSD aims to support Oakland schools by providing transparent budget data of the OUSD central office, enabling the community to parcipate in informed conversations about the budget.</p>
          </Col>

          <Col sm={12} md={6}>
            <h1 className="">What is the OUSD Central Office?</h1>
            <p>The central office is an Oakland city organization comprised of almost 50 different departments whose purposes are to support the 121 schools and 50,000 students within the district of Oakland. </p>
          </Col>
        </Row>
        
        <Row>
            <h1 className="">Filler Text</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci sem. Curabitur libero lectus, aliquam vehicula feugiat at, porta quis odio. Nunc luctus felis mauris, sit amet tristique libero consequat id. Nulla auctor tincidunt lectus vitae blandit. Nam aliquam, felis a hendrerit vestibulum, est ligula facilisis felis, a congue odio tellus ut libero. Proin sollicitudin venenatis fringilla. Nam vel tincidunt sapien. Sed ut commodo elit, a bibendum purus. Integer id odio pretium, tempor nisl non, cursus mauris. Nam auctor, velit in maximus pharetra, diam urna accumsan elit, sit amet posuere ligula dolor quis erat. Integer dictum aliquet lectus, non iaculis felis luctus eget. Aliquam interdum neque vitae bibendum laoreet. Nulla porttitor rutrum risus, at finibus arcu aliquet a. Morbi bibendum erat ut ex tempor suscipit.</p>
        </Row>
      </div>
    </Container>
  </Layout>

)

export default IndexPage
