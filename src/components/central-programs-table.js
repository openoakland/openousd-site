import React, { useState } from "react"
import { Link } from 'gatsby'
import PropTypes from "prop-types"
import BootstrapTable from 'react-bootstrap-table-next'
// import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit'
import './tables.scss'
import DownloadIcon from '@material-ui/icons/SaveAlt'
import CreateIcon from '@material-ui/icons/Create'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import { trackCustomEvent } from 'gatsby-plugin-google-analytics'
import { Button, Modal, Row, Col } from 'react-bootstrap'
import HelpIcon from "./help-icon"
import { getSortCaret, formatToUSD, formatFTE, sort } from './table-utilities'

const { SearchBar } = Search
const { ExportCSVButton } = CSVExport
const TOTAL_FOR_ALL_CENTRAL_PROGRAMS = 'Total for All Central Programs'


const formatRemainingBudgetCell = (percent, rowIndex) => {
  let classes = ""

  if(percent < -3) {
    classes = "over-budget"
  }

  if(rowIndex !== 0){
    return <span className={classes}>{percent}%</span>
  }
}

const createFirstRow = data => {
  const initialObject = {name: TOTAL_FOR_ALL_CENTRAL_PROGRAMS, spending: 0, budget: 0, eoy_total_fte: 0}
  return data.reduce((returnObject, currentItem) => {
    returnObject.spending += +currentItem.spending
    returnObject.budget += +currentItem.budget
    returnObject.staff += +currentItem.staff
    returnObject.eoy_total_fte += +currentItem.eoy_total_fte
    return returnObject
  }, initialObject)
}

const columnsFormatter = (cell, row, rowIndex, formatExtraData) => {
  if (rowIndex === 0) {
    return (<span className="strong">{row.name}</span>)
  }
  if (row.name === "OUSD Police Department") {
    return (<span className="strong"><Link to="/central-program/ousd-police-department/">{row.name}</Link></span>)
  }
  return (<span>{row.name}</span>)
}

const sortPrograms = (a, b, order, dataField, rowA, rowB) => {
  return sort(a, b, order, dataField, rowA, rowB, 'name', TOTAL_FOR_ALL_CENTRAL_PROGRAMS)
}

const trackTableCellClickEvent = (e, column, columnIndex, row, rowIndex) => {
  if(columnIndex === 0){
    trackCustomEvent({
        category: "Central Programs Table",
        action: "Click Program",
        label: row.name
    })
  }
}

const trackSortEvent = (fieldName) => {
  trackCustomEvent({
      category: "Central Programs Table",
      action: "Sort Column",
      label: fieldName
  })
}

const columns = [{
  formatter: columnsFormatter,
  dataField: 'name',
  text: 'Program',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Central Program {components.sortElement}</div>)},
  sortCaret: getSortCaret,
  sort: true,
  onSort: (field,order) => trackSortEvent(field),
  sortFunc: sortPrograms,
  events: {
    onClick: (e, column, columnIndex, row, rowIndex) => trackTableCellClickEvent(e, column, columnIndex, row, rowIndex)
  }
},{
  dataField: 'category',
  text: 'Category',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-left">Category {components.sortElement}</div>)},
  sortCaret: getSortCaret,
  sort: true,
  onSort: (field,order) => trackSortEvent(field),
  sortFunc: sortPrograms,
  hidden: true,
  align: 'left'
}, {
  dataField: 'spending',
  formatter: (cell, row) => formatToUSD(row.spending),
  text: 'Spending',
  // TODO improve tooltip text for all of these
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">{components.sortElement} Spending</div>)},
  sortCaret: getSortCaret,
  searchable: false,
  sort: true,
  onSort: (field,order) => trackSortEvent(field),
  sortFunc: sortPrograms,
  type: 'number',
  align: 'right'
}, {
  dataField: 'budget',
  formatter: (cell, row) => formatToUSD(row.budget),
  text: 'Budget',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">{components.sortElement} Budget</div>)},
  sortCaret: getSortCaret,
  searchable: false,
  sort: true,
  hidden: true,
  onSort: (field,order) => trackSortEvent(field),
  sortFunc: sortPrograms,
  type: 'number',
  align: 'right'
}, {
  dataField: 'eoy_total_fte',
  formatter: (cell,row) => formatFTE(row.eoy_total_fte),
  text: 'Staff',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">{components.sortElement} Staff * <HelpIcon tooltipText="Full Time Equivalent (FTE) rather than people. For example, 2 people working 20 hours a week = 1 FTE." placement="bottom"/></div>)},
  headerStyle: (colum, colIndex) => { return { minWidth: '110px'} },
  sortCaret: getSortCaret,
  searchable: false,
  sort: true,
  onSort: (field,order) => trackSortEvent(field),
  sortFunc: sortPrograms,
  type: 'number',
  align: 'right',
  csvExport: false
}, {
  dataField: 'remaining_budget_percent',
  formatter: (cell, row, rowIndex) => formatRemainingBudgetCell(row.remaining_budget_percent, rowIndex),
  text: 'Remaining Budget',
  headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-right">{components.sortElement} Remaining Budget</div>)},
  sortCaret: getSortCaret,
  searchable: false,
  sort: true,
  onSort: (field,order) => trackSortEvent(field),
  sortFunc: sortPrograms,
  type: 'number',
  align: 'right'
}]

