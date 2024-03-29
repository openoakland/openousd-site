import React, { useState, useMemo, useCallback } from "react"

import { ResponsivePie } from "@nivo/pie"
import ResizeObserver from "resize-observer-polyfill"

import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import ArrowDropUp from "@material-ui/icons/ArrowDropUp"
import Person from "@material-ui/icons/Person"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { MARKS } from "@contentful/rich-text-types"
import { formatToUSD } from "../utilities/content-utilities"
import "./pie-chart.scss"

const contentPaths = {
  centralProgramsLabel: "centralProgramsLabel",
  otherLabel: "otherLabel",
  description: "description",
  statDescriptor: "statDescriptor",
  increaseDescriptor: "increaseDescriptor",
  decreaseDescriptor: "decreaseDescriptor",
}

function getObjValueFromPath(path) {
  const keyRegex = "[a-zA-Z_$]\\w*"
  const pathRegex = `^${keyRegex}(\\.${keyRegex})*$`
  if (!path.match(pathRegex)) {
    throw new Error(`Invalid path: ${path}`)
  }
  const pathArray = path.split(".")
  return pathArray.reduce((acc, key) => acc?.[key], this)
}

const parseObject = (objectToParse, paths) => {
  const result = {}
  const parse = getObjValueFromPath.bind(objectToParse)
  for (let key in paths) {
    result[key] = parse(paths[key])
  }
  return result
}

const useResizeObserverRef = (callback) => {
  const resizeObserver = useMemo(() => new ResizeObserver(callback), [callback])
  const ref = useCallback(
    (node) => {
      if (node) resizeObserver.observe(node)
    },
    [resizeObserver]
  )
  return ref
}

const CenteredMetric =
  ({ descriptor, icon, percentOfTotal }) =>
  ({ dataWithArc, centerX, centerY }) => {
    return (
      <g transform="translate(0,-8)">
        {icon(centerX - 73, centerY - 150)}
        <text
          x={centerX + 20}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "45px",
            fontWeight: "600",
          }}
        >
          {percentOfTotal}%
        </text>
        <text
          x={centerX}
          y={centerY + 35}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontSize: "20px",
            fontWeight: "200",
          }}
        >
          {descriptor}
        </text>
      </g>
    )
  }

const Description = ({ percentOfTotal, data, content, formatValue }) => {
  const renderOptions = {
    renderMark: {
      [MARKS.BOLD]: (text) => {
        if (text === "**Percent of Total**") {
          return <strong>{percentOfTotal}%</strong>
        } else if (text === "**Change Descriptor**") {
          const changeDescriptor =
            data.change > 0
              ? content.increaseDescriptor
              : content.decreaseDescriptor
          return <strong>{changeDescriptor}</strong>
        } else if (text === "**Change Quantity**") {
          return (
            <span className="change pt-2">
              {data.change < 0 ? (
                <ArrowDropDown className="arrow" alt="down arrow" />
              ) : (
                <ArrowDropUp className="arrow" alt="up arrow" />
              )}{" "}
              {formatValue(Math.abs(data.change))}
            </span>
          )
        } else {
          return <strong>{text}</strong>
        }
      },
    },
  }
  return (
    <div className="description">
      <div className="">
        {renderRichText(content.description, renderOptions)}
      </div>
    </div>
  )
}

const CentralToTotalComparisonPie = ({
  data,
  content,
  formatValue,
  metricIcon,
  centralProgramsColor,
}) => {
  const [activeNode, setActiveNode] = useState(null)
  const [showRadialLabels, setShowRadialLabels] = useState(true)

  const radialLabelSizeCheck = useCallback(
    ([entry]) => {
      setShowRadialLabels(entry.contentRect.width > 470)
    },
    [setShowRadialLabels]
  )
  const labelRef = useResizeObserverRef(radialLabelSizeCheck)

  const percentOfTotal = Math.floor((data.centralPrograms / data.allOUSD) * 100)

  const pieChartData = useMemo(
    () => [
      {
        id: content.centralProgramsLabel,
        value: data.centralPrograms,
      },
      {
        id: content.otherLabel,
        value: data.allOUSD - data.centralPrograms,
      },
    ],
    [content, data]
  )

  const colors = {
    [content.centralProgramsLabel]: centralProgramsColor,
    [content.otherLabel]: "#e9e9e9",
  }

  pieChartData.forEach((data, i) => {
    const transparency = activeNode && activeNode !== data ? "77" : ""
    data.color = `${colors[data.id]}${transparency}`
  })

  return (
    <div className="overview-chart">
      <div className="pie-chart" ref={labelRef}>
        <ResponsivePie
          data={pieChartData}
          colors={({ data: { color } }) => color}
          innerRadius={0.7}
          padAngle={1.5}
          cornerRadius={3}
          margin={{ top: 20, bottom: 25 }}
          enableArcLinkLabels={showRadialLabels}
          arcLinkLabel={(data) => data.id}
          arcLinkLabelsColor={{ from: "color" }}
          arcLinkLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          arcLinkLabelsDiagonalLength={1}
          arcLinkLabelsThickness={2}
          arcLinkLabelsOffset={0}
          arcLinkLabelsLinkHorizontalLength={15}
          enableArcLabels={false}
          arcLabel={(data) => formatValue(data.value)}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 3]] }}
          valueFormat={formatValue}
          onMouseEnter={({ data }) => setActiveNode(data)}
          onMouseLeave={() => setActiveNode(null)}
          layers={[
            "arcs",
            "arcLabels",
            "arcLinkLabels",
            "legends",
            CenteredMetric({
              icon: metricIcon,
              descriptor: content.statDescriptor,
              percentOfTotal,
            }),
          ]}
        />
      </div>
      <Description
        percentOfTotal={percentOfTotal}
        data={data}
        content={content}
        formatValue={formatValue}
      />
    </div>
  )
}

