set -e

# store starting branch so we can return to it
STARTING_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# fetch latest from git
git fetch

# checkout the staging branch
git checkout -q origin/gh-pages

echo "removing the staging.openousd.org domain"
rm CNAME

# create a CNAME for production
echo "creating new CNAME"
echo 'openousd.org' > 'CNAME'

# push it to the production hosting repo
echo "running gh-pages"
gh-pages -d . \
    -b master \
    -m "staging promoted at commit $(git rev-parse --short HEAD) $(date +%m-%d-%Y_%H:%M:%S)" \
    -r git@github.com:openoakland/openousd-site-prod.git

echo "returning to ${STARTING_BRANCH} branch"
git checkout ${STARTING_BRANCH}
