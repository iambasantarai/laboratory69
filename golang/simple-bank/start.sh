#!/bin/sh

# Exit script immediately if the command returns non zero status
set -e

echo "run db migration"
/app/migrate -path /app/migration -database "${DB_SOURCE}" -verbose up

echo "start the app"
exec "$@"
