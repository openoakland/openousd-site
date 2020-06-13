import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { getSortCaret } from '../table-utilities'


const Heading = () => {

  const columns = [{
    dataField: 'description',
    text: "Description",
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Description</div>)},
  },{
    dataField: 'value',
    text: 'Value',
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">Value</div>)},
  }]

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
            classes=""
            bordered={false}
            {...props.baseProps}
          />
        </div>
      )}
    </ToolkitProvider>
  )
}

const ProgramDataOverviewTable = ({data}) => (
  <Heading/>
)

ProgramDataOverviewTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
}

ProgramDataOverviewTable.defaultProps = {
    data: [],
}

export default ProgramDataOverviewTable
