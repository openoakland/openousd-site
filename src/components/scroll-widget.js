import React from "react"
import { number, string } from "prop-types"

import { Link } from "react-scroll"

import "./scroll-widget.scss"
function ScrollWidget(props) {
  const { numSections } = props
  if (numSections <= 0) {
    return null
  }

  // The circle representing a given section in the page that could be navigated to.
  function navCircle({ index }) {
    return (
      <Link
        className="nav-circle"
        activeClass="active"
        spy={true}
        smooth={true}
        offset={-70}
        duration={550}
        to={`${props.sectionIdPrefix}-${index}`}
      />
    )
  }

  // The line visually connecting two adjacent navigation circles.
  function navConnector() {
    return <div id="nav-connector" />
  }

  // Render the circle corresponding to the first section.
  const navSections = [navCircle({ index: 0 })]

  // Iterate through the remaining sections, starting at the first index, rendering a connector
  // and a circle for each section. This way, the overall effect will be `numSection` adjoined circles,
  // where each circle has a line connecting it to the previous one.
  for (let i = 1; i < numSections; i++) {
    navSections.push(navConnector())
    navSections.push(navCircle({ index: i }))
  }

  return (
    <div className="scroll-widget">
      <div id="content">{navSections}</div>
    </div>
  )
}

ScrollWidget.propTypes = {
  sectionIdPrefix: string,
  numSections: number,
}

ScrollWidget.defaultProps = {
  sectionIdPrefix: "section",
  numSections: 0,
}

export default ScrollWidget
