const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { prisma } = require("../db");


async function main() {
  // creating the 3 categories (not random)
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
  // creating the 1000 random products with a random category assigned from the 3 created
  const product = Array.from({ length: 1000 }).map(() => ({
    name: faker.commerce.productName(),
    desc: faker.commerce.productDescription(),
    imageUrl: faker.image.urlPicsumPhotos(),
    SKU: faker.commerce.isbn(),
    inventory: faker.number.int({ min: 1, max: 5 }),
    price: faker.commerce.price({ min: 3, max: 500 }),
    categoryId: faker.number.int({ min: 1, max: 3 })

  }))
  // creating 10 random customers with hashed passwords
  const customer = await Promise.all(Array.from({ length: 10 }).map(async () => {
    const passwordHash = await bcrypt.hash(faker.internet.password(), Number(process.env.SALT_ROUNDS));
    return prisma.customer.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: passwordHash,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        imageUrl: faker.image.avatar(),
        addressLine1: faker.location.streetAddress(),
        addressLine2: faker.location.buildingNumber(),
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
      },
    });
  }));
// I reworked the customer faker seed function to include password hashing for the seeded users.

// In this case, using create inside a loop works because you're generating unique data for each user, 
// which is not possible with createMany without additional logic to ensure uniqueness. 
// The loop allows us to perform the asynchronous operations (like hashing passwords),
// for each user before inserting them into the database. 

// This approach is necessary when you need to perform operations 
// that depend on the result of previous operations,
// such as generating a unique password hash for each user.

  

  // await prisma.customer.createMany({data: customer}); // dont need this line with the updated customer code above

  
  await prisma.product.createMany({data: product});
}

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
