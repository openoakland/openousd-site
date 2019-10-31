/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import logo from '../images/logo_open-oakland_white.svg'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="home"
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer className="footer">
          <div className="group1">
            <div className="rectangle1">
            </div>
            <div className="group2">
              <div className="createdby">
                Created by <img className="group218" src={logo} alt="OpenOakland"></img>
              </div>

            </div>
            <div className="disclaimerthissit">
              Disclaimer: This site is in beta. Please report bugs and suggestions to ousdbudget@openoakland.org
              <br></br>
              © {new Date().getFullYear()}
            </div>

          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
