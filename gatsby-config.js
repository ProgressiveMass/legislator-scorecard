if (process.env.STAGING) {
  require("dotenv").config({
    path: `.env.staging`,
  })
  console.log("Building for staging environment")
} else {
  require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  })
}

module.exports = {
  siteMetadata: {
    title: `Progressive Massachusetts Legislator Scorecard`,
    description: `Learn about MA state legislation and review your legislators' records`,
    author: `Alex Holachek`,
    siteUrl: 'https://scorecard.progressivemass.com/',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    'gatsby-plugin-robots-txt',
    `gatsby-plugin-open-graph-images`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [
          '/all-legislators/LegislatorList/',
          '/all-legislators/SortButton/',
          '/landing/*',
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Progressive Massachusetts Legislator Scorecard`,
        short_name: `Prog Mass Scorecard`,
        start_url: `/`,
        background_color: `#037BFF`,
        theme_color: `#037BFF`,
        display: `minimal-ui`,
        icon: `src/images/progressive-mass-logo.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-93532804-1',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // "gatsby-plugin-offline",
  ],
}
