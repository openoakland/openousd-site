import React, { useState } from "react"
import { Link } from "gatsby-plugin-intl"
import PropTypes from "prop-types"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import { ResponsiveSankey } from "@nivo/sankey"
import { Button, ButtonGroup } from "react-bootstrap"
import HelpOutline from "@material-ui/icons/HelpOutline"

function SankeyChart({
  data,
  restrictedData,
  labelContent,
  margin,
  gaEventCategory,
  includeCategoriesLink,
}) {
  const NONE = "none"
  const RESTRICTED = "restricted"
  const [groupBy, setGroupBy] = useState(NONE)
  let groupByRestricted = groupBy === RESTRICTED
  const restrictedOption = labelContent.groupingOptions.find(
    o => o.optionId === RESTRICTED
  )

  const leftLabel = labelContent.leftLabel
  const rightLabel = labelContent.rightLabel

  let totalsByNode = {}
  data.nodes.map(node => (totalsByNode[node.id] = formatCurrency(node.total)))

  function formatCurrency(value) {
    return Math.floor(Number(value)).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  function SubNodes({ node }) {
    if (!node.subnodes.includes(",") || node.type === "resource") {
      return null
    }
    return (
      <div className="node-programs footnote">Includes: {node.subnodes}</div>
    )
  }

  function NodeTooltip({ node }) {
    return (
      <div
        className="node-tooltip"
        style={{
          padding: 9,
          background: "#fff",
          borderRadius: "2px",
          boxShadow: "0 2px 2px rgb(0 0 0 / 0.2)",
        }}
      >
        <div className="node-name" style={{ color: node.color }}>
          {node.id}
        </div>
        <div className="node-total">{totalsByNode[node.id]}</div>
        {node.subnodes && <SubNodes node={node} />}
      </div>
    )
  }

  const xAxisLabels = props => (
    <g transform="translate(0,-30)" id="overlay">
      <text x={leftLabel.length * -4}>{leftLabel}</text>
      <text x={props.width - 535}>{rightLabel}</text>
    </g>
  )

  return (
    <div className="sankey-chart">
      {restrictedData && ( // hide control component if there is no data to group by
        <div id="sankey-grouping">
          <div className="control">
            <span className="label">{labelContent.groupingLabel} </span>
            <ButtonGroup>
              {labelContent.groupingOptions.map(option => (
                <Button
                  size="sm"
                  key={option.optionId}
                  onClick={() => {
                    setGroupBy(option.optionId)
                    trackCustomEvent({
                      category: `Sankey - ${gaEventCategory}`,
                      action: "Change Grouping",
                      label: `${option.optionId}`,
                    })
                  }}
                  active={groupBy === option.optionId}
                >
                  {option.optionLabel}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      )}
      <div id="sankey-chart">
        <div id="info" className="mb-3">
          <div
            className={"text-center" + (!groupByRestricted ? " d-none" : "")}
          >
            {renderRichText(restrictedOption.helperDescription)}
          </div>
        </div>
        <ResponsiveSankey
          data={groupByRestricted ? restrictedData : data}
          margin={margin}
          sort="descending"
          align="justify"
          colors={{ scheme: "category10" }}
          nodeOpacity={0.8}
          nodeThickness={25}
          nodeInnerPadding={3}
          nodeSpacing={10}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
          linkOpacity={0.2}
          linkHoverOthersOpacity={0.1}
          enableLinkGradient={true}
          labelPosition="outside"
          labelOrientation="horizontal"
          labelPadding={10}
          labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
          animate={true}
          motionStiffness={140}
          motionDamping={13}
          valueFormat={value => formatCurrency(value)}
          nodeTooltip={({ node }) => <NodeTooltip node={node} />}
          layers={["links", "nodes", "labels", "legends", xAxisLabels]}
          onClick={(data, event) => {
            if ("id" in data) {
              trackCustomEvent({
                category: `Sankey - ${gaEventCategory}`,
                action: "Click Node",
                label: data.id,
              })
            }
          }}
        />
        <div className="text-center">
          {labelContent.footnote && (
            <div className="footnote">{labelContent.footnote.footnote}</div>
          )}
          {includeCategoriesLink && (
            <div className="mt-3">
              <HelpOutline />{" "}
              <Link to="/about-categories">{labelContent.readMoreLink}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

SankeyChart.propTypes = {
  includeCategoriesLink: PropTypes.bool,
}

SankeyChart.defaultProps = {
  includeCategoriesLink: true,
}

export default SankeyChart
