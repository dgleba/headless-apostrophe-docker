#!/bin/bash

# recreate dist folder
rm -rf dist
mkdir dist

# copy custom code, transpile it to ES6 and prettify it
rsync -a --exclude='**/.DS_Store' config dist
rsync -a --exclude='**/.DS_Store' lib dist
rsync -a app.js dist
npx babel dist -d dist
npx prettier --write 'dist/**/*.js'

# copy other folders
rsync -a --exclude='**/.DS_Store' public dist
rsync -a --exclude='**/.DS_Store' scripts dist

# build docker image
docker-compose build

echo Docker ready