const path = require("path")

const contentful = require("contentful-management")

require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") })

module.exports = function () {
  const contentfulClient = contentful.createClient({
    accessToken: process.env.CF_PERSONAL_ACCESS_TOKEN,
  })

  return contentfulClient
    .getSpace(process.env.CF_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.CF_ENVIRONMENT))
}
