import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = (data) => {
  return prisma.product.create({ data });
};