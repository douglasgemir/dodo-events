"use client";

import { useViewModel } from "./useViewModel";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const { form, onSubmit } = useViewModel();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hidden md:flex flex-col justify-center rounded-l-lg bg-green-600 p-10 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Crie sua conta</h2>
          <p className="opacity-90">
            Comece a gerenciar seus eventos e check-ins em poucos passos.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg p-8 shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Cadastro</h1>

          {errors.root && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-3">
              <span>⚠️</span>
              <span>{errors.root.message}</span>
            </div>
          )}

          <div className="mb-3">
            <Label className="text-sm">Nome</Label>
            <Input {...register("name")} placeholder="Seu nome" />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <Label className="text-sm">Email</Label>
            <Input {...register("email")} placeholder="seu@exemplo.com" />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <Label className="text-sm">Senha</Label>
            <Input type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label className="text-sm">Confirme a senha</Label>
            <Input type="password" {...register("confirm")} placeholder="••••••••" />
            {errors.confirm && (
              <p className="text-xs text-red-500 mt-1">{errors.confirm.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Criando..." : "Criar conta"}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link href="/login" className="text-blue-600 font-medium">
              Entrar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
