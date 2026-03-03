import { CheckinRule } from "@/prisma/generated/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCheckinRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, data }: { eventId: number; data: any }) => {
      const res = await fetch(`/api/events/${eventId}/checkin-rules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar regra");
      }

      return res.json();
    },

    onSuccess: (_, variables) => {
      // try to invalidate list for the event if we can
      queryClient.invalidateQueries({
        queryKey: ["checkin-rules", variables?.eventId ?? undefined],
      });
      queryClient.invalidateQueries({ queryKey: ["checkin-rules"] });
    },
  });
}

export function useUpdateCheckinRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await fetch(`/api/checkin-rules/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar regra");
      }

      return res.json();
    },

    onSuccess: (_, variables) => {
      // if we updated a rule for an event, invalidate that event key
      queryClient.invalidateQueries({
        queryKey: ["checkin-rules", variables?.eventId ?? undefined],
      });
      queryClient.invalidateQueries({ queryKey: ["checkin-rules"] });
    },
  });
}

export function useDeleteCheckinRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/checkin-rules/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao deletar regra");
      }

      return res.json();
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["checkin-rules", variables?.eventId ?? undefined],
      });
      queryClient.invalidateQueries({ queryKey: ["checkin-rules"] });
    },
  });
}
