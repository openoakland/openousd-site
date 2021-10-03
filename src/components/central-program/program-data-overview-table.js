import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { formatToUSD, formatFTE, deltaPrefix } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"

const DESCRIPTION = "description"
const VALUE = "value"
const STAFF = "staff"
const OVER_BY = "over_by"
const UNDER_BY = "under_by"

const CHANGE = "change_from_previous_year"
const SPENDING = "spending"
const BUDGET = "budget"
const BALANCE = "budget_balance"
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
      {(props) => (
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
      headerStyle: { minWidth: "10em" },
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
      {(props) => (
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
      description: columnsByDataField[`${CHANGE}.${BUDGET}`].displayName,
      value: `${deltaPrefix(budget_delta)}${formatToUSD(
        Math.abs(budget_delta)
      )}`,
    })
  }

  let overOrUnder = columnsByDataField[OVER_BY].displayName,
    balance
  if (data[SPENDING] > data[BUDGET]) {
    balance = data[SPENDING] - data[BUDGET]
  } else {
    overOrUnder = columnsByDataField[UNDER_BY].displayName
    balance = data[BUDGET] - data[SPENDING]
  }

  rows.push({
    description: columnsByDataField[BALANCE].displayName,
    value: `${overOrUnder} ${formatToUSD(balance)} (${Math.abs(
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
      {(props) => (
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
        return <div>{columnsByDataField[STAFF].displayName}</div>
      },
    },
    {
      dataField: VALUE,
      align: "right",
      text: "",
      headerStyle: { minWidth: "6em" },
    },
  ]

  const rows = []

  rows.push({
    description: columnsByDataField[STAFF_POSITIONS].displayName,
    value: data[STAFF_POSITIONS] || 0,
  })

  if (data[CHANGE]) {
    const total_positions_delta = data[CHANGE][STAFF_POSITIONS]

    rows.push({
      description:
        columnsByDataField[`${CHANGE}.${STAFF_POSITIONS}`].displayName,
      value: `${deltaPrefix(total_positions_delta)}${formatFTE(
        Math.abs(total_positions_delta)
      )}`,
    })
  }

  rows.push({
    description: columnsByDataField[STAFF_FTE].displayName,
    value: `${formatFTE(data[STAFF_FTE])}`,
  })

  if (data[CHANGE]) {
    const total_fte_delta = data[CHANGE][STAFF_FTE]

    rows.push({
      description: columnsByDataField[`${CHANGE}.${STAFF_FTE}`].displayName,
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
      {(props) => (
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
      {!data.centralProgramsJson[CHANGE] ? (
        <div className="footnote">{content.footnote.footnote}</div>
      ) : null}
    </div>
  )
}

export const query = graphql`
  fragment ProgramOverviewContent on ContentfulProgramDetailsPageTemplate {
    programOverviewTable {
      columns {
        displayName
        dataFieldName
      }
      heading
      footnote {
        footnote
      }
    }
  }
  fragment ProgramOverviewData on CentralProgramsJson {
    name
    budget
    remaining_budget_percent
    eoy_total_fte
    eoy_total_positions
    spending
    year
    code
    change_from_previous_year {
      budget
      eoy_total_fte
      eoy_total_positions
      spending
    }
  }
`

ProgramDataOverviewTable.propTypes = {
  data: PropTypes.object,
}

ProgramDataOverviewTable.defaultProps = {
  data: {},
}

export default ProgramDataOverviewTable
