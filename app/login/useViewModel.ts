"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useViewModel() {
  const { login, user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/protected/dashboard");
    }
  }, [user, authLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        form.setError("root", {
          message: json.error || "Credenciais inválidas. Tente novamente.",
        });
        return;
      }

      login(json);
    } catch (err) {
      form.setError("root", {
        message: "Falha ao conectar com o servidor. Verifique sua conexão.",
      });
    }
  };

  return { form, onSubmit };
}
