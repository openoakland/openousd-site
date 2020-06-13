import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from 'gatsby'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'

const sort = (a, b, order, dataField, rowA, rowB) => {
  a = parseInt(a)
  b = parseInt(b)
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

const getColumns = () =>(
  [{
    dataField: 'job_class_description',
    text: "Job Description",
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header">Job Description {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    searchable: false
  },{
    dataField: 'count',
    text: 'Count',
    headerFormatter: (column, colIndex, components) => { return (<div className="table-header text-left">Count {components.sortElement}</div>)},
    sort: true,
    sortCaret: getSortCaret,
    align: 'left',
    sortFunc: sort,
    searchable: false
  }]
)

const StaffRolesTable = ({data}) => {

  const columns = getColumns()

  return (
    <ToolkitProvider
      keyField="job_class_description"
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
            defaultSorted={[{dataField: 'count', order: 'desc'}]}
          />
        </div>
      )}
    </ToolkitProvider>
  )}

export default ({ data }) => {
  const centralProgram = data.centralProgramsJson
  console.log(centralProgram.staff_roles)
  return (
    <Layout>
    <SEO title={centralProgram.name} />
      <div>This is a placeholder for the {centralProgram.name} page.</div>
      <StaffRolesTable data={centralProgram.staff_roles} />
    </Layout>
  )
}

export const query = graphql`
  query($code: Int!) {
    centralProgramsJson(code: {eq: $code }) {
        name
        budget
        spending
        year
        code
        staff_roles {
          count
          job_class_description
        }
    }
  }
`
