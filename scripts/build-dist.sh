#!/bin/bash

# save db
mongodump --db site --out ~/site_perso/backup/latest/

# recreate dist folder
rm -rf dist
mkdir dist

# generate sitemap
node app apostrophe-site-map:map --update-cache

# copy custom code, transpile it to ES5 and prettify it
rsync -a --exclude='**/.DS_Store' config dist
rsync -a --exclude='**/.DS_Store' --exclude='lib/modules/webpack-custom/' lib dist
rsync -a app.js dist
npx babel dist -d dist
npx prettier --write 'dist/**/*.js'

# copy other folders
rsync -a --exclude='**/.DS_Store' public dist
rsync -a --exclude='**/.DS_Store' scripts dist
rsync -a --exclude='**/.DS_Store' nginx dist
rsync -a --exclude='**/.DS_Store' letsencrypt dist
rsync -a robots.txt dist/public

# build docker image
docker-compose build

echo Docker ready