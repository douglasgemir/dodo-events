import { useQuery } from "@tanstack/react-query";

export function useDashboardUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const resp = await fetch("/api/users");
      if (!resp.ok) throw new Error("Erro ao carregar usuários");
      return resp.json();
    },
  });
}

export function useDashboardCheckins() {
  return useQuery({
    queryKey: ["checkins"],
    queryFn: async () => {
      const resp = await fetch("/api/checkins");
      if (!resp.ok) throw new Error("Erro ao carregar check-ins");
      return resp.json();
    },
  });
}
