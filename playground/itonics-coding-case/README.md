# Coding case

The application is designed to fetch posts from the `Webz.io` API and store them in a database.
Below are current state/functionalities:

- Fetches 10 posts and other metas from initial request
- Saves posts to the database
- Extracts next from the meta and uses it to fetch next available posts
- Logs happening operations
- Docker file only builds the application
- Docker compose is only written to setup database

Currently I run it like a script, it just fetches data, serializes it and stores it to database. If we want to take user-supplied queries later, we could wrap it with an API.

#### TODOS:

- [ ] Simulate batching of 200 posts, current API only returns 10 per request
- [ ] Implement bulk posts insertions to offload DB write operations
- [ ] Write multi-staged docker file to reduce container size
- [ ] Update docker compose, wait for DB startup before starting application (use [wait-for](https://github.com/eficode/wait-for))
  - [ ] Once the DB is up and running, create migrations
  - [ ] When migrations is done, start application
- [ ] Make logs silent while testing

#### Used Technologies

- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [JEST](https://jestjs.io/docs/mock-function-api)

### Getting Started

- Clone the repository

  ```bash
  git clone https://github.com/iambasantarai/itonics-coding-case-task.git
  ```

- Change to the project directory

  ```bash
  cd itonics-coding-case-task
  ```

- Create and configure `.env`

  ```bash
  cp .env.example .env
  ```

- Install dependencies

  ```bash
  npm install
  ```

- Build the project

  ```bash
  npm run build
  ```

- Run the application

  ```bash
  npm run fetch-and-store
  ```

- Run tests

  ```bash
  npm run test
  ```

### References

- [webz.io - News API Lite](https://docs.webz.io/reference/news-api-lite)
- [Configuring Jest](https://jestjs.io/docs/configuration)
- [Mock Functions](https://jestjs.io/docs/mock-function-api)
- [Mocking Axios in Jest + Testing Async Functions](https://www.youtube.com/watch?v=9Yrd4aZkse8)
- [Builder](https://refactoring.guru/design-patterns/builder)
- [webz.io - GET Parameters](https://docs.webz.io/reference/get-parameters)
