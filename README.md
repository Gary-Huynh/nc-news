# Gary-Huynh's nc-news-api

This project is used to simulate a news website with functionality such as bringing up articles, browsing comments, looking for users, adding/changing/deleting articles, comments, topics and includes a voting system for both articles and comments.

## Link to hosted site

https://nc-news-8ykn.onrender.com/api/articles/?p=3

## Installation
First fork the repository then clone the project into your local machine and install the required dependencies.

### To run this project with full functionality including testing you will need to install the following:

PSQL - https://www.postgresql.org/download/

dotenv - https://www.npmjs.com/package/dotenv

express - https://www.npmjs.com/package/express

node-postgres -  https://www.npmjs.com/package/pg

jest - https://www.npmjs.com/package/jest

jest-sorted - https://www.npmjs.com/package/jest-sorted

pg-format - https://www.npmjs.com/package/pg-format

supertest - https://www.npmjs.com/package/supertest

husky - https://www.npmjs.com/package/husky


## Usage

### For initial setup after installing required dependencies please do the following

Create the proper environment files in the root including:

.env.development

.env.production

.env.test


Each environment should contain the appropriate paths, for example "PGDATABASE=nc_news"

Now run the following commands:

npm run setup-dbs

npm run seed

npm run seed-prod (will be required if you wish to host on a live server/database)

after please run npm test to check whether all functionality is working as intended

The endpoints.json file should give a brief overview of working endpoints and their functionality 

### Recommended minimum Postgres 14.7 and Node.js 19.8.1 