const rowClasses = (row, rowIndex) => {
  if (rowIndex === 0) {
    return 'first-row'
  }
}

const ModalColumnToggle = ({
  columns,
  onColumnToggle,
  toggles
}) => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    trackCustomEvent({
      category: "Central Programs Table",
      action: "Edit Columns",
      label: "Open"
    })
  }

  const handleColumnToggle = (column) => {
    onColumnToggle(column.dataField)

    const action = column.toggle ? "Hide Column" : "Show Column"

    trackCustomEvent({
      category: "Central Programs Table",
      action: action,
      label: column.text
    })
  }

  let columnsGroupedBy = {'visible': [], 'hidden': []}

  columns
    .reduce((r, col) => {
      if (col.text !== "Program") {
        col.toggle = toggles[col.dataField]
        if(col.toggle) { r.visible.push(col) }
        else {r.hidden.push(col)}
      }
      return r
    }, columnsGroupedBy)

  const ColumnOption = ({column}) => (
    <Button className={`column-option py-3 py-md-2 ${column.toggle ? "visible" : "hidden"}`}
      variant="light"
      key={ column.dataField }
      data-toggle="button"
      onClick={ () => handleColumnToggle(column) }
    >
      { column.toggle ? <RemoveCircleOutlineIcon/> : <AddCircleOutlineIcon/> }
      <span className="ml-2">{ column.text }</span>
    </Button>
  )

  return (
    <div className="d-md-flex justify-content-end">
      <Button className="cta mb-3 my-md-0" onClick={handleShow} >
        <CreateIcon className="pr-1"/>Edit Columns
      </Button>
      <Modal show={show} onHide={handleClose} id="show-hide-columns-modal" size="sm" centered>
        <Modal.Header closeButton/>
        <Modal.Body className="py-1 pl-5">
          <div className={`heading strong py-2 ${columnsGroupedBy.visible.length > 0 ? "" : "d-none"}`}>Current Columns</div>
          {
            columnsGroupedBy.visible
              .map((column) => (<ColumnOption column={column}/>))
          }
          <div className={`heading strong py-2 ${columnsGroupedBy.hidden.length > 0 ? "" : "d-none"}`}>Columns Not Shown</div>
          {
            columnsGroupedBy.hidden
              .map((column) => (<ColumnOption column={column}/>))
          }
        </Modal.Body>
        <Modal.Footer className="pt-3 pr-4">
          {/*<Button variant="primary" className="cta" size="sm" onClick={handleClose}>
                      Close
                    </Button>*/}
        </Modal.Footer>
      </Modal>
    </div>
  )
}


const CentralProgramsTable = ({data}) => {
  const firstRow = createFirstRow(data)
  // creates new array
  data = data.concat([firstRow])
  return (
    <ToolkitProvider
      keyField="code"
      data={data}
      columns={columns}
      className="table"
      exportCSV={{fileName: `openousd-central-programs.csv`}}
      bootstrap4
      search
      columnToggle
    >
      {props => (
        <div>
          <Row>
            <Col md={8}>
              <SearchBar
                {...props.searchProps}
                placeholder="Search programs"
                className="search-bar mb-4"
              />
            </Col>
            <Col>
              <ModalColumnToggle { ...props.columnToggleProps } />
            </Col>
          </Row>
          <BootstrapTable
            // turning off pagination for now
            // pagination={paginationFactory()}
            wrapperClasses="table-responsive"
            classes=""
            bordered={false}
            {...props.baseProps}
            rowClasses={rowClasses}
            defaultSorted={[{dataField: 'name', order: 'asc'}]}
          />
          <div className="footnote mb-3 mt-2">* Staff numbers change throughout the year due to people leaving the district, layoffs, or movement between departments. This count was taken the end of the year, but does not reflect layoffs that may have eliminated positions during the school year. We are working to get data which allows us to display these mid-year changes.</div>
          <div>
            <ExportCSVButton {...props.csvProps} className="btn-link download">
              <DownloadIcon/>Download Table Data as CSV
            </ExportCSVButton>
          </div>
        </div>

      )}
    </ToolkitProvider>
  )}

CentralProgramsTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
}

CentralProgramsTable.defaultProps = {
    data: [],
}

export default CentralProgramsTable
