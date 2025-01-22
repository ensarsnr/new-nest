// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Önce mevcut kullanıcıları temizle
  await prisma.user.deleteMany({});

  // create dummy users
  const user1 = await prisma.user.create({
    data: {
      username: 'admin',
      password: 'admin'
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'Ayşe Demir',
      password: 'sifre456'
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


