# Setup

- Run `npm install`
- Run `npx prisma generate --schema=src/adapters/prisma/schema.prisma` to create the Prisma client
- Copy `env.example` to `.env` providing your values
  - Make sure you have a MongoDB server with a replica set deployment, it's required by Prisma

# Run locally

- Run `npm run dev:watch` to start a live server with nodemon

# Tests

- Run `npm run test`

# To Do

- Open gRPC entrypoints for future services that will communicate with it
- Solve the `TODO` tags letf around the code



