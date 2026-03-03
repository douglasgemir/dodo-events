import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSaveUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const method = data.id ? "PUT" : "POST";
      const url = data.id ? `/api/users/${data.id}` : "/api/users";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro ao salvar participante");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir participante");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      console.error("Não foi possível excluir o participante.");
    },
  });
}

export function useManageEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { action: "enroll" | "transfer", userId: string; newEventId: string; currentCheckinId?: string }) => {
      // 1. Fetch destination event to get a checkinRuleId
      const eventRes = await fetch(`/api/events/${data.newEventId}`);
      if (!eventRes.ok) throw new Error("Evento de destino não encontrado.");
      const eventData = await eventRes.json();
      
      if (!eventData.checkinRules || eventData.checkinRules.length === 0) {
        throw new Error("O evento de destino não possui regras de check-in configuradas.");
      }
      const firstRuleId = eventData.checkinRules[0].id;

      let res;
      if (data.action === "transfer" && data.currentCheckinId) {
        // Transfer (PUT existing checkin)
        res = await fetch(`/api/checkins/${data.currentCheckinId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId: Number(data.newEventId),
            checkinRuleId: firstRuleId,
          }),
        });
      } else {
        // Enroll (POST new checkin)
        res = await fetch(`/api/checkins`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: Number(data.userId),
            eventId: Number(data.newEventId),
            checkinRuleId: firstRuleId
          }),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Erro ao gerenciar inscrição do participante.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      console.error("Manage Enrollment Error:", error);
    },
  });
}
