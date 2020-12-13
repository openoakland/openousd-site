import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { getSortCaret, sort, rowUnderline } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"

const TOTAL_ROW_NAME = "Total"
let columnsByDataField

const createFirstRow = data => {
  const initialObject = {
    role_description: TOTAL_ROW_NAME,
    eoy_total_positions_for_role: 0,
  }
  return data.reduce((returnObject, currentItem) => {
    returnObject.eoy_total_positions_for_role += +currentItem.eoy_total_positions_for_role
    return returnObject
  }, initialObject)
}

const sortStaffRoles = (a, b, order, dataField, rowA, rowB) => {
  return sort(
    a,
    b,
    order,
    dataField,
    rowA,
    rowB,
    "role_description",
    TOTAL_ROW_NAME
  )
}

const getColumns = () => [
  {
    dataField: "role_description",
    text: "Role / Title",
    headerFormatter: (column, colIndex, components) => {
      return (
        <div className="table-header">
          {columnsByDataField["role_description"].displayName}{" "}
          {components.sortElement}
        </div>
      )
    },
    sort: true,
    sortCaret: getSortCaret,
    sortFunc: sortStaffRoles,
    searchable: false,
  },
  {
    dataField: "eoy_total_positions_for_role",
    text: "Number of Staff",
    headerFormatter: (column, colIndex, components) => {
      return (
        <div className="table-header text-right">
          {components.sortElement}{" "}
          {columnsByDataField["eoy_total_positions_for_role"].displayName}
        </div>
      )
    },
    sort: true,
    sortCaret: getSortCaret,
    sortFunc: sortStaffRoles,
    align: "right",
    searchable: false,
  },
]

const StaffRolesTable = ({ data, content }) => {
  columnsByDataField = getColumnsByDataField(content.columns)
  const columns = getColumns()

  const firstRow = createFirstRow(data)
  data = data.concat([firstRow])

  return (
    <ToolkitProvider
      keyField="role_description"
      data={data}
      columns={columns}
      bootstrap4
    >
      {props => (
        <div>
          <BootstrapTable
            classes=""
            bordered={false}
            rowClasses={rowUnderline}
            {...props.baseProps}
            defaultSorted={[
              { dataField: "eoy_total_positions_for_role", order: "desc" },
            ]}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

StaffRolesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

StaffRolesTable.defaultProps = {
  data: [],
}

export default StaffRolesTable
