import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { formatToUSD, formatFTE, deltaPrefix } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"
import * as constants from "../../utilities/constants"

let columnsByDataField

const Heading = () => {
  const columns = [
    {
      dataField: constants.DESCRIPTION,
      text: columnsByDataField[constants.DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div> {columnsByDataField[constants.DESCRIPTION].displayName} </div>
      },
    },
    {
      dataField: constants.VALUE,
      text: columnsByDataField[constants.VALUE].displayName,
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right">
            {columnsByDataField[constants.VALUE].displayName}
          </div>
        )
      },
    },
  ]

  return (
    <ToolkitProvider
      keyField={constants.DESCRIPTION}
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
      dataField: constants.DESCRIPTION,
      text: columnsByDataField[constants.DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField[constants.SPENDING].displayName}</div>
      },
    },
    {
      dataField: constants.VALUE,
      text: columnsByDataField[constants.VALUE].displayName,
      align: "right",
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right value">{formatToUSD(data[constants.SPENDING])}</div>
        )
      },
      headerStyle: { minWidth: "10em" },
    },
  ]

  const rows = []

  if (data[constants.CHANGE]) {
    const spending_delta = data[constants.CHANGE][constants.SPENDING]

    rows.push({
      description: columnsByDataField[`${constants.CHANGE}.${constants.SPENDING}`].displayName,
      value: `${deltaPrefix(spending_delta)}${formatToUSD(
        Math.abs(spending_delta)
      )}`,
    })
  }

  return (
    <ToolkitProvider
      keyField={constants.DESCRIPTION}
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
      dataField: constants.DESCRIPTION,
      text: columnsByDataField[constants.DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField[constants.BUDGET].displayName}</div>
      },
    },
    {
      dataField: constants.VALUE,
      text: columnsByDataField[constants.VALUE].displayName,
      align: "right",
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="text-right value">{formatToUSD(data[constants.BUDGET])}</div>
        )
      },
    },
  ]

  const rows = []

  if (data[constants.CHANGE]) {
    const budget_delta = data[constants.CHANGE][constants.BUDGET]

    rows.push({
      description: columnsByDataField[`${constants.CHANGE}.${constants.BUDGET}`].displayName,
      value: `${deltaPrefix(budget_delta)}${formatToUSD(
        Math.abs(budget_delta)
      )}`,
    })
  }

  let overOrUnder = columnsByDataField[constants.OVER_BY].displayName,
    balance
  if (data[constants.SPENDING] > data[constants.BUDGET]) {
    balance = data[constants.SPENDING] - data[constants.BUDGET]
  } else {
    overOrUnder = columnsByDataField[constants.UNDER_BY].displayName
    balance = data[constants.BUDGET] - data[constants.SPENDING]
  }

  rows.push({
    description: columnsByDataField[constants.BALANCE].displayName,
    value: `${overOrUnder} ${formatToUSD(balance)} (${Math.abs(
      data.remaining_budget_percent
    )}%)`,
  })

  return (
    <ToolkitProvider
      keyField={constants.DESCRIPTION}
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
      dataField: constants.DESCRIPTION,
      text: columnsByDataField[constants.DESCRIPTION].displayName,
      headerFormatter: (column, colIndex, components) => {
        return <div>{columnsByDataField[constants.STAFF].displayName}</div>
      },
    },
    {
      dataField: constants.VALUE,
      align: "right",
      text: "",
      headerStyle: { minWidth: "6em" },
    },
  ]

  const rows = []

  rows.push({
    description: columnsByDataField[constants.STAFF_POSITIONS].displayName,
    value: data[constants.STAFF_POSITIONS] || 0,
  })

  if (data[constants.CHANGE]) {
    const total_positions_delta = data[constants.CHANGE][constants.STAFF_POSITIONS]

    rows.push({
      description:
        columnsByDataField[`${constants.CHANGE}.${constants.STAFF_POSITIONS}`].displayName,
      value: `${deltaPrefix(total_positions_delta)}${formatFTE(
        Math.abs(total_positions_delta)
      )}`,
    })
  }

  rows.push({
    description: columnsByDataField[constants.STAFF_FTE].displayName,
    value: `${formatFTE(data[constants.STAFF_FTE])}`,
  })

  if (data[constants.CHANGE]) {
    const total_fte_delta = data[constants.CHANGE][constants.STAFF_FTE]

    rows.push({
      description: columnsByDataField[`${constants.CHANGE}.${constants.STAFF_FTE}`].displayName,
      value: `${deltaPrefix(total_fte_delta)}${formatFTE(
        Math.abs(total_fte_delta)
      )}`,
    })
  }

  return (
    <ToolkitProvider
      keyField={constants.DESCRIPTION}
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
      {!data.centralProgramsJson[constants.CHANGE] ? (
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
