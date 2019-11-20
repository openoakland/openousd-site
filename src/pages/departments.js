import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/departments-table"


// TODO change this to real data
const data = [ {name: 'I am a really long name with a bunch of words', spending: '21343', budget: 3423434, staff: '3', url: 'acool.html'},
               {name: '1 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '2 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '3 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '6 shorter department name', spending: '1993411', budget: 123344, staff: '2', url: 'test.html'},
               {name: '8 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '9 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '28 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '38 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '4 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'},
               {name: '5 shorter department name', spending: '1993411', budget: 23344, staff: '2', url: 'test.html'}]


const SecondPage = () => (
  <Layout>
    <SEO title="Departments" />
    <h1>Departments</h1>
    <Table data={data} />
  </Layout>
)

export default SecondPage
