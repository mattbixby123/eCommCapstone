# 🚀 Group 1 - eComm Capstone

A template for building web applications using the PERN (PostgreSQL, Express.js, React, Node.js) stack.

## 🏁 Getting Started

1. Install packages

```bash
npm i
```

2. Add a `.env` file with your secret value for auth

```
JWT_SECRET='somesecretvalue'
SALT_ROUNDS
DATABASE_URL='postgresql://USER:PASSWORD@HOST:PORT/g1ecomm'
etc.
```

3. Create the database

```bash
createdb g1ecomm
```

4. install prisma

```
npm install prisma --save-dev ( this step happens automatically upon initial npm i because it was already in the package.json)
```

```
npx prisma init ( this step is only needed for the first person to set up the prisma on the project )
```

5. Migrate table data - review the prisma/schema.prisma (PSL file) & migrate the tables to your local 'g1econn' db

```
npx prisma migrate dev --name init (npx prisma migrate dev --name "name" after init)
```

6. Install and generate Prisma Client

```
npm install @prisma/client ( this is installed automatically upon migrating )
```

7. Start the server

```bash
npm run dev
```

8. Open your browser at `http://localhost:3000`

<!-- 9. Seed the database
```bash
npm run seed
``` -->
