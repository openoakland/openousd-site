const path = require(`path`)
var slugify = require('slugify')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Defining types because Gatsby is making soem Int values String
  // which breaks sortign and computation
  const typeDefs = `
    type CentralProgramsJson implements Node {
      staff_roles: [StaffRole]
      staff_bargaining_units: [StaffBargainingUnit]
    }

    type StaffRole {
      eoy_total_positions_for_role: Int
      role_description: String
    }

    type StaffBargainingUnit {
      abbreviation: String
      description: String
      eoy_total_positions_for_bu: Int
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // code is the site code / OUSD identifier for program
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

  // Some program names include parentheses, remove those so they don't end up in path
  const options = {
    remove: /[*+~.()'"!:@/]/g,
    lower: true
  }

  result.data.allCentralProgramsJson.nodes.forEach(node => {
    const slug = slugify(node.name, options)
    createPage({
      path: `central-program/${slug}`,
      component: path.resolve(`./src/components/central-program.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        code: node.code,
      },
    })
  })}
