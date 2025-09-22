import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

export const create = (data) => {
  return prisma.user.create({ data });
};

export const getUser = (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });
};

export const listUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
};

export const updateUserRole = (userId, role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role }
  })
}