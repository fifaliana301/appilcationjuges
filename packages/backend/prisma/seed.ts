import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const saltUsers = 10;
const bcrypt = require('bcrypt');

async function main() {
  const requestAdmin = {
    username: "Admin",
    password: "password",
    email: "admin@unique.com",
    admins: {
      create: {
        role: "SUPER_ADMIN"
      }
    }
  } as any;

  const newPassword = await bcrypt.hash(requestAdmin.password, saltUsers);
  const response: any = await prisma.users.create({
    data: {
      ...requestAdmin,
      password: newPassword
    },
    include: {
      admins: true,
    },
  });

  console.log(`admin username: ${response.username} / password: ${requestAdmin.password} is create`)
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
