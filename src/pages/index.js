import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

import "../styles/style.scss"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 className="hello">Hi people</h1>
    <div className="alert alert-success" role="alert">
      A simple success alert—check it out!
    </div>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
  
)

export default IndexPage
