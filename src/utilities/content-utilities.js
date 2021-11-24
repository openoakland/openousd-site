import { useStaticQuery, graphql } from "gatsby"
import * as constants from "../utilities/constants"

export const getColumnsByDataField = (columns) => {
	let columnLabelsByDatafield = {}

	columns.forEach((c) => {
		columnLabelsByDatafield[c.dataFieldName] = c
	})

	return columnLabelsByDatafield
}

export const hasCurrencyFormat = (column) => {
	return [constants.BUDGET, constants.SPENDING].includes(column)
}

export const formatToUSD = (amount, compact = false) => {
	return "$" + commaFormattedInteger(amount, compact)
}

export const commaFormattedInteger = (amount, compact = false) => {
	let options = { maximumFractionDigits: 0 }
	if (compact === true) options.notation = "compact"

	return new Intl.NumberFormat("en-US", options).format(amount)
}

// Convert null to zero & Round without trailing zeroes
export const formatFTE = (fte) => (!fte ? 0 : +fte.toFixed(2))

export const useLocalizeCategory = (nodeLocale) => {
	const {
		allContentfulCentralProgramCategory,
		allContentfulFundingSourceCategory,
	} = useStaticQuery(
		graphql`
			query {
				allContentfulCentralProgramCategory {
					nodes {
						categoryName
						node_locale
						contentful_id
					}
				}
				allContentfulFundingSourceCategory {
					nodes {
						categoryName
						node_locale
						contentful_id
					}
				}
			}
		`
	)
	const contentfulNodes = [
		...allContentfulFundingSourceCategory.nodes,
		...allContentfulCentralProgramCategory.nodes,
	]

	return (category) => {
		let localizedCategory = category

		// If we're in a locality other than English, use the fetched English category name to find the corresponding Contentful node in the English locale,
		// and then use the ID of that Contentful node to find the localized category name by looking up the Contentful node by ID for the given node locale.
		// This is kind of hacky, but was the quickest way forward given that we don't currently store category IDs in the database.
		if (nodeLocale !== "en") {
			const englishNode = contentfulNodes.find(
				(node) => node.categoryName === category && node.node_locale === "en"
			)
			if (!englishNode) {
				console.log(
					`No category found in Contentful with English name ${category}; displaying name in English`
				)
			} else {
				const localizedNode = contentfulNodes.find(
					(node) =>
						node.contentful_id === englishNode.contentful_id &&
						node.node_locale === nodeLocale
				)
				if (!localizedNode) {
					console.log(
						`No category found in Contentful with ID ${englishNode.category_id} for node locale ${nodeLocale}; displaying name in English`
					)
				} else {
					localizedCategory = localizedNode.categoryName
				}
			}
		}

		return localizedCategory
	}
}
