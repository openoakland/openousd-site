import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { getSortCaret } from '../table-utilities'


const getColumns = () =>(
  [{
    dataField: 'role_description',
    text: "Role / Title",
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Role / Title {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    searchable: false
  },{
    dataField: 'eoy_total_positions_for_role',
    text: 'Number of Staff',
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">Number of Staff {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    align: 'right',
    searchable: false
  }]
)

const StaffRolesTable = ({data}) => {

  const columns = getColumns()

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
