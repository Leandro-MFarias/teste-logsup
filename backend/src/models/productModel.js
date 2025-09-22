import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = (data) => {
  return prisma.product.create({ data });
};

export const products = () => {
  return prisma.product.findMany({
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  })
}

export const deleteProduct = (productId) => {
  return prisma.product.delete({ where: {id: productId} })
}