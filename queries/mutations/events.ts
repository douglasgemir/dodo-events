import { useMutation, useQueryClient } from "@tanstack/react-query";
// Removed useToast

export function useSaveEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const method = data.id ? "PUT" : "POST";
      const url = data.id ? `/api/events/${data.id}` : "/api/events";

      const savePayload = {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        imageUrl: data.imageUrl,
        status: data.status ?? "ACTIVE",
        placement: data.placement ?? "FRONT",
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savePayload),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar evento");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: () => {
      console.error("Ocorreu um erro ao salvar o evento.");
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir o evento");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: () => {
      console.error("Não foi possível excluir o evento. Tente novamente.");
    },
  });
}
