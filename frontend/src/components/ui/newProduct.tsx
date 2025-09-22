import { Controller, useForm } from "react-hook-form";
import { productSchema, type ProductSchema } from "@/types/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { MoneyInput } from "./moneyInput";
import { useNewProduct } from "@/services/product";
import axios from "axios";

export function NewProduct() {
  const { mutateAsync: createProduct } = useNewProduct();
  const navigete = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      stock: 1,
      description: "",
      name: "",
    },
  });

  async function handleForm(data: ProductSchema) {
    try {
      const result = await createProduct(data);

      toast.success(`${result.message}`);
      navigete("/list-products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="flex w-full flex-col items-center justify-center pr-10"
    >
      <div className="w-[60%] space-y-4">
        {/* NAME */}
        <div className="min-w-full space-y-1">
          <label className="block">Nome do Produto</label>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded-sm border-2 border-zinc-400 px-2 py-2 text-zinc-300 outline-none"
          />
          <p className="h-5 pl-2 font-bold text-red-500/80">
            {errors.name?.message}
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="block">Descrição</label>
          <textarea
            {...register("description")}
            className="max-h-[80px] w-full rounded-sm border-2 border-zinc-400 px-2 pt-1 text-zinc-300 outline-none md:max-h-[200px] md:min-h-[200px]"
          />
          <p className="h-5 pl-2 font-bold text-red-500/80">
            {errors.description?.message}
          </p>
        </div>

        {/* PRICE AND STOCK */}
        <div className="flex space-x-4">
          <div className="w-full space-y-1">
            <label className="block">Preço</label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <MoneyInput
                  onValueChange={(values) => field.onChange(values.value)}
                  className="w-full rounded-sm border-2 border-zinc-400 px-2 py-2 text-zinc-300 outline-none"
                />
              )}
            />
            <p className="h-5 pl-2 font-bold text-red-500/80">
              {errors.price?.message}
            </p>
          </div>

          <div className="space-y-1">
            <label className="block">Stock</label>
            <input
              type="number"
              min={1}
              {...register("stock", { valueAsNumber: true })}
              className="w-full rounded-sm border-2 border-zinc-400 px-2 py-2 font-bold text-white outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center space-x-4 rounded-md bg-lime-600 py-3 text-lg font-bold transition duration-150 ease-in hover:bg-lime-500"
          disabled={isSubmitting}
        >
          <p>{isSubmitting ? "Adicionando.." : "Adicionar"}</p>
          <LoaderCircle
            className={`${isSubmitting ? "block animate-spin" : "hidden"}`}
          />
        </button>
      </div>
    </form>
  );
}
