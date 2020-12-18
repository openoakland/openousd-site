import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { getSortCaret, sort, rowUnderline } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"

const TOTAL_ROW_NAME = "Total"
let columnsByDataField
const ROLE_DESCRIPTION = "role_description"
const ROLE_TOTAL_POSITIONS = "eoy_total_positions_for_role"

const createFirstRow = data => {
  const initialObject = {
    [ROLE_DESCRIPTION]: TOTAL_ROW_NAME,
    [ROLE_TOTAL_POSITIONS]: 0,
  }
  return data.reduce((returnObject, currentItem) => {
    returnObject[ROLE_TOTAL_POSITIONS] += +currentItem[ROLE_TOTAL_POSITIONS]
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
    ROLE_DESCRIPTION,
    TOTAL_ROW_NAME
  )
}

const getColumns = () => [
  {
    dataField: ROLE_DESCRIPTION,
    text: columnsByDataField[ROLE_DESCRIPTION].displayName,
    headerFormatter: (column, colIndex, components) => {
      return (
        <div className="table-header">
          {columnsByDataField[ROLE_DESCRIPTION].displayName}{" "}
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
    dataField: ROLE_TOTAL_POSITIONS,
    text: columnsByDataField[ROLE_TOTAL_POSITIONS].displayName,
    headerFormatter: (column, colIndex, components) => {
      return (
        <div className="table-header text-right">
          {components.sortElement}{" "}
          {columnsByDataField[ROLE_TOTAL_POSITIONS].displayName}
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
      keyField={ROLE_DESCRIPTION}
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
            defaultSorted={[{ dataField: ROLE_TOTAL_POSITIONS, order: "desc" }]}
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
