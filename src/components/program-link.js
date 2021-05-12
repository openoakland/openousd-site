import React from "react"
import { Link } from "gatsby-plugin-intl"
import PropTypes from "prop-types"

import { useGetProgramPathBySiteCode } from "../utilities/get-program-path-by-site-code"

const ProgramLink = ({ siteCode, children }) => {
	return (
		<Link to={`/${useGetProgramPathBySiteCode(siteCode)}`}>{children}</Link>
	)
}

ProgramLink.propTypes = {
	data: PropTypes.number,
}

export default ProgramLink
