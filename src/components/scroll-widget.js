import React from "react"
import { number } from "prop-types"

import "./scroll-widget.scss"

function ScrollWidget(props) {
  const { numSections, currSectionIndex } = props
  if (numSections <= 0) {
    return null
  }

  // The circle representing a given section in the page that could be navigated to.
  function navCircle({ selected }) {
    return <div id="nav-circle" className={selected && "selected"} />
  }

  // The line visually connecting two adjacent navigation circles.
  function navConnector() {
    return <div id="nav-connector" />
  }

  // Render the circle corresponding to the first section.
  const navSections = [navCircle({ selected: currSectionIndex === 0 })]

  // Iterate through the remaining sections, starting at the first index, rendering a connector
  // and a circle for each section. This way, the overall effect will be `numSection` adjoined circles,
  // where each circle has a line connecting it to the previous one.
  for (let i = 1; i < numSections; i++) {
    navSections.push(navConnector())
    navSections.push(navCircle({ selected: currSectionIndex === i }))
  }

  return (
    <div className="scroll-widget">
      <div id="content">{navSections}</div>
    </div>
  )
}

ScrollWidget.propTypes = {
  numSections: number,
  currSectionIndex: number,
}

ScrollWidget.defaultProps = {
  numSections: 0,
  currSectionIndex: 0,
}

export default ScrollWidget
