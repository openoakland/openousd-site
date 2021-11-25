import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

import { LineChart } from "../components/line-chart"
import { getColumnsByDataField } from "../utilities/content-utilities"
import * as constants from "../utilities/constants"

const MultiYearChart = ({ data, content, gaEventCategory }) => {
  const [multiYearChartSelection, setmultiYearChartSelection] = useState(
    constants.SPENDING
  )
  const columnLabelsByDatafield = getColumnsByDataField(content)
  return (
    <div>
      <div className="text-center">
        <ButtonGroup>
          {[constants.SPENDING, constants.STAFF_POSITIONS].map((option) => (
            <Button
              size="sm"
              key={option}
              onClick={() => {
                setmultiYearChartSelection(option)
                trackCustomEvent({
                  category: `${gaEventCategory} - Multi-year Chart`,
                  action: "Change Chart",
                  label: `${option}`,
                })
              }}
              active={multiYearChartSelection === option}
            >
              {columnLabelsByDatafield[option].displayName}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <LineChart
        data={data}
        columns={
          multiYearChartSelection === constants.SPENDING
            ? [constants.SPENDING]
            : [constants.STAFF_POSITIONS]
        }
        content={content}
      />
    </div>
  )
}

MultiYearChart.propTypes = {
  data: PropTypes.array.isRequired,
}

export default MultiYearChart
