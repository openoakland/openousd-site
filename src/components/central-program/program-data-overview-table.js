import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { formatToUSD, formatFTE, deltaPrefix } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"

let columnsByDataField

const Heading = () => {
  const columns = [
    {
      dataField: "description",
      text: columnsByDataField["description"].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div> {columnsByDataField["description"].displayName} </div>
      },
    },
    {
      dataField: "value",
      text: columnsByDataField["value"].displayName,
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right">
            {columnsByDataField["value"].displayName}
          </div>
        )
      },
    },
  ]

  return (
    <ToolkitProvider
      keyField="description"
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

const SpendingOverview = ({ data, content }) => {
  const columns = [
    {
      dataField: "description",
      text: "Description",
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField["spending"].displayName}</div>
      },
    },
    {
      dataField: "value",
      text: "Value",
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right value">{formatToUSD(data.spending)}</div>
        )
      },
    },
  ]

  return (
    <ToolkitProvider
      keyField="description"
      data={[]}
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
      dataField: "description",
      text: "Description",
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField["budget"].displayName}</div>
      },
    },
    {
      dataField: "value",
      text: "Value",
      align: "right",
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right value">{formatToUSD(data.budget)}</div>
        )
      },
    },
  ]

  let overOrUnder = "Over",
    difference
  if (data.spending > data.budget) {
    difference = data.spending - data.budget
  } else {
    overOrUnder = "Under"
    difference = data.budget - data.spending
  }

  const rows = [
    {
      description: "Over or under budget?",
      value: `${overOrUnder} by ${formatToUSD(difference)} (${Math.abs(
        data.remaining_budget_percent
      )}%)`,
    },
  ]

  return (
    <ToolkitProvider
      keyField="description"
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
      dataField: "description",
      text: "Description",
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField["eoy_total_fte"].displayName}</div>
      },
    },
    {
      dataField: "value",
      align: "right",
      text: "",
    },
  ]

  const rows = []

  rows.push({
    description: "Total positions",
    value: data.eoy_total_positions || 0,
  })

  if (data.change_from_previous_year) {
    const total_positions_delta =
      data.change_from_previous_year.eoy_total_positions

    rows.push({
      description: "Change in total positions from previous year",
      value: `${deltaPrefix(total_positions_delta)}${formatFTE(
        Math.abs(total_positions_delta)
      )}`,
    })
  }

  rows.push({
    description: "Full time equivalent (FTE)",
    value: `${formatFTE(data.eoy_total_fte)}`,
  })

  if (data.change_from_previous_year) {
    const total_fte_delta = data.change_from_previous_year.eoy_total_fte

    rows.push({
      description: "Change in FTE from previous year",
      value: `${deltaPrefix(total_fte_delta)}${formatFTE(
        Math.abs(total_fte_delta)
      )}`,
    })
  }

  return (
    <ToolkitProvider
      keyField="description"
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
      <Heading content={columnsByDataField} />
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
