const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allDepartmentsJson {
        nodes {
          name
          code
        }
      }
    }
  `)
  result.data.allDepartmentsJson.nodes.forEach(node => {
    createPage({
      path: `department/${node.name}`,
      component: path.resolve(`./src/components/department.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        code: node.code,
      },
    })
  })}