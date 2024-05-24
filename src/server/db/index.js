const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

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
  
  module.exports = { prisma }; 