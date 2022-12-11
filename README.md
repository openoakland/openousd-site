## Overview

This is the repo for the OpenOUSD project located at [openousd.org](https://openousd.org). Read the front page for a description of the project. All contributors are volunteers and the project has no private or public funders.

We welcome new team members!

## Technology

OpenOUSD uses several technologies:
* [Gatsby](https://www.gatsbyjs.org/), a static site generator built on React
* Postgres to store public datasets
* Node.js to serve that data as JSON through a light API (see [openousd-api](https://github.com/openoakland/openousd-api/))

Since this is a static site, the data is fetched once and stored in static JSON files in the `/data` directory. The live site does not require any API or database.


## Setting Up The Project Locally

1. Run `git clone git@github.com:openoakland/openousd-site.git`
2. `cd openousd-site`
3. `npm install` (if you don't have npm, install node via the [node installer](https://nodejs.org/en/download/) or [homebrew (macOS)](https://formulae.brew.sh/formula/node) or [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you work on several node projects)
4. Run `npm install -g gatsby-cli` to install the gastby command line tool globally
5. Ask a member of the project team on OpenOakland Slack for a Contentful API token. Insert the token into this command and run it to create a file and populate the token as an environment variable.
```bash
echo "CONTENTFUL_ACCESS_TOKEN={insert the token here and remove brackets}" > .env.development
```
6. `gatsby develop`

Go to `http://localhost:8000` in your browser

### Using docker

`docker-compose up`

TODO: may need to delete the volume and recreate the container if you want to updte package.json / containers or look into using the `--renew-anon-volumes` flag.

See: https://stackoverflow.com/questions/30043872/docker-compose-node-modules-not-present-in-a-volume-after-npm-install-succeeds

## Deploying

### Staging

Anyone with write privileges to the repository should be able to push a branch to [staging.openousd.org](staging.openousd.org).

To do that, run this command from your branch:
```
npm run deployStaging
```

This runs some commands listed in `package.json` which essentially:
1. run a production `gatsby build`
2. creates the `CNAME` file for GitHub Pages
3. Pushes to the `gh-pages` branch using [`gh-pages`](https://github.com/tschaub/gh-pages)

### Promote Staging to Production

Only a few members of the group and OO GitHub admins can publish [staging.openousd.org](staging.openousd.org) to [openousd.org](openousd.org).

Please be careful. If you have those permissions, you can run this command from any branch:

```
npm run promoteStaging
```

This probably needs to be brought into a proper deploy system, but for now this runs [`promote_staging.sh`](https://github.com/openoakland/openousd-site/blob/sankey-adjust/scripts/promote_staging.sh) which essentially:
1. git fetches the latest from GitHub
2. checks out the `gh-pages` branch
3. replaces the staging `CNAME` file with the production one
4. pushes the files to [`openousd-site-prod`](https://github.com/openoakland/openousd-site-prod) `master` repo
5. goes back to the branch you started in

## Testing with Percy
[Percy](https://percy.io/) is a tool that takes screenshots of web pages across browser types and page widths (mobile, desktop) and does a visual "diff" to see if anthing has changed visually during development. Then you can decide if the changes is desired or not.

[OpenOUSD's Percy project is here](https://percy.io/559d3e9c/openousd).

### Config / Setup
* Get a Percy project API token from a member of the team
* Create a file in your local directory called `.env.production`
* In that file, add a line `PERCY_TOKEN=<Enter Token Here>` to specify the token

### Running Tests
Note: The free version of Percy allows 5000 screenshots a month. Each page has a screenshot for each language OpenOUSD supports and for desktop and mobile. At the time of writing this, that was ~125 screenshots per run.

* **To run against [Staging](https://staging.openousd.org):** `npm run percyStaging`
* **To run against [Production](https://openousd.org):** `npm run percyProd`
