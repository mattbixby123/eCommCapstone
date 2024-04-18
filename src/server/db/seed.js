const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
// require ("dotenv").config();
const { prisma } = require("../db");
// const db = require('./client');
// const { createUser } = require('./users');

async function main() {
  // const allCustomers = await prisma.customer.findMany();
  // console.log(allCustomers);

  await prisma.productCategory.createMany({
    data: [
      {name: "Comics",
      desc: "Vintage comic books and graphic novels from multiple publishers and artists."},
      {name: "Books",
      desc: "Novels, Non-fiction, Memoirs, and anthologies."},
      {name: "Magazines",
      desc: "Vintage architectural, fashion, encyclopaedia, and, research"}
    ]
  })

  const product = Array.from({ length: 1000 }).map(() => ({
    name: faker.commerce.productName(),
    desc: faker.commerce.productDescription(),
    imageUrl: faker.image.urlPicsumPhotos(),
    SKU: faker.commerce.isbn(),
    categoryId: faker.number.int({ min: 1, max: 3})
  }))

  const customer = Array.from({ length: 10 }).map(() => ({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    imageUrl: faker.image.avatar(),
    addressLine1: faker.location.streetAddress(),
    addressLine2: faker.location.buildingNumber(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  }));


  

  await prisma.customer.createMany({data: customer});
  await prisma.product.createMany({data: product});
}

// const users = [
//   {
//     name: 'Emily Johnson',
//     email: 'emily@example.com',
//     password: 'securepass',
//   },
//   {
//     name: 'Liu Wei',
//     email: 'liu@example.com',
//     password: 'strongpass',
//   },
//   {
//     name: 'Isabella García',
//     email: 'bella@example.com',
//     password: 'pass1234',
//   },
//   {
//     name: 'Mohammed Ahmed',
//     email: 'mohammed@example.com',
//     password: 'mysecretpassword',
//   },
//   {
//     name: 'John Smith',
//     email: 'john@example.com',
//     password: 'password123',
//   },
//   // Add more user objects as needed
// ];  

// const dropTables = async () => {
//     try {
//         await db.query(`
//         DROP TABLE IF EXISTS users;
//         `)
//     }
//     catch(err) {
//         throw err;
//     }
// }

// const createTables = async () => {
//     try{
//         await db.query(`
//         CREATE TABLE users(
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) DEFAULT 'name',
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL
//         )`)
//     }
//     catch(err) {
//         throw err;
//     }
// }

// const insertUsers = async () => {
//   try {
//     for (const user of users) {
//       await createUser({name: user.name, email: user.email, password: user.password});
//     }
//     console.log('Seed data inserted successfully.');
//   } catch (error) {
//     console.error('Error inserting seed data:', error);
//   }
// };

// const seedDatabse = async () => {
//     try {
//         db.connect();
//         await dropTables();
//         await createTables();
//         await insertUsers();
//     }
//     catch (err) {
//         throw err;
//     }
//     finally {
//         db.end()
//     }
// }

// seedDatabse()


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  module.exports = { main };
