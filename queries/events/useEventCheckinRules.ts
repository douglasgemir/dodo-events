"use client";
import { useQuery } from "@tanstack/react-query";

export function useEventCheckinRules(eventId?: string) {
  return useQuery({
    queryKey: ["events", eventId, "checkin-rules"],
    queryFn: async () => {
      const res = await fetch(`/api/events/${eventId}/checkin-rules`);

      if (!res.ok) {
        throw new Error("Erro ao buscar regras desse evento");
      }

      return res.json();
    },
    enabled: !!eventId,
  });
}
