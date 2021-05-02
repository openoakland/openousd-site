import React from "react"
import { Link } from "gatsby-plugin-intl"
import { useGetProgramPathBySiteCode } from "../utilities/get-program-path-by-site-code"

const ProgramLink = ({ siteCode, children }) => {
  const getProgramPathBySiteCode = useGetProgramPathBySiteCode()
  return <Link to={`/${getProgramPathBySiteCode(siteCode)}`}>{children}</Link>
}

export default ProgramLink
