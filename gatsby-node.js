/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const createPageDataStruct = require('./gatsbyNodeHelper/index')
const houseLegislators = require('./src/data/house_legislators.json')
const senateLegislators = require('./src/data/senate_legislators.json')

const makePage = ({ chamber, pageData, createPage, legislatorId }) => {
  const context = {
    id: legislatorId,
    chamber,
    pageData,
  }
  createPage({
    path: `/legislator/${legislatorId.replace('ocd-person/', '')}`,
    component: require.resolve(`./src/components/legislator/index.js`),
    context,
  })
}

// create individual legislator pages
exports.createPages = async function({ actions: { createPage } }) {
  ;[
    { chamber: 'senate', legislators: senateLegislators },
    { chamber: 'house', legislators: houseLegislators },
  ].map(({ chamber, legislators }) => {
    legislators.forEach(({ id: legislatorId }) => {
      const pageData = createPageDataStruct({
        chamber,
        legislatorId,
      })
      makePage({ chamber, pageData, createPage, legislatorId })
    })
  })
}
