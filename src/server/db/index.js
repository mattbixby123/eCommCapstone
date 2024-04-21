const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient().$extends({
    query: {
        customer: {
            async create({ model, operation, args, query }) {
                args.data = {...args.data, password: bcrypt.hashSync(args.data.password, Number(process.env.SALT_ROUNDS))};
                return query(args)
            }
        }
    }
});

// async function query(sql, params, callback) {
//     return db.query(sql, params, callback);
//   }
  
  module.exports = { prisma }; 