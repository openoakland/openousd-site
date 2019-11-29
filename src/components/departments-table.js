import { Link } from "gatsby"
import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import './departments-table.scss'
import HelpIcon from './help-icon'
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


const formatToUSD = amount => {
  // it would be better to just useIntl.NumberFormat currency, but that seems to always
  // add cents ie $2,330.00
  return '$' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0}).format(amount)
}

const createFirstRow = data => {
  const initialObject = {node: {name: 'Total for All Departments', spending: 0, budget: 0, staff: 0}}
  return data.reduce((returnObject, currentItem) => {
    returnObject.node.spending += +currentItem.node.spending;
    returnObject.node.budget += +currentItem.node.budget;
    returnObject.node.staff += +currentItem.node.staff;
    return returnObject
  }, initialObject)
}

const columnsFormatter = (cell, row, rowIndex, formatExtraData) => {
  if (rowIndex === 0) {
    return (<span className="strong">{row.node.name}</span>)
  }
  return (<span>{row.node.name}</span>)
}

const columns = [{
  formatter: columnsFormatter,
  dataField: 'node.name',
  text: 'Department',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Department</div>)},
  sort: true
}, {
  dataField: 'node.spending',
  formatter: (cell, row) => formatToUSD(row.node.spending),
  text: 'Spending',
  // TODO improve tooltip text for all of these
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">Spending <HelpIcon tooltipText="Amount spent" /> </div>)},
  searchable: false,
  sort: true,
  type: 'number',
  align: 'right'
}, {
  dataField: 'node.budget',
  formatter: (cell, row) => formatToUSD(row.node.budget),
  text: 'Budget',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">Budget <HelpIcon tooltipText="Budget allocated"/></div>)},
  searchable: false,
  sort: true,
  type: 'number',
  align: 'right'
}, {
  dataField: 'node.staff',
  text: 'Staff',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">Staff <HelpIcon tooltipText="Number of staff"/></div>)},
  searchable: false,
  sort: true,
  type: 'number',
  hidden: true,
}];

const rowClasses = (row, rowIndex) => {
  if (rowIndex === 0) {
    return 'first-row'
  }
};


const Table = ({data}) => {
  const firstRow = createFirstRow(data);
  data.unshift(firstRow);
  return (
    <ToolkitProvider
      keyField="node.code"
      data={data}
      columns={columns}
      bootstrap4
      search
    >
      {props => (
        <div>
            {/* TODO can we get the years from the data? */}
          <h3>Department Data for the 2018-2019 School Year</h3>
          <div>
            <ExportCSVButton {...props.csvProps} className="btn-link">
              Download Data to CSV
            </ExportCSVButton>
          </div>
          <SearchBar
            {...props.searchProps}
            placeholder="Department Search"
            className="search-bar"
          />
          <hr />
          <BootstrapTable
            // turning off pagination for now to help with debug
            // pagination={paginationFactory()}
            classes="table-borderless"
            bordered={false}
            {...props.baseProps}
            rowClasses={rowClasses}
          />
        </div>
      )}
    </ToolkitProvider>
  )}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
}

Table.defaultProps = {
    data: [],
}

export default Table
