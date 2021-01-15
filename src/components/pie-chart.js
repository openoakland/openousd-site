import React, { useState } from "react"

import { ResponsivePie } from "@nivo/pie"

import "./pie-chart.scss"

const COLORS = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
]

function formatCurrency(value) {
  return Math.floor(Number(value)).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

function Tooltip({
  node: {
    arc: { startAngle, endAngle },
    color,
    label,
    value,
  },
  location,
  dataTotal,
}) {
  const percentValue = `${Math.floor((value / dataTotal) * 100)}%`
  const centerAngle = (startAngle + endAngle) / 2
  const alignment = centerAngle > Math.PI ? "left" : "right"
  return (
    <div
      className="tooltip-container"
      style={{
        left: `${location.left}px`,
        top: `${location.top}px`,
      }}
    >
      <div className="tooltip" alignment={alignment}>
        <div style={{ color }}>{`${label} Spending `}</div>
        <div>{`${formatCurrency(value)} (${percentValue})`}</div>
      </div>
    </div>
  )
}

function PieChart({ data }) {
  const [activeNode, setActiveNode] = useState(null)
  const [tooltipLocation, setTooltipLocation] = useState(null)
  const dataTotal = data.reduce((total, { value }) => total + value, 0)

  data.forEach((data, i) => {
    const transparency = activeNode && activeNode.data !== data ? "77" : ""
    data.color = `${COLORS[i]}${transparency}`
  })

  return (
    <div className="pie-chart">
      <ResponsivePie
        data={data}
        colors={{ datum: "data.color" }}
        innerRadius={0.5}
        padAngle={1.5}
        cornerRadius={3}
        margin={{ top: 20, bottom: 25 }}
        radialLabelsLinkColor={{ from: "color" }}
        radialLabelsTextColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableSliceLabels={false}
        onMouseMove={(node, event) => {
          setActiveNode(node)
          setTooltipLocation({ top: event.clientY, left: event.clientX })
        }}
        onMouseLeave={() => setActiveNode(null)}
      />
      {activeNode ? (
        <Tooltip
          node={activeNode}
          location={tooltipLocation}
          dataTotal={dataTotal}
        />
      ) : null}
    </div>
  )
}

export default PieChart
