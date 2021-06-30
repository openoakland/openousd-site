const pages = require("./snapshots.json")
const STAGING_PATH = "https://staging.openousd.org"

module.exports = async () => {
  console.log(pages)
  return pages.map((page) => ({ url: STAGING_PATH + page.url }))
}
