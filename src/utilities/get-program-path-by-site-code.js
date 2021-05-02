import { useStaticQuery, graphql } from "gatsby"

export const useGetProgramPathBySiteCode = () => {
	const allCentralProgramNodes = useStaticQuery(
		graphql`
			query {
				allSitePage(
					filter: {
						context: { language: { eq: "en" }, code: { gt: 0 } }
						path: { regex: "/^(?!/en.*$).*/" }
					}
				) {
					nodes {
						path
						context {
							code
						}
					}
				}
			}
		`
	)
	let pathsBySiteCode = {}

	allCentralProgramNodes.allSitePage.nodes.forEach(program => {
		pathsBySiteCode[program.context.code] = program.path
	})

	return siteCode => {
		return pathsBySiteCode[siteCode]
	}
}
