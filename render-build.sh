#!/usr/bin/env bash
# Exit on error
set -o errexit

npm install --production=false
npx prisma generate --schema=prisma/schema.prisma
npm run build
