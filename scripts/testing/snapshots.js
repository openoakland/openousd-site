const pages = require("./page-paths.json")

module.exports = async () => {
  return pages.map((page) => ({ url: page.url }))
}
