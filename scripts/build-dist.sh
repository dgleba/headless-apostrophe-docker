#!/bin/bash

# recreate dist folder
rm -rf dist
mkdir dist

# copy custom code, transpile it to ES6 and prettify it
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

# build docker image
docker-compose build

echo Docker ready