import { prisma } from "../prisma";

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function getUser(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}

async function createUser(email: string, hash: string) {
  const createdUser = await prisma.user.create({
    data: {
      email: email,
      password: hash,
      name: "random",
    },
  });
  return createdUser;
}

export const userRepository = {
  getUsers,
  getUser,
  createUser,
};
