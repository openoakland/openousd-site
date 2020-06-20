import React from "react"
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'

export const getSortCaret = (order, column) => {
  if (order === 'asc') {
    return (<ArrowDropUp className="text-dark" />)
  }
  if (order === 'desc') {
    return (<ArrowDropDown className="text-dark" />)
  }
  // invisible icon used as a spaceholder so that
  // when an icon does render it does not shift the table column
  return (<ArrowDropDown className="invisible"/>)
}

export const formatToUSD = amount => {
  // it would be better to just useIntl.NumberFormat currency, but that seems to always
  // add cents ie $2,330.00
  return '$' + new Intl.NumberFormat('en-US', { maximumFractionDigits: 0}).format(amount)
}


export const sort = (a, b, order, dataField, rowA, rowB, totalRowName) => {
  if (rowA.name === totalRowName) {
    return -1
  }
  if (rowB.name === totalRowName) {
    return 1
  }
  if (order === "asc") {
    if (a < b) { return -1 }
    if (a > b) { return 1 }
    return 0
  }
  if (a > b) { return -1 }
  if (a < b) { return 1 }
  return 0
}
