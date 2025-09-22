import { useRegister } from "@/services/user";
import { type RegisterSchema, registerSchema } from "@/types/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle, SquareArrowRight } from "lucide-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: createAccount } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function handleForm(data: RegisterSchema) {
    try {
      await createAccount(data);
      navigate("/list-products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", { message: error.response?.data.message });
      } else {
        setError("root", { message: "ERRO inesperado." });
      }
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col items-center justify-center space-y-2">
      <h2 className="text-2xl font-bold tracking-wider text-lime-500">
        Criar conta
      </h2>

      <form
        onSubmit={handleSubmit(handleForm)}
        className="w-[80%] space-y-3 rounded-md p-4"
      >
        {/* name */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="text-zinc-300">
            Nome Completo
          </label>
          <input
            type="text"
            id="fullname"
            {...register("fullname")}
            placeholder="Coloque nome e sobrenome"
            className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
          />
          <p className="h-5 font-bold text-red-500/80">
            {errors.fullname?.message}
          </p>
        </div>

        {/* EMAIL */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="text-zinc-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
          />
          <p className="h-5 font-bold text-red-500/80">
            {errors.email?.message}
          </p>
        </div>

        {/* PASSWORD */}
        <div className="flex justify-between gap-2">
          <div className="flex w-full flex-col space-y-1.5">
            <label htmlFor="password" className="text-zinc-300">
              Senha
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                {...register("password")}
                className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 pr-10 text-zinc-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-4"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <p className="h-5 font-bold text-red-500/80">
              {errors.password?.message}
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex w-full flex-col space-y-1.5">
            <label htmlFor="confirm" className="text-zinc-300">
              Confirme sua Senha
            </label>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="confirm"
                {...register("confirm")}
                className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 pr-10 text-zinc-400 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-4"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            <p className="h-5 font-bold text-red-500/80">
              {errors.confirm?.message}
            </p>
          </div>
        </div>

        {/* BUTTON SUBMIT */}
        <div className="space-y-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full cursor-pointer items-center justify-center space-x-2 rounded-sm bg-lime-600 py-4 transition duration-150 ease-in hover:bg-lime-500"
          >
            <span className="font-semibold">
              {isSubmitting ? "Criando.." : "Criar"}
            </span>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <SquareArrowRight className="transition duration-200 ease-in group-hover:translate-x-1" />
            )}
          </button>
          <p className="mb-1 h-5 font-bold text-red-500/80">
            {errors.root?.message}
          </p>
        </div>
      </form>

      {/* LINK */}
      <div className="flex w-full flex-col items-center space-y-4">
        <div className="h-[1px] w-[80%] bg-zinc-600" />
        <div className="flex items-center space-x-2">
          <p className="text-lg text-zinc-300">Já possui uma conta?</p>
          <Link to={"/"}>
            <span className="font-bold text-lime-500 hover:text-lime-600">
              ENTRAR
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
