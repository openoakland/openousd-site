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
  const initialObject = {name: 'Total for All Departments', spending: 0, budget: 0, staff: 0}
  return data.reduce((returnObject, currentItem) => {
    returnObject.spending += +currentItem.spending;
    returnObject.budget += +currentItem.budget;
    returnObject.staff += +currentItem.staff;
    return returnObject
  }, initialObject)
}

const columnsFormatter = (cell, row, rowIndex, formatExtraData) => {
  if (rowIndex === 0) {
    return (<span className="strong">{row.name}</span>)
  }
  return (<Link to={row.url}>{row.name}</Link>)
}

const columns = [{
  formatter: columnsFormatter,
  dataField: 'name',
  text: 'Department',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Department</div>)},
  sort: true
}, {
  dataField: 'spending',
  formatter: (cell, row) => formatToUSD(row.spending),
  text: 'Spending',
  // TODO improve tooltip text for all of these
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Spending <HelpIcon tooltipText="Amount spent" /> </div>)},
  searchable: false,
  sort: true
}, {
  dataField: 'budget',
  formatter: (cell, row) => formatToUSD(row.budget),
  text: 'Budget',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Budget <HelpIcon tooltipText="Budget allocated"/></div>)},
  searchable: false,
  sort: true
}, {
  dataField: 'staff',
  text: 'Staff',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Staff <HelpIcon tooltipText="Number of staff"/></div>)},
  searchable: false,
  sort: true
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
      // TODO is name unique?
      keyField="name"
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
            pagination={paginationFactory()}
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
