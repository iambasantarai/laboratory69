## Guides

### mysql

Run the following command to start the MySQL container:

```bash
docker-compose -f mysql.yml up -d
```

### postgres

Run the following command to start the PostgreSQL container:

```bash
docker-compose -f postgresql.yml up -d
```

To access the PostgreSQL container and enter the PostgreSQL command-line interface, use the following commands:

```bash
docker exec -it pgdb bash
su postgres
psql
```

### redis

Run the following command to start the Redis container:

```bash
docker-compose -f redis.yml up -d
```

Connect to `redis` using `redis-cli`

```bash
redis-cli -h localhost -p 6379 -a root
```
