#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
SQL_FILE="$SCRIPT_DIR/seed-demo-products.sql"

DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_NAME="${DB_NAME:-muscleyn}"
DB_USER="${DB_USER:-root}"
DB_PASSWORD="${DB_PASSWORD:-2g+bO+JwovPk}"

echo "Seeding demo products into ${DB_NAME} at ${DB_HOST}:${DB_PORT}..."

MYSQL_PWD="$DB_PASSWORD" mysql \
  -h "$DB_HOST" \
  -P "$DB_PORT" \
  -u "$DB_USER" \
  "$DB_NAME" \
  < "$SQL_FILE"

echo "Demo product seed complete."
