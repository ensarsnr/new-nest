// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create dummy users
  const user1 = await prisma.user.create({
    data: {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });


