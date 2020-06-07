const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allCentralProgramsJson {
        nodes {
          name
          code
        }
      }
    }
  `)
  result.data.allCentralProgramsJson.nodes.forEach(node => {
    createPage({
      path: `central-program/${node.name}`,
      component: path.resolve(`./src/components/central-program.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        code: node.code,
      },
    })
  })}
