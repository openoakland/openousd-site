# store starting branch so we can return to it
STARTING_BRANCH="$(git branch)"

# fetch latest from git
git fetch

# checkout the staging branch
git checkout origin/gh-pages

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

git checkout ${STARTING_BRANCH}
