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
        margin={{ top: 40, right: 100, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={25}
        nodeInnerPadding={3}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
        linkOpacity={0.2}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
        animate={true}
        motionStiffness={140}
        motionDamping={13}
    />
)
export default Sankey
