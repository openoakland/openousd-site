import { useStaticQuery, graphql } from "gatsby"

export const useGetProgramPathBySiteCode = () => {
  const allCentralProgramNodes = useStaticQuery(
    graphql`
      query {
        allCentralProgramsJson {
          nodes {
            code
            fields {
              path
            }
          }
        }
      }
    `
  )
  let pathsBySiteCode = {}

  allCentralProgramNodes.allCentralProgramsJson.nodes.forEach(program => {
    pathsBySiteCode[program.code] = program.fields.path
  })

  return siteCode => {
    return pathsBySiteCode[siteCode]
  }
}
