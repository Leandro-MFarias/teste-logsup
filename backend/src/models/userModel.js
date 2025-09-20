import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } })
}

export const create = (data) => {
  return prisma.user.create({ data })
}