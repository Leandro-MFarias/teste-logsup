import z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Campo obrigatório"),
  description: z.string().min(1, "Campo obrigatório"),
  price: z.number().min(1, "Campo obrigatório"),
  stock: z.number().int().min(1, "Campo obrigatório"),
});
