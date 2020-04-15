module.exports = {
    pathPrefix: "/openousd-site",
    siteMetadata: {
        title: `OpenOUSD`,
        description: `OpenOUSD aims to bring greater transparency to the Oakland Unified School District's central office.`,
        author: `@OpenOUSD`,
        latestSchoolYear: `2018-19`
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-69150718-3",
                // Defines where to place the tracking script - `true` in the head and `false` in the body
                head: false,
            },
        },
        {
          resolve: 'gatsby-plugin-sass',
          options: {
            data: `@import "./src/styles/_variables.scss";`,
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
                name: `OpenOUSD`,
                short_name: `OpenOUSD`,
                start_url: `/`,
                background_color: `#0042E6`,
                theme_color: `#0042E6`,
                display: `browser`,
                icon: `src/images/favicon.png`, // This path is relative to the root of the site.
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
    ],
}
