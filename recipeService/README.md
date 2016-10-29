# crave-ms-users
a crave microservice for users

## Overview
Performs the create/read/update/delete (CRUD) operations on a user resource as well as fascilitate user logins

## Quick Start
`npm install && npm run dev`

## Commands
* `npm run dev`: transpile es6 -> es5 and handle live changes via [nodemon](http://nodemon.io/) and enable debugging via [node-inspector](http://127.0.0.1:8080/?port=5858) 
* `npm run start`: transpile es6 -> es5 and start the application 
* `npm run test`: *coming soon*
* `npm run lint:dev`: cache the results in a `.eslintcache` file so that only changed files are checked  
* `npm run lint:prod`: lint files without results being cached 
* `npm run docker:build`: builds your Docker image. [Docker](https://www.docker.com/) is a dependency for this command.

## Configuration
You will most likely want to configure your mongo connection string differenctly per environment that you are in. Instead of hard-coding this, you are able to simply modify the configuration files found in `/config`. Read the [mongodb-uri](https://www.npmjs.com/package/mongodb-uri) README to understand how configure more complex connection strings.

## API
#### Documentation
View the API documentation by dragging and dropping the `swagger.json` file(s) onto the [swagger editor](http://editor.swagger.io/#/). You can also find the swagger documentation at the `/doc` api route as well.

## Docker
A `Dockerfile` and `.dockerignore` are included that can be used to run this application in a docker container. The base image is [alpine](https://alpinelinux.org/) and is `326.8MB`

## Release History

Date      |Version   |Name
----------|----------|-----------------
10/11/16  | 1.0.0    | Frank B Greco Jr