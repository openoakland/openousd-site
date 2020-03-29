import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import './central-programs-table.scss'
import HelpIcon from './help-icon'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
const TOTAL_FOR_ALL_CENTRAL_PROGRAMS = 'Total for All Central Programs';


const formatToUSD = amount => {
  // it would be better to just useIntl.NumberFormat currency, but that seems to always
  // add cents ie $2,330.00
  return '$' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0}).format(amount)
}

const createFirstRow = data => {
  const initialObject = {name: TOTAL_FOR_ALL_CENTRAL_PROGRAMS, spending: 0, budget: 0, staff: 0}
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
  return (<span>{row.name}</span>)
}

const sort = (a, b, order, dataField, rowA, rowB) => {
  if (rowA.name === TOTAL_FOR_ALL_CENTRAL_PROGRAMS) {
    return -1
  }
  if (rowB.name === TOTAL_FOR_ALL_CENTRAL_PROGRAMS) {
    return 1
  }
  if (order === "asc") {
    if (a < b) { return -1 }
    if (a > b) { return 1 }
    return 0
  }
  if (a > b) { return -1 }
  if (a < b) { return 1 }
  return 0
}

const getSortCaret = (order, column) => {
  if (order === 'asc') {
    return (<ArrowDropUp className="text-dark" />)
  }
  if (order === 'desc') {
    return (<ArrowDropDown className="text-dark" />)
  }
  // invisible icon used as a spaceholder so that
  // when an icon does render it does not shift the table column
  return (<ArrowDropDown className="invisible"/>)
}

const columns = [{
  formatter: columnsFormatter,
  dataField: 'name',
  text: 'Program',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Central Program {components.sortElement}</div>)},
  sortCaret: getSortCaret,
  sort: true,
  sortFunc: sort
},{
  dataField: 'category',
  text: 'Category',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-left">Category {components.sortElement}</div>)},
  sortCaret: getSortCaret,
  sort: true,
  sortFunc: sort,
  align: 'left'
}, {
  dataField: 'spending',
  formatter: (cell, row) => formatToUSD(row.spending),
  text: 'Spending',
  // TODO improve tooltip text for all of these
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">{components.sortElement} Spending <HelpIcon tooltipText="Amount spent" /> </div>)},
  sortCaret: getSortCaret,
  searchable: false,
  sort: true,
  sortFunc: sort,
  type: 'number',
  align: 'right'
}, {
  dataField: 'budget',
  formatter: (cell, row) => formatToUSD(row.budget),
  text: 'Budget',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">{components.sortElement} Budget <HelpIcon tooltipText="Budget allocated"/></div>)},
  sortCaret: getSortCaret,
  searchable: false,
  sort: true,
  sortFunc: sort,
  type: 'number',
  align: 'right'
}, {
  dataField: 'staff',
  text: 'Staff',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">{components.sortElement} Staff <HelpIcon tooltipText="Number of staff"/></div>)},
  sortCaret: getSortCaret,
  searchable: false,
  sort: true,
  sortFunc: sort,
  type: 'number',
  align: 'right',
  hidden: true,
  csvExport: false
}];

const rowClasses = (row, rowIndex) => {
  if (rowIndex === 0) {
    return 'first-row'
  }
};


const Table = ({data}) => {
  const firstRow = createFirstRow(data);
  // creates new array
  data = data.concat([firstRow]);
  return (
    <ToolkitProvider
      keyField="code"
      data={data}
      columns={columns}
      bootstrap4
      search
    >
      {props => (
        <div>
            {/* TODO can we get the years from the data? */}
          <h1>Central Programs for the 2018-2019 School Year</h1>
          <div>
            <ExportCSVButton {...props.csvProps} className="btn-link">
              Download Data to CSV
            </ExportCSVButton>
          </div>
          <SearchBar
            {...props.searchProps}
            placeholder="Search programs"
            className="search-bar"
          />
          <hr />
          <BootstrapTable
            // turning off pagination for now
            // pagination={paginationFactory()}
            classes="table-borderless"
            bordered={false}
            {...props.baseProps}
            rowClasses={rowClasses}
            defaultSorted={[{dataField: 'name', order: 'asc'}]}
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
