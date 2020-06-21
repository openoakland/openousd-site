import React from "react"
import { ResponsiveBar } from '@nivo/bar'

const HorizontalChart = ({ data }) => (
    <div className="horizontal-bar-chart">
        <ResponsiveBar
            data={data}
            layout="horizontal"
            indexBy="abbreviation"
            keys={["eoy_total_positions_for_bu"]}
            colors={{ scheme: 'nivo' }}
        />
    </div>
)

export default HorizontalChart
