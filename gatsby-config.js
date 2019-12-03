module.exports = {
    siteMetadata: {
        title: `OpenOUSD`,
        description: `Volunteers providing transparent access to Oakland Unified School District budget & data`,
        author: `@OpenOakland`,
    },
    plugins: [
        {
          resolve: 'gatsby-plugin-sass',
          options: {
            data: `@import "${__dirname}/src/styles/_variables.scss";`,
          }
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/data/`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            }
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Nunito Sans\:400,400i,800,900`,
                    `Roboto Mono\:400,700`
                ],
                display: 'swap'
            }
        },
        "gatsby-transformer-json",
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
