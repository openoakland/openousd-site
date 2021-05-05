import { useStaticQuery, graphql } from "gatsby"
import { useMemo } from "react"

export const useGetProgramPathBySiteCode = siteCode => {
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

  const pathsBySiteCode = useMemo(() => {
    const paths = {}
    allCentralProgramNodes.allCentralProgramsJson.nodes.forEach(
      program => (paths[program.code] = program.fields.path)
    )
    return paths
  }, [allCentralProgramNodes])

  return pathsBySiteCode[siteCode]
}
