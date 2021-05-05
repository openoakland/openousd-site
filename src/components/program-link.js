import React from "react"
import { Link } from "gatsby-plugin-intl"
import { useGetProgramPathBySiteCode } from "../utilities/get-program-path-by-site-code"

const ProgramLink = ({ siteCode, children }) => {
  return (
    <Link to={`/${useGetProgramPathBySiteCode(siteCode)}`}>{children}</Link>
  )
}

export default ProgramLink
