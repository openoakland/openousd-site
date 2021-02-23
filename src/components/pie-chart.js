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

function getTooltip(total, value) {
  const percent = `${Math.round((value / total) * 100)}%`
  return `${formatCurrency(value)} (${percent})`
}

function PieChart({ data }) {
  const [activeNode, setActiveNode] = useState(null)
  const dataTotal = data.reduce((total, { value }) => total + value, 0)

  data.forEach((data, i) => {
    const transparency = activeNode && activeNode !== data ? "77" : ""
    data.color = `${COLORS[i]}${transparency}`
  })

  return (
    <div className="pie-chart">
      <ResponsivePie
        data={data}
        colors={data => data.color}
        innerRadius={0.3}
        padAngle={1.5}
        cornerRadius={3}
        margin={{ top: 20, bottom: 25 }}
        radialLabel={data => data.id}
        radialLabelsLinkColor={{ from: "color" }}
        radialLabelsTextColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        sliceLabel={data => formatCurrency(data.value)}
        slicesLabelsTextColor={{ from: "color", modifiers: [["darker", 3]] }}
        tooltipFormat={getTooltip.bind(null, dataTotal)}
        onMouseEnter={data => setActiveNode(data)}
        onMouseLeave={() => setActiveNode(null)}
      />
    </div>
  )
}

export default PieChart
