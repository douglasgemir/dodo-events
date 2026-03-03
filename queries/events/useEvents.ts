"use client";
import { useQuery } from "@tanstack/react-query";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await fetch("/api/events");

      if (!res.ok) {
        throw new Error("Erro ao buscar eventos");
      }

      return res.json();
    },
  });
}
