import React from "react"

import { ResponsiveSankey } from '@nivo/sankey'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const Sankey = ({ data /* see data tab */ }) => (
    <ResponsiveSankey
        data={data}
        margin={{ top: 20, right: 200, bottom: 20, left: 240 }}
        sort="auto"
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={25}
        nodeInnerPadding={3}
        nodeSpacing={10}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        linkOpacity={0.2}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        animate={false}
        motionStiffness={140}
        motionDamping={13}
        tooltipFormat={value =>
            `${Math.floor(Number(value)).toLocaleString("en-US",
                {style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0})}`
        }
    />
)
export default Sankey
