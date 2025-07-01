import { prisma } from "../prisma";
import { upsertTelegramChatIDInputs } from "../schemas/user-schema";

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

async function getUserByID(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
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

async function upsertTelegramChatID(
  input: upsertTelegramChatIDInputs,
  userId: string
) {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      telegram_chat_id: input.telegram_chat_id,
    },
  });

  return updatedUser;
}

export const userRepository = {
  getUsers,
  getUser,
  getUserByID,
  createUser,
  upsertTelegramChatID,
};
