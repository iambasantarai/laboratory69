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

### Getting Started

### References

- [News API Lite](https://docs.webz.io/reference/news-api-lite)
