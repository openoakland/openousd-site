import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { getSortCaret, sort, rowUnderline } from '../table-utilities'

const TOTAL_ROW_NAME = 'Total'


const createFirstRow = data => {
  const initialObject = {role_description: TOTAL_ROW_NAME, eoy_total_positions_for_role: 0}
  return data.reduce((returnObject, currentItem) => {
    returnObject.eoy_total_positions_for_role += +currentItem.eoy_total_positions_for_role
    return returnObject
  }, initialObject)
}

const columnsFormatter = (cell, row, rowIndex, formatExtraData) => {
  if (rowIndex === 0) {
    return <span className="strong">{row.role_description}</span>
  }
}

const sortStaffRoles = (a, b, order, dataField, rowA, rowB) => {
  return sort(a, b, order, dataField, rowA, rowB, 'role_description', TOTAL_ROW_NAME)
}

const getColumns = () =>(
  [{
    formatter: columnsFormatter,
    dataField: 'role_description',
    text: "Role / Title",
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Role / Title {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    sortFunc: sortStaffRoles,
    searchable: false
  },{
    dataField: 'eoy_total_positions_for_role',
    text: 'Number of Staff',
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">Number of Staff {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    sortFunc: sortStaffRoles,
    align: 'right',
    searchable: false
  }]
)

const StaffRolesTable = ({data}) => {
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
            {...props.baseProps}
            rowClasses={rowUnderline}
            defaultSorted={[{dataField: 'eoy_total_positions_for_role', order: 'desc'}]}
          />
        </div>
      )}
    </ToolkitProvider>
  )}

StaffRolesTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
}

StaffRolesTable.defaultProps = {
    data: [],
}

export default StaffRolesTable
