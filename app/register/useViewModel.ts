"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
    confirm: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas não conferem",
    path: ["confirm"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export function useViewModel() {
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirm: "" },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
      });

      const json = await res.json();

      if (!res.ok) {
        form.setError("root", {
          message: json.error || "Erro ao cadastrar. Tente novamente.",
        });
        return;
      }

      router.push("/login");
    } catch (err) {
      form.setError("root", {
        message: "Falha ao conectar com o servidor. Verifique sua conexão.",
      });
    }
  };

  return { form, onSubmit };
}
