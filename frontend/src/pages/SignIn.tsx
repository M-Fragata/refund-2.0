import { useActionState } from "react";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";

import { api } from "../services/api";

import { Input } from "../components/Input";
import { Button } from "../components/Button";


const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().trim().min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(onSignIn, {
    email: "",
    password: ""
  });


  async function onSignIn(prevState: any, formData: FormData) {

    try {

      const data = signInSchema.parse({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      
      const response = await api.post("/sessions", data);

      console.log(response.data)

    } catch (error) {

      console.error(error);

      if (error instanceof ZodError) {
        return {message: error.issues[0].message}
      } else if (error instanceof AxiosError) {
        return {message: error.response?.data.message || "Ocorreu um erro inesperado. Tente novamente."}
      } else {
        return {message: "Ocorreu um erro inesperado. Tente novamente."}
      }

    }

  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
      />
      <Input
        name="password"
        required
        legend="Senha"
        type="password"
        placeholder="123456"

      />

      <p className="text-red-500 text-sm">{state?.message}</p>

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
