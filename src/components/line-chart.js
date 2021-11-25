import React from "react"

import { ResponsiveLine } from "@nivo/line"
import * as constants from "../utilities/constants"
import {
  getColumnsByDataField,
  hasCurrencyFormat,
  formatToUSD,
  formatFTE,
  commaFormattedInteger,
} from "../utilities/content-utilities"

import "./line-chart.scss"

const columnColors = {
  [constants.SPENDING]: "hsl(26, 97%, 56%)",
  [constants.BUDGET]: "hsl(271, 39%, 57%)",
  [constants.STAFF_POSITIONS]: "hsl(180, 76%, 35%)",
}

const formatDataForNivo = (timeSeries, columns, labelMap) => {
  let chartDataByColumn = {}

  for (const column of columns) {
    chartDataByColumn[column] = {
      id: labelMap[column].displayName,
      data: [],
      color: columnColors[column],
    }
  }

  for (const data of timeSeries) {
    for (const column of columns) {
      chartDataByColumn[column].data.push({ x: data.year, y: data[column] })
    }
  }

  return Object.values(chartDataByColumn)
}

function SliceTooltip({ slice }) {
  return (
    <div
      className="slice-tooltip"
      style={{
        padding: 9,
        background: "#fff",
        borderRadius: "2px",
        boxShadow: "0 2px 2px rgb(0 0 0 / 0.2)",
      }}
    >
      <div className="school-year">{slice.points[0].data.xFormatted}</div>
      {slice.points.map((point) => (
        <div key={point.id}>
          <span className="column" style={{ color: point.serieColor }}>
            {point.serieId}
          </span>{" "}
          <span className="value">{point.data.yFormatted}</span>
        </div>
      ))}
    </div>
  )
}

export const LineChart = ({ data, columns, content }) => {
  let columnLabelsByDatafield = getColumnsByDataField(content)
  let chartData = formatDataForNivo(data, columns, columnLabelsByDatafield)

  const format = (value, compact = false) => {
    for (const column of columns) {
      if (hasCurrencyFormat(column)) return formatToUSD(value, compact)
      else if (column == constants.STAFF_FTE) return formatFTE(value)
    }
    return value > 100 ? commaFormattedInteger(value) : value
  }

  return (
    <div className="overview-chart">
      <div className="line-chart">
        <ResponsiveLine
          data={chartData}
          colors={{ datum: "color" }}
          margin={{ top: 20, right: 40, bottom: 65, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          curve="monotoneX"
          yFormat={(v) => format(v)}
          xFormat={(v) => constants.schoolYearDisplay[v]}
          enableGridX={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 15,
            tickRotation: 0,
            format: (v) => (
              <tspan className="axis-label">
                {constants.schoolYearDisplay[v]}
              </tspan>
            ),
          }}
          axisLeft={{
            orient: "left",
            tickSize: 10,
            tickPadding: 10,
            tickValues: 4,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: "middle",
            format: (v) => (
              <tspan className="axis-label">{format(v, true)}</tspan>
            ),
          }}
          pointSize={10}
          pointColor={{ from: "color", modifiers: [] }}
          pointBorderWidth={3}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={false}
          enableSlices="x"
          sliceTooltip={({ slice }) => <SliceTooltip slice={slice} />}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 65,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 1,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
            },
          ]}
        />
      </div>
    </div>
  )
}
