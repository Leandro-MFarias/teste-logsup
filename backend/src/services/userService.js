import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../types/authSchema.js";
import * as userModel from "../models/userModel.js";
import { Role } from "@prisma/client";

export async function createUser(data) {
  const { name, email, password } = registerSchema.parse(data);

  const existingUser = await userModel.findByEmail(email);
  if (existingUser) {
    const error = new Error("Esse email já foi cadastrado");
    error.status = 400;
    throw error;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
  });

  return user;
}

export async function signIn(data) {
  const { email, password } = loginSchema.parse(data);

  const user = await userModel.findByEmail(email);

  if (!user) {
    const error = new Error("Usuário não encontrado!");
    error.status = 400;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    const error = new Error("Senha incorreta.");
    error.status = 400;
    throw error;
  }

  return user;
}

export async function getInfoUser(userId) {
  const user = await userModel.getUser(userId);

  if (!user) {
    const error = new Error("Erro ao buscar informações");
    error.status = 400;
    throw error;
  }

  return user;
}

export async function listUsers() {
  const users = await userModel.listUsers();

  if (!users) {
    const error = new Error("ERRO ao buscar Usuários");
    error.status = 400;
    throw error;
  }

  return users;
}

export async function getRoles() {
  return Object.values(Role);
}

export async function updateUserRole(userId, role) {
  if (!Object.values(Role).includes(role)) {
    const error = new Error("Cargo inválido");
    error.status = 400;
    throw error;
  }

  try {
    await userModel.updateUserRole(userId, role);

    return { message: "Cargo atualizado!" };
  } catch (error) {
    error.status = error.status || 500;
    throw error;
  }
}
