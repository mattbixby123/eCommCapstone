const { Pool } = require("pg");
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const db = new Pool({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://matthewbixby@localhost:5432/g1ecomm",
  });

const prisma = new PrismaClient();
// .$extends({
//     query: {
//       customer: {
//         async create({ model, operation, args, query}) {
//           args.data =  {...args.data, password: bcrypt.hashSync(args.data.password, Number(process.env.SALT_ROUNDS))};
//           return query(args);
//         }
//       }
//     }
//   });

async function query(sql, params, callback) {
    return db.query(sql, params, callback);
  }
  
  module.exports = { prisma };