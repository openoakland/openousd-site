import React from "react"
import PropTypes from "prop-types"
import BootstrapTable from "react-bootstrap-table-next"
// import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit"
import "./tables.scss"
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import ArrowDropUp from "@material-ui/icons/ArrowDropUp"
import DownloadIcon from "@material-ui/icons/SaveAlt"

const { SearchBar } = Search
const { ExportCSVButton } = CSVExport

const getSortCaret = (order, column) => {
  if (order === "asc") {
    return <ArrowDropUp className="text-dark" />
  }
  if (order === "desc") {
    return <ArrowDropDown className="text-dark" />
  }
  // invisible icon used as a spaceholder so that
  // when an icon does render it does not shift the table column
  return <ArrowDropDown className="invisible" />
}

const getColumns = ({ firstColName, categoryColName }) => [
  {
    dataField: "name",
    sortCaret: getSortCaret,
    text: firstColName,
    headerFormatter: (column, colIndex, components) => {
      return (
        <div className="table-header">
          {firstColName} {components.sortElement}
        </div>
      )
    },
    sort: true,
    searchable: true,
  },
  {
    dataField: "category",
    text: categoryColName,
    headerFormatter: (column, colIndex, components) => {
      return (
        <div className="table-header text-left">
          {categoryColName} {components.sortElement}
        </div>
      )
    },
    sortCaret: getSortCaret,
    sort: true,
    align: "left",
    searchable: true,
  },
]

const CategoriesTable = ({ data, colName, tableInfo }) => {
  const categoryColName = tableInfo.columns.find(
    column => column.dataFieldName === "category"
  ).displayName

  const columns = getColumns({ firstColName: colName, categoryColName })

  return (
    <ToolkitProvider
      keyField="code"
      data={data}
      columns={columns}
      exportCSV={{ fileName: `openousd-${colName}-categories.csv` }}
      bootstrap4
      search
    >
      {props => (
        <div>
          {/*<h1>Categories</h1>*/}
          <SearchBar
            {...props.searchProps}
            placeholder={
              tableInfo.labels.searchLabel + " " + colName.toLowerCase()
            }
            className="table-search-bar my-3"
          />
          <BootstrapTable
            // turning off pagination for now
            // pagination={paginationFactory()}
            classes=""
            bordered={false}
            {...props.baseProps}
            defaultSorted={[{ dataField: "category", order: "asc" }]}
          />
          <div>
            <ExportCSVButton {...props.csvProps} className="btn-link download">
              <DownloadIcon />
              {tableInfo.labels.downloadDataLabel}
            </ExportCSVButton>
          </div>
        </div>
      )}
    </ToolkitProvider>
  )
}

CategoriesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

CategoriesTable.defaultProps = {
  data: [],
}

export default CategoriesTable
