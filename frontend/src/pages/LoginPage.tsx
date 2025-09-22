import { useLogin } from "@/hooks/userHooks";
import { loginSchema, type LoginSchema } from "@/types/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle, SquareArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleForm(data: LoginSchema) {
    try {
      await login(data);
      navigate("/list-products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", { message: error.response?.data.message });
      } else {
        setError("root", { message: "Erro inesperado." });
      }
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col items-center justify-center space-y-2">
      <h2 className="text-2xl font-bold tracking-wider text-lime-500">
        ACESSE SUA CONTA
      </h2>

      <form
        onSubmit={handleSubmit(handleForm)}
        className="w-[80%] space-y-5 rounded-md p-4"
      >
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="text-zinc-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            {...register("email")}
            className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
          />
          <p className="h-5 font-bold text-red-500/80">
            {errors.email?.message}
          </p>
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="password" className="text-zinc-300">
            Senha
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full rounded-sm border-2 border-zinc-400 px-2 py-3 text-zinc-400 outline-none"
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
            {errors.root?.message}
          </p>
        </div>

        {/* BUTTON SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full cursor-pointer items-center justify-center space-x-2 rounded-sm bg-lime-600 py-4 transition duration-150 ease-in hover:bg-lime-500"
        >
          <span className="font-semibold">
            {isSubmitting ? "ENTRANDO" : "ENTRAR"}
          </span>
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <SquareArrowRight className="transition duration-200 ease-in group-hover:translate-x-1" />
          )}
        </button>
      </form>

      {/* LINK */}
      <div className="flex w-full flex-col items-center space-y-4">
        <div className="h-[1px] w-[80%] bg-zinc-600" />
        <div className="flex items-center space-x-2">
          <p className="text-lg text-zinc-300">Primeira vez no site?</p>
          <Link to={"/register"}>
            <span className="font-bold text-lime-500 hover:text-lime-600">
              CADASTRE-SE
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
