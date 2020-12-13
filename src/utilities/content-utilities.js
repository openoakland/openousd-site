export const getDisplayNameForColumn = (dataFieldName, columns) => {
  return columns.find(c => c.dataFieldName === dataFieldName).displayName
}

export const getColumnsByDataField = columns => {
  let columnLabelsByDatafield = {}

  columns.forEach(c => {
    columnLabelsByDatafield[c.dataFieldName] = c
  })

  return columnLabelsByDatafield
}
