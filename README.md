# Headless Apostrophe with Docker

Run 'docker-compose up' for production in Docker
Run 'docker-compose -f docker-compose-dev.yml up' for development in Docker

'docker-compose ps' for running instances.
'docker-compose stop'
'docker-compose build' to rebuild image
'docker run -ti siteperso_falkodev-site bash' to log into the container

Save local database: mongodump --db site --out ~/site_perso/backup/db/atest/
Restore in container:
* 'docker-compose build' to get attachments
* 'docker-compose up' to have containers running
* (remote) cd /opt/stagecoach/apps/site/current/ && docker run --rm --link falkodev-site-db:mongo --net siteperso_default -v $(pwd)/backup/db/latest/site/:/dump mongo bash -c 'mongorestore -d site /dump --host mongo:27017 --drop'

favicons: npx real-favicon generate ./favicons/faviconDescription.json ./favicons/faviconData.json ./favicons/output