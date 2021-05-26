import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { IntlContextConsumer, Link } from "gatsby-plugin-intl"

import { Navbar, Nav, Container } from "react-bootstrap"

import LanguagePicker from "./language-picker"
import "./header.scss"
import logo from "../images/oo-logo-combined.svg"

const Header = ({ siteTitle }) => {
  const {
    allContentfulNavigation: { nodes: navigationsByLanguage },
  } = useStaticQuery(
    graphql`
      query {
        allContentfulNavigation {
          nodes {
            navItems {
              slug
              navigationTitle
            }
            node_locale
            tagline {
              tagline
            }
          }
        }
      }
    `
  )
  return (
    // Nasty fragment, but sticky positioning doesn't work within nonstandard tags?
    // https://github.com/twbs/bootstrap/issues/21919

    <IntlContextConsumer>
      {({ languages, language: currentLocale }) => {
        const {
          navItems,
          tagline: { tagline },
        } = navigationsByLanguage.find(nav => nav.node_locale === currentLocale)
        return (
          <>
            <Container className="header">
              <Navbar
                bg="white"
                variant="light"
                expand="md"
                className="d-flex flex-column"
              >
                <div
                  id="logo-row"
                  className="d-flex flex-column flex-lg-row align-items-center justify-content-lg-between"
                >
                  <div id="logo">
                    <Link to="/">
                      <img src={logo} alt="Open OUSD and OpenOakland logos" />
                    </Link>
                  </div>
                  <div id="tagline" className="text-center text-lg-right pt-2">
                    {tagline}
                  </div>
                </div>
              </Navbar>
            </Container>
            <Navbar
              bg="white"
              variant="light"
              expand="md"
              sticky="top"
              id="menu-row"
            >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="sticky-top">
                <Nav className="menu mx-auto flex-nowrap d-flex flex-column">
                  <hr className="d-none d-md-block" />
                  <div
                    id="menu-items"
                    className="d-flex flex-column flex-md-row mt-3 mt-md-0"
                  >
                    {navItems.map(navItem => {
                      // Small hack for the home page since we use `index` to identify it in
                      // Contentful but it's slug is the empty string
                      const slug = navItem.slug === "index" ? "" : navItem.slug
                      return (
                        <Nav.Item>
                          <Link to={`/${slug}`} activeClassName="active">
                            <span className="d-none d-md-block">
                              <span className="dot" />
                            </span>
                            {navItem.navigationTitle}
                          </Link>
                        </Nav.Item>
                      )
                    })}
                    <LanguagePicker className="d-none d-md-block pr-3" />
                  </div>
                </Nav>
              </Navbar.Collapse>
              <LanguagePicker
                languages={languages}
                currentLocale={currentLocale}
                className="d-md-none pr-3"
              />
            </Navbar>
          </>
        )
      }}
    </IntlContextConsumer>
  )
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
