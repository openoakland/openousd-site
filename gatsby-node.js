const path = require(`path`)
var slugify = require("slugify")
const fs = require("fs").promises

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Defining types because Gatsby is making some Int values String
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === `CentralProgramsJson`) {
    const { createNodeField } = actions

    // Some program names include parentheses, remove those so they don't end up in path
    const slugifyOptions = {
      remove: /[*+~.()'"!:@/]/g,
      lower: true,
    }

    const slug = slugify(node.name, slugifyOptions)

    // Add a slug field which can be used later to generate page slug
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    // Use slug in path and create node field so it is queryable
    createNodeField({
      name: `path`,
      node,
      value: `central-programs/${slug}`,
    })
  }
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
          fields {
            path
          }
        }
      }
    }
  `)

  result.data.allCentralProgramsJson.nodes.forEach((node) => {
    createPage({
      path: node.fields.path,
      component: path.resolve(`./src/components/central-program.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        code: node.code,
      },
    })
  })
}

exports.onPostBuild = async ({ graphql }) => {
  const { data } = await graphql(`
    {
      pages: allSitePage(filter: { path: { regex: "/^/en/|^/es//" } }) {
        nodes {
          path
        }
      }
    }
  `)

  return fs.writeFile(
    path.resolve(__dirname, "scripts/testing/page-paths.json"),
    JSON.stringify(
      data.pages.nodes.map((node) => {
        return {
          url: node.path,
        }
      }),
      null,
      2
    )
  )
}
