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

const { SearchBar, ClearSearchButton } = Search
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

// const getColumns = ({ firstColName, categoryColName }) => [
//   {
//     dataField: "name",
//     sortCaret: getSortCaret,
//     text: firstColName,
//     headerFormatter: (column, colIndex, components) => {
//       return (
//         <div className="table-header">
//           {firstColName} {components.sortElement}
//         </div>
//       )
//     },
//     sort: true,
//     searchable: true,
//   },
//   {
//     dataField: "category",
//     text: categoryColName,
//     headerFormatter: (column, colIndex, components) => {
//       return (
//         <div className="table-header text-left">
//           {categoryColName} {components.sortElement}
//         </div>
//       )
//     },
//     sortCaret: getSortCaret,
//     sort: true,
//     align: "left",
//     searchable: true,
//   },
// ]

const BasicTable = ({ data, columns, tableInfo }) => {
  columns = columns.map((c) => ({
    dataField: c.dataField,
    text: c.text,
    sortCaret: c.sortCaret || getSortCaret,
    sort: c.sort || true,
    align: c.align || "left",
    searchable: c.searchable || true,
  }))

  return (
    <ToolkitProvider
      keyField="code"
      data={data}
      columns={columns}
      exportCSV={{ fileName: `openousd.csv` }}
      bootstrap4
      search
    >
      {(props) => (
        <div>
          {/*<h1>Categories</h1>*/}
          <SearchBar
            {...props.searchProps}
            placeholder={tableInfo.labels.searchLabel}
            className="table-search-bar my-3"
          />
          <ClearSearchButton {...props.searchProps} className="clear-btn" />
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

BasicTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

BasicTable.defaultProps = {
  data: [],
}

export default BasicTable
