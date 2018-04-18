#!/bin/bash

# save db
mongodump --db site --out ~/site_perso/backup/db/latest/

# save uploads and sync them to remote server
chmod -R 755 public/uploads
rsync -a --exclude='**/.DS_Store' public/uploads backup
rsync -caPzy --no-relative --stats --human-readable -e "ssh -p 50683 -l nodeapps" --exclude='**/.DS_Store' ./backup/uploads/ nodeapps@54.36.182.160:/opt/stagecoach/apps/site/uploads/


# clean data folder and regenerate public folder
rm -rf data && rm -rf public
npm run webpack

# recreate dist folder
rm -rf dist
mkdir dist

# generate sitemap
NODE_ENV=production node app apostrophe-site-map:map > public/sitemap.xml && tail -n +2 public/sitemap.xml > public/sitemap.xml.tmp && mv public/sitemap.xml.tmp public/sitemap.xml

# copy custom code, transpile it to ES5 and prettify it
rsync -a --exclude='**/.DS_Store' config dist
rsync -a --exclude='**/.DS_Store' --exclude='lib/modules/webpack-custom/' lib dist
rsync -a app.js dist
npx babel dist -d dist
npx prettier --write 'dist/**/*.js'

# copy other folders
rsync -a --exclude='**/.DS_Store' public dist
rsync -a --exclude='**/.DS_Store' nginx dist
rsync -a --exclude='**/.DS_Store' letsencrypt dist
rsync -a --exclude='**/.DS_Store' backup/uploads public
rsync -a robots.txt dist/public
