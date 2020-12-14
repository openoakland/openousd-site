import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { formatToUSD, formatFTE, deltaPrefix } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"

const DESCRIPTION = "description"
const VALUE = "value"

const CHANGE = "change_from_previous_year"
const SPENDING = "spending"
const BUDGET = "budget"
const STAFF_FTE = "eoy_total_fte"
const STAFF_POSITIONS = "eoy_total_positions"

let columnsByDataField

const Heading = () => {
  const columns = [
    {
      dataField: DESCRIPTION,
      text: columnsByDataField[DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div> {columnsByDataField[DESCRIPTION].displayName} </div>
      },
    },
    {
      dataField: VALUE,
      text: columnsByDataField[VALUE].displayName,
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right">
            {columnsByDataField[VALUE].displayName}
          </div>
        )
      },
    },
  ]

  return (
    <ToolkitProvider
      keyField={DESCRIPTION}
      data={[]}
      columns={columns}
      bootstrap4
    >
      {props => (
        <div>
          <BootstrapTable
            classes="heading"
            bordered={false}
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

const SpendingOverview = ({ data }) => {
  const columns = [
    {
      dataField: DESCRIPTION,
      text: columnsByDataField[DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField[SPENDING].displayName}</div>
      },
    },
    {
      dataField: VALUE,
      text: columnsByDataField[VALUE].displayName,
      align: "right",
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right value">{formatToUSD(data[SPENDING])}</div>
        )
      },
    },
  ]

  const rows = []

  if (data[CHANGE]) {
    const spending_delta = data[CHANGE][SPENDING]

    rows.push({
      description: columnsByDataField[`${CHANGE}.${SPENDING}`].displayName,
      value: `${deltaPrefix(spending_delta)}${formatToUSD(
        Math.abs(spending_delta)
      )}`,
    })
  }

  return (
    <ToolkitProvider
      keyField={DESCRIPTION}
      data={rows}
      columns={columns}
      bootstrap4
    >
      {props => (
        <div>
          <BootstrapTable
            classes="overview"
            bordered={false}
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

const BudgetOverview = ({ data }) => {
  const columns = [
    {
      dataField: DESCRIPTION,
      text: columnsByDataField[DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField[BUDGET].displayName}</div>
      },
    },
    {
      dataField: VALUE,
      text: columnsByDataField[VALUE].displayName,
      align: "right",
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right value">{formatToUSD(data[BUDGET])}</div>
        )
      },
    },
  ]

  const rows = []

  if (data[CHANGE]) {
    const budget_delta = data[CHANGE][BUDGET]

    rows.push({
      description: "Change in budget from previous year",
      value: `${deltaPrefix(budget_delta)}${formatToUSD(
        Math.abs(budget_delta)
      )}`,
    })
  }

  let overOrUnder = "Over",
    difference
  if (data[SPENDING] > data[BUDGET]) {
    difference = data[SPENDING] - data[BUDGET]
  } else {
    overOrUnder = "Under"
    difference = data[BUDGET] - data[SPENDING]
  }

  rows.push({
    description: "Over or under budget?",
    value: `${overOrUnder} by ${formatToUSD(difference)} (${Math.abs(
      data.remaining_budget_percent
    )}%)`,
  })

  return (
    <ToolkitProvider
      keyField={DESCRIPTION}
      data={rows}
      columns={columns}
      bootstrap4
    >
      {props => (
        <div>
          <BootstrapTable
            classes="overview"
            bordered={false}
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

const StaffOverview = ({ data }) => {
  const columns = [
    {
      dataField: DESCRIPTION,
      text: columnsByDataField[DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField[STAFF_FTE].displayName}</div>
      },
    },
    {
      dataField: VALUE,
      align: "right",
      text: "",
    },
  ]

  const rows = []

  rows.push({
    description: "Total positions",
    value: data[STAFF_POSITIONS] || 0,
  })

  if (data[CHANGE]) {
    const total_positions_delta = data[CHANGE][STAFF_POSITIONS]

    rows.push({
      description: "Change in total positions from previous year",
      value: `${deltaPrefix(total_positions_delta)}${formatFTE(
        Math.abs(total_positions_delta)
      )}`,
    })
  }

  rows.push({
    description: "Full time equivalent (FTE)",
    value: `${formatFTE(data[STAFF_FTE])}`,
  })

  if (data[CHANGE]) {
    const total_fte_delta = data[CHANGE][STAFF_FTE]

    rows.push({
      description: "Change in FTE from previous year",
      value: `${deltaPrefix(total_fte_delta)}${formatFTE(
        Math.abs(total_fte_delta)
      )}`,
    })
  }

  return (
    <ToolkitProvider
      keyField={DESCRIPTION}
      data={rows}
      columns={columns}
      bootstrap4
    >
      {props => (
        <div>
          <BootstrapTable
            classes="overview"
            bordered={false}
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

const ProgramDataOverviewTable = ({ data, content, className }) => {
  columnsByDataField = getColumnsByDataField(content.columns)
  return (
    <div className={`program-data-overview ${className}`}>
      <Heading />
      <SpendingOverview data={data.centralProgramsJson} />
      <BudgetOverview data={data.centralProgramsJson} />
      <StaffOverview data={data.centralProgramsJson} />
    </div>
  )
}

ProgramDataOverviewTable.propTypes = {
  data: PropTypes.object,
}

ProgramDataOverviewTable.defaultProps = {
  data: {},
}

export default ProgramDataOverviewTable
