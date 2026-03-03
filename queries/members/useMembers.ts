import { useQuery } from "@tanstack/react-query";

export function useMembers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}
