// const { Pool } = require("pg");
const { PrismaClient } = require('@prisma/client');

// const db = new Pool({
//     connectionString:
//       process.env.DATABASE_URL ||
//       "postgresql://matthewbixby@localhost:5432/g1ecomm",
//   });

const prisma = new PrismaClient();

// async function query(sql, params, callback) {
//     return db.query(sql, params, callback);
//   }
  
  module.exports = { prisma };