import bcrypt from "bcryptjs";
import { userRepository } from "../db/user-repository";
import { SALTROUNDS } from "../constants";

async function login(email: string, password: string) {
  const user = await userRepository.getUser(email);
  return user;
}

async function singUp(email: string, password: string) {
  bcrypt.hash(password, SALTROUNDS, async (err, hash) => {
    if (err || !hash) {
      throw err;
    } else {
      await userRepository.createUser(email, hash);
    }
  });
}

export const authService = {
  login,
  singUp,
};
