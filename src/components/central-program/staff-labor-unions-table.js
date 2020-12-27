import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { getSortCaret } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"

let columnsByDataField

const LABOR_UNION_NAME = "bargaining_unit_name"
const LABOR_UNION_POSITIONS = "eoy_total_positions_for_bu"

const StaffLaborUnionsTable = ({ data, content }) => {
  columnsByDataField = getColumnsByDataField(content.columns)

  const columns = [
    {
      dataField: LABOR_UNION_NAME,
      text: columnsByDataField[LABOR_UNION_NAME].displayName,
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="table-header">
            {columnsByDataField[LABOR_UNION_NAME].displayName}{" "}
            {components.sortElement}
          </div>
        )
      },
      sort: true,
      sortCaret: getSortCaret,
      searchable: false,
    },
    {
      dataField: LABOR_UNION_POSITIONS,
      text: columnsByDataField[LABOR_UNION_POSITIONS].displayName,
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="table-header text-right">
            {components.sortElement}{" "}
            {columnsByDataField[LABOR_UNION_POSITIONS].displayName}
          </div>
        )
      },
      sort: true,
      sortCaret: getSortCaret,
      align: "right",
      searchable: false,
    },
  ]

  return (
    <ToolkitProvider
      keyField={LABOR_UNION_NAME}
      data={data}
      columns={columns}
      bootstrap4
    >
      {props => (
        <div>
          <BootstrapTable
            classes=""
            bordered={false}
            {...props.baseProps}
            defaultSorted={[
              { dataField: LABOR_UNION_POSITIONS, order: "desc" },
            ]}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

export const query = graphql`
  fragment StaffLaborUnionsContent on ContentfulProgramDetailsPageTemplate {
    staffLaborUnionsTable {
      columns {
        displayName
        dataFieldName
      }
      heading
    }
  }
  fragment StaffLaborUnionsData on CentralProgramsJson {
    staff_bargaining_units {
      eoy_total_positions_for_bu
      bargaining_unit_name
      abbreviation
    }
  }
`

StaffLaborUnionsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

StaffLaborUnionsTable.defaultProps = {
  data: [],
}

export default StaffLaborUnionsTable
