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
npm install prisma --save-dev
```

```
npx prisma init ( dont need to do )
```

5. Migrate table data - review the prisma/schema.prisma (PSL file) & migrate the tables to your local 'g1econn' db

```
npx prisma migrate dev --name init
```

6. Install and generate Prisma Client

```
npm install @prisma/client
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
