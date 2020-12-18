import React from "react"
import { ResponsiveBar } from "@nivo/bar"

const LABOR_UNION_POSITIONS = "eoy_total_positions_for_bu"

const StaffLaborUnionsChart = ({ data }) => {
  data.sort(
    (a, b) => a.eoy_total_positions_for_bu - b.eoy_total_positions_for_bu
  )
  const style = {
    height: `${data.length * 60}px`,
  }
  return (
    <div className="horizontal-bar-chart" style={style}>
      <ResponsiveBar
        data={data}
        layout="horizontal"
        colorBy="index"
        indexBy="abbreviation"
        keys={[LABOR_UNION_POSITIONS]}
        colors={{ scheme: "nivo" }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -40,
        }}
        axisBottom={null}
        padding={0.2}
        enableGridY={false}
        enableGridX={true}
        margin={{ top: 0, right: 0, bottom: 20, left: 70 }}
        borderRadius={3}
        labelSkipWidth={10}
        isInteractive={false}
      />
    </div>
  )
}

export default StaffLaborUnionsChart