export const SpendingPieChart = ({ data, content }) => {
  const dataPaths = {
    centralPrograms: "spending",
    allOUSD: "all_ousd_spending",
    change: "change_from_previous_year.spending",
  }

  const parsedData = parseObject(data, dataPaths)
  const contentToParse = content.find(({ name }) => name === "Spending")
  const parsedContent = parseObject(contentToParse, contentPaths)

  const icon = (x, y) => (
    <svg
      id="moneyIcon"
      viewBox="0 0 511.998 511.998"
      width="38"
      xmlns="http://www.w3.org/2000/svg"
      x={x}
      y={y}
      alt="icon of coins with a dollar sign on it"
    >
      <g>
        <path d="m462.232 19.236c-28.114-12.404-65.164-19.236-104.325-19.236s-76.211 6.832-104.326 19.236c-32.017 14.126-49.65 34.398-49.65 57.081v129.269c-14.847-4.675-30.638-7.202-47.008-7.202-86.464 0-156.807 70.343-156.807 156.807 0 86.463 70.343 156.807 156.807 156.807 59.484 0 111.336-33.294 137.905-82.224 19.656 4.149 41.21 6.327 63.079 6.327 39.161 0 76.211-6.831 104.326-19.235 32.018-14.126 49.65-34.398 49.65-57.081v-283.468c0-22.683-17.633-42.955-49.651-57.081zm-196.541 27.447c24.383-10.758 57.133-16.683 92.216-16.683s67.833 5.925 92.216 16.683c19.59 8.643 31.76 19.999 31.76 29.634s-12.17 20.99-31.76 29.634c-24.384 10.758-57.133 16.683-92.216 16.683s-67.833-5.925-92.216-16.683c-19.59-8.644-31.76-19.998-31.76-29.634s12.17-20.991 31.76-29.634zm-108.769 435.315c-69.922 0-126.807-56.885-126.807-126.807s56.885-126.807 126.807-126.807c69.921 0 126.807 56.885 126.807 126.807s-56.885 126.807-126.807 126.807zm293.201-92.58c-24.384 10.758-57.133 16.683-92.216 16.683-17.707 0-35.107-1.558-51.176-4.543 3.886-12.529 6.233-25.727 6.835-39.371 14.245 2.009 29.082 3.047 44.342 3.047 39.161 0 76.211-6.832 104.326-19.236 7.318-3.229 13.874-6.781 19.65-10.607v24.393c-.001 9.636-12.171 20.991-31.761 29.634zm0-70.867c-24.383 10.758-57.133 16.683-92.216 16.683-15.963 0-31.362-1.235-45.952-3.636-2.279-15.039-6.709-29.38-12.954-42.708 18.448 3.584 38.469 5.477 58.906 5.477 39.161 0 76.211-6.831 104.326-19.235 7.318-3.229 13.874-6.782 19.65-10.608v24.393c0 9.636-12.17 20.991-31.76 29.634zm0-70.866c-24.384 10.758-57.133 16.683-92.216 16.683-31.017 0-60.624-4.728-83.876-13.331-11.461-12.872-25.004-23.849-40.1-32.396v-24.983c5.776 3.826 12.333 7.379 19.65 10.607 28.115 12.404 65.165 19.236 104.326 19.236s76.211-6.832 104.326-19.236c7.318-3.229 13.874-6.781 19.65-10.607v24.393c0 9.635-12.17 20.99-31.76 29.634zm0-70.868c-24.383 10.758-57.133 16.683-92.216 16.683s-67.833-5.925-92.216-16.683c-19.59-8.643-31.76-19.998-31.76-29.634v-24.393c5.776 3.826 12.333 7.379 19.65 10.608 28.115 12.404 65.165 19.235 104.326 19.235s76.211-6.831 104.326-19.235c7.318-3.229 13.874-6.782 19.65-10.608v24.393c0 9.636-12.17 20.991-31.76 29.634z" />
        <path d="m176.952 339.052h-32.175c-7.243 0-13.136-5.893-13.136-13.136s5.893-13.136 13.136-13.136h54.323v-30h-27.177v-20.239h-30v20.344c-22.458 1.476-40.282 20.206-40.282 43.031 0 23.785 19.351 43.136 43.136 43.136h32.175c7.871 0 14.274 6.404 14.274 14.275s-6.403 14.274-14.274 14.274h-69.333v30h34.304v20.239h30v-20.239h5.029c24.413 0 44.274-19.861 44.274-44.274s-19.861-44.275-44.274-44.275z" />
      </g>
    </svg>
  )

  return (
    <CentralToTotalComparisonPie
      data={parsedData}
      content={parsedContent}
      formatValue={formatToUSD}
      metricIcon={icon}
      centralProgramsColor={"#fc8123"}
    />
  )
}

export const StaffPieChart = ({ data, content }) => {
  const dataPaths = {
    centralPrograms: "eoy_total_positions",
    allOUSD: "all_ousd_eoy_total_positions",
    change: "change_from_previous_year.eoy_total_positions",
  }

  const contentToParse = content.find(({ name }) => name === "Staff")
  const parsedData = parseObject(data, dataPaths)
  const parsedContent = parseObject(contentToParse, contentPaths)
  const icon = (x, y) => <Person x={x} y={y} width="45" />

  return (
    <CentralToTotalComparisonPie
      data={parsedData}
      content={parsedContent}
      formatValue={(value) => Math.floor(value)}
      metricIcon={icon}
      centralProgramsColor={"#129c9b"}
    />
  )
}
