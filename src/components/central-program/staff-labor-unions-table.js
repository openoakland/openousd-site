import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { getSortCaret } from '../table-utilities'


const StaffLaborUnionsTable = ({data}) => {
  const columns = [{
    dataField: 'description',
    text: "Labor Union",
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Labor Union {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    searchable: false
  },{
    dataField: 'eoy_total_positions_for_bu',
    text: 'Number of Staff',
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">Number of Staff {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    align: 'right',
    searchable: false
  }]

  return (
    <ToolkitProvider
      keyField="description"
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
            defaultSorted={[{dataField: 'eoy_total_positions_for_bu', order: 'desc'}]}
          />
        </div>
      )}
    </ToolkitProvider>
  )}

StaffLaborUnionsTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
}

StaffLaborUnionsTable.defaultProps = {
    data: [],
}

export default StaffLaborUnionsTable
