export const getColumnsByDataField = columns => {
	let columnLabelsByDatafield = {}

	columns.forEach(c => {
		columnLabelsByDatafield[c.dataFieldName] = c
	})

	return columnLabelsByDatafield
}
