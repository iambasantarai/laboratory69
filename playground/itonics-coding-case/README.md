# Fetch and store service

High level overview of this service is shown below:

```bash
┌───────────────────────┐
│fetch and store service│
└───────────────────────┘
            |
            |
    build initial URL
            |
            |
            v
     ┌────────────┐
     │send request|<--------------------o
     └────────────┘                     |
            |                           |
            |                           |
            v                           |
┌────────────────────┐                  |
│webz.io NewsAPI Lite│                  |
└────────────────────┘                  |
            |                           |
            |                           |
        api response                    |
    (extract data & metas)              |
            |                           |
            |                           |
            v                           |
   data serialization                   |
            |                           |
            |                           |
            v                           |
┌───────────────────┐                   |
│store to PostgreSQL│                   |
└───────────────────┘                   |
            |                           |
            |                           |
            v                           |
Check if moreResultsAvailable ----------o
```

##### Used Technologies

- [Typescript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [JEST](https://jestjs.io/docs/mock-function-api)

### Getting Started

### References

- [News API Lite](https://docs.webz.io/reference/news-api-lite)
- [Configuring Jest](https://jestjs.io/docs/configuration)
- [Mock Functions](https://jestjs.io/docs/mock-function-api)
- [Mocking Axios in Jest + Testing Async Functions](https://www.youtube.com/watch?v=9Yrd4aZkse8)
