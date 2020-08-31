# Menu Builder API

Menu Builder is an app for putting together menus and generating shopping lists. This API supports the frontend by managing all entities and computing shopping lists, etc.

## Running Locally

**Requirements**

- Node (v14.3.0)
- Yarn
- MySQL

**Setup**

- Create a new database
- Create a `.env` file based on the `.env.example` file which contains the env vars for running locally
- Install the dependencies - `yarn`

**Running**

- If it's the first time running the app or you have made database chances, set the synchronise value in `/src/utils/initialise.ts` to `true`. This will create and/or update the database tables.
- Start the app - `yarn start`

**Testing**

- Create a test database
- Create a `.env.test` file based on the `.env.example` file which contains the env vars for running in test
- Run the test suite - `yarn test`
- To generate the test coverage report - `yarn test:coverage`
