import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
import ToolkitProvider from "react-bootstrap-table2-toolkit"
import { getSortCaret } from "../table-utilities"
import { getColumnsByDataField } from "../../utilities/content-utilities"

let columnsByDataField

const StaffLaborUnionsTable = ({ data, content }) => {
  columnsByDataField = getColumnsByDataField(content.columns)

  const columns = [
    {
      dataField: "bargaining_unit_name",
      text: columnsByDataField["bargaining_unit_name"].displayName,
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="table-header">
            {columnsByDataField["bargaining_unit_name"].displayName}{" "}
            {components.sortElement}
          </div>
        )
      },
      sort: true,
      sortCaret: getSortCaret,
      searchable: false,
    },
    {
      dataField: "eoy_total_positions_for_bu",
      text: columnsByDataField["eoy_total_positions_for_bu"].displayName,
      headerFormatter: (column, colIndex, components) => {
        return (
          <div className="table-header text-right">
            {components.sortElement}{" "}
            {columnsByDataField["eoy_total_positions_for_bu"].displayName}
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
      keyField="bargaining_unit_name"
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
              { dataField: "eoy_total_positions_for_bu", order: "desc" },
            ]}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

StaffLaborUnionsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

StaffLaborUnionsTable.defaultProps = {
  data: [],
}

export default StaffLaborUnionsTable
