"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useViewModel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Preencha todos os campos");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não conferem");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Erro ao cadastrar. Tente novamente.");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Falha ao conectar com o servidor. Verifique sua conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirm, setConfirm,
    error,
    isLoading,
    handleSubmit,
  };
}
