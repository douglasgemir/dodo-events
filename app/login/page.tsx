"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/protected/dashboard");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const json = await res.json();
      setError(json.error || "Erro ao entrar");
      return;
    }

    const userData = await res.json();
    login(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hidden md:flex flex-col justify-center rounded-l-lg bg-blue-600 p-10 text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo de volta</h2>
          <p className="opacity-90">
            Acesse sua conta e gerencie eventos e check-ins de forma simples.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-8 shadow-md"
        >
          <h1 className="text-2xl font-semibold mb-4">Entrar</h1>
          {error && (
            <div className="text-sm text-destructive mb-2">{error}</div>
          )}

          <div className="mb-4">
            <Label className="text-sm">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@exemplo.com"
            />
          </div>

          <div className="mb-4">
            <Label className="text-sm">Senha</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between gap-4 mt-6">
            <Button type="submit" className="w-full">
              Entrar
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
