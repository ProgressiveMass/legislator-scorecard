/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const { createOpenGraphImage } = require("gatsby-plugin-open-graph-images");

const createPageDataStruct = require('./gatsbyNodeHelper/index')
const houseLegislators = require('./src/data/house_legislators.json')
const senateLegislators = require('./src/data/senate_legislators.json')

const makePage = ({ chamber, pageData, createPage, legislatorId }) => {
  const ogImageFilename =
    (pageData.legislator.name + '-' + pageData.legislator.district)
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[.,']/g, '')
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // stackoverflow.com/questions/990904

  const context = {
    id: legislatorId,
    chamber,
    pageData,
    ogImage: createOpenGraphImage(createPage, {
      path: `og-images/legislator/${ogImageFilename}.png`,
      component: path.resolve(`src/components/legislator/ogImage.js`),
      waitCondition: 'networkidle0',
      size: {
        width: 630,
        height: 315,
      },
      context: {
        chamber,
        pageData,
      },
    }),
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
