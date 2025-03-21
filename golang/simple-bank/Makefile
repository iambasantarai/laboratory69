DB_URL=postgresql://postgres:postgres@localhost/simple_bank?sslmode=disable

postgres:
	docker run --name postgres --network bank-network -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -d postgres:16-alpine

start-postgres:
	docker container start postgres

createdb:
	docker exec -it postgres createdb --username=postgres --owner=postgres simple_bank

dropdb:
	docker exec -it postgres dropdb --username=postgres simple_bank

migrateup:
	migrate -path db/migration -database "$(DB_URL)" -verbose up

migrateup1:
	migrate -path db/migration -database "$(DB_URL)" -verbose up 1

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down

migratedown1:
	migrate -path db/migration -database "$(DB_URL)" -verbose down 1

sqlc:
	sqlc generate

db-docs:
	dbdocs build docs/db.dbml --password 007@dbml

db-schema:
	dbml2sql --postgres docs/db.dbml -o docs/schema.sql

test:
	go test -v -cover ./... 

server:
	go run main.go

mock:
	mockgen -package mockdb -destination db/mock/store.go simple-bank/db/sqlc Store

.PHONY: postgres start-postgres createdb dropdb migrateup migrateup1 migratedown migratedown1 sqlc test server mock db-docs db-schema
