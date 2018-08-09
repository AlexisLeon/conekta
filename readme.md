# Lab Conekta Wallet

## Requirements

  - Node.js
  - Yarn
  - Mysql

## Installation
  - Clone the project: `git clone https://github.com/AlexisLeon/conekta.git lab_conekta_wallet`
  - Install dependencies: `cd lab_conekta_wallet && yarn install`
  - Create mysql `conektadev` database
  - Set mysql credentials in `src/config/config.json` or add them as environment variables

## Run
  - Start server: `yarn run dev`
  - Start server: `yarn run dev`
  - Test: `yarn test`

## Other commands
  - Production: `yarn start`
  - Staging: `yarn run stage`
  - Development: `yarn run stage`
  - Test: `yarn test`
  - Sync DB: `yarn run db:sync`

## Environment variables
  - `PORT`: Service port
  - `MYSQL_DATABASE`: If you want to use a custom database name (default to `conektadev`)
  - `MYSQL_USER`: MySQL user
  - `MYSQL_PASSWORD`: MySQL password

#### Production (required)
  - `PORT`: Service port (AWS E2C/Elastic Beanstalk)
  - `RDS_DB_NAME`: AWS RDS DB Name
  - `RDS_USERNAME`: AWS RDS Username
  - `RDS_PASSWORD`: AWS RDS Password
  - `RDS_HOSTNAME`: AWS RDS Hostname
  - `RDS_PORT`: AWS RDS Port
