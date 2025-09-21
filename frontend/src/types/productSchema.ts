import z4 from "zod/v4";

export const productSchema = z4.object({
  name: z4.string().min(2, "Campo obrigatório"),
  description: z4.string().min(2, "Campo obrigatório"),
  price: z4.transform(Number).pipe(z4.number()),
  stock: z4.number().min(1, "Estoque mínimo é 1"),
});

export type ProductSchema = z4.infer<typeof productSchema>;