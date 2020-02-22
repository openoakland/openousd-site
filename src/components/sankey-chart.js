import React, { useState } from "react"

import { ResponsiveSankey } from '@nivo/sankey'
import { Button, ButtonGroup } from 'react-bootstrap';

function Sankey(props) {

    const [groupByRestricted, setGroupByRestricted] = useState(false)

    let totalsByNode = {}
    props.data.nodes.map(node => totalsByNode[node.id] = formatCurrency(node.total))

    function formatCurrency(value) {
        return Math.floor(Number(value)).toLocaleString("en-US",
                            {style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0})
    }

    function getNodeTooltip(node) {
        return (
            <div className="node-tooltip">
                <div className="node-name" style={{color: node.color}}>{node.id}</div>
                <div className="node-total">{totalsByNode[node.id]}</div>
            </div>
        )
    }

    const margin = { top: 50, right: 200, bottom: 20, left: 240 }

    const xAxisLabels = (props) => {

    return (
      <g transform="translate(0,-30)" id="overlay">
            <text x={-28}>
                Revenues
            </text>
            <text x={props.width - 70}>
                Expenditures
            </text>
      </g>
    )};

    return (
        <div>
            <div id="sankey-grouping" className="mx-auto">
                <span className="label">Grouping:{' '}</span>
                <ButtonGroup>
                    <Button size="sm"
                            onClick={() => setGroupByRestricted(false)}
                            active={!groupByRestricted}>
                        None
                    </Button>
                    <Button size="sm"
                            onClick={() => setGroupByRestricted(true)}
                            active={groupByRestricted}>
                        Restricted / Unrestricted
                    </Button>
                </ButtonGroup>
            </div>
            <div id="sankey-chart">
                <ResponsiveSankey
                    data={groupByRestricted ? props.restrictedData : props.data}
                    margin={margin}
                    sort="descending"
                    align="justify"
                    colors={{ scheme: 'category10' }}
                    nodeOpacity={0.8}
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
                    labelPadding={10}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1 ] ] }}
                    animate={true}
                    motionStiffness={140}
                    motionDamping={13}
                    tooltipFormat={value => formatCurrency(value)}
                    nodeTooltip={node => getNodeTooltip(node)}
                    layers={['links', 'nodes', 'labels', 'legends', xAxisLabels]}
                />
            </div>
        </div>
    )
}

export default Sankey
