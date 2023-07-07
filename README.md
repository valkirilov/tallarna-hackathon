# Toy Meta-Model Hackathon

## Description

We recently participated in a one-day hackathon with our colleagues, and our main objective was to create a proof-of-concept (POC) for a toy meta-model of a system. This meta-model is designed to facilitate the creation of digital twins and enable simulations.

In this repository, you will find the work I have done on this task. I have developed a simple Nest.js application that serves as the foundation for our meta-model. This application allows us to define and store the necessary data in a database.

To help with the initial setup and demonstration of the meta-model, I have included a few seed scripts. These scripts populate the database with example data for a Computer meta-model, showcasing the various components and systems involved.

Additionally, I have created scripts that fetch the stored data and construct the output of the meta-model. This allows us to visualize and interact with the meta-model, gaining insights and running simulations on the digital twins.

Feel free to explore the repository and leverage our work to further enhance the capabilities of the meta-model. We hope that this POC serves as a stepping stone towards more advanced systems modeling and simulation endeavors.

## Installation

```bash
$ docker-compose up
$
$ nvm use
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Scripts

### Create a new migration

```
npx typeorm migration:create ./src/migrations/CreateUsersTable
```

### Run migrations

```bash
$ npm run db:migrate:run
$ npm run db:migrate:revert
$ npm run db:migrate:drop
$ npm run db:migrate:reset
```
