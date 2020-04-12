## Overview

This is the repo for the OpenOUSD project located at [openousd.org](https://openousd.org). Read the front page for a description of the project. All contributors are volunteers and the project has no private or public funders.

We welcome new team members, especially if they are skilled in Gatsby.js, GraphQL, or PostgreSQL (or are willing to learn).


## Setting Up The Project Locally

1. Run `git clone git@github.com:openoakland/openousd-site.git`
2. `cd openousd-site`
3. `npm install` (install node if you don't have npm: https://nodejs.org/en/download/)
4. `gatsby develop`

Go to `http://localhost:8000` in your browser

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
