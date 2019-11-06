import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <div style={{ background: `#eee` }}>
      <SEO title="Home" />

      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      <h1 className="">What is OpenOUSD?</h1>

      <p>OpenOUSD is a project created out of OpenOakland. It’s a non-profit, volunteer group with the mission of bridging technology and community. OpenOUSD aims to support Oakland schools by providing transparent budget data of the OUSD central office, enabling the community to parcipate in informed conversations about the budget.</p>

      <h1 className="">What is the OUSD Central Office?</h1>
      <p>The central office is an Oakland city organization comprised of almost 50 different departments whose purposes are to support the 121 schools and 50,000 students within the district of Oakland. </p>

      <h1 className="">Filler Text</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae orci sem. Curabitur libero lectus, aliquam vehicula feugiat at, porta quis odio. Nunc luctus felis mauris, sit amet tristique libero consequat id. Nulla auctor tincidunt lectus vitae blandit. Nam aliquam, felis a hendrerit vestibulum, est ligula facilisis felis, a congue odio tellus ut libero. Proin sollicitudin venenatis fringilla. Nam vel tincidunt sapien. Sed ut commodo elit, a bibendum purus. Integer id odio pretium, tempor nisl non, cursus mauris. Nam auctor, velit in maximus pharetra, diam urna accumsan elit, sit amet posuere ligula dolor quis erat. Integer dictum aliquet lectus, non iaculis felis luctus eget. Aliquam interdum neque vitae bibendum laoreet. Nulla porttitor rutrum risus, at finibus arcu aliquet a. Morbi bibendum erat ut ex tempor suscipit.</p>

      <p>Suspendisse fermentum pulvinar pretium. Integer porta arcu ac justo porttitor pellentesque. Cras quis faucibus turpis. Phasellus quis porta ante. Integer congue gravida nunc, ut porta felis. In a sapien lobortis, tincidunt orci eu, ultricies lacus. Sed faucibus sit amet nulla sit amet fermentum. Curabitur in tellus eu libero dictum congue vitae a nulla. In tincidunt, enim quis sodales scelerisque, elit dolor consectetur purus, vitae mattis nulla neque non tellus. Sed fringilla faucibus est nec blandit. Nullam vel pellentesque leo. Nam non convallis purus. Pellentesque ornare, nulla a mattis faucibus, felis metus finibus quam, id feugiat purus mi a mauris. Ut arcu velit, imperdiet eu eros ac, laoreet faucibus velit. Nam lobortis diam non est tempus, at posuere ante dictum. Donec id ultricies nunc. </p>

      <p>Sed eget libero eu sapien vehicula finibus. Morbi sed magna vitae erat tincidunt elementum quis ut velit. Nulla porttitor vel eros a efficitur. Vivamus sit amet est odio. In ut convallis purus. Nulla sit amet ante non odio sagittis hendrerit ac id augue. Cras fringilla ligula nisl, ut mattis est porta eget. Aliquam sed tortor in felis tempus faucibus ac eu massa. Mauris sed volutpat est, vel luctus ex. Aenean condimentum quis velit nec venenatis. Morbi nisi nisl, laoreet aliquet ultricies at, aliquet ac neque. Ut in porttitor libero, tincidunt porta est. </p>

      <Link to="/page-2/">Go to page 2</Link>
    </div>
  </Layout>
)

export default IndexPage
