"use client";

import { useViewModel } from "./useViewModel";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { form, onSubmit } = useViewModel();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hidden md:flex flex-col justify-center rounded-l-lg bg-blue-600 p-10 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta</h2>
          <p className="opacity-90">
            Acesse sua conta e gerencie eventos e check-ins de forma simples.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-8 shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Entrar</h1>

          {errors.root && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-3">
              <span>⚠️</span>
              <span>{errors.root.message}</span>
            </div>
          )}

          <div className="mb-4">
            <Label className="text-sm">Email</Label>
            <Input {...register("email")} placeholder="seu@exemplo.com" />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label className="text-sm">Senha</Label>
            <Input type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mt-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-blue-600 font-medium">
              Crie uma gratuita
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
