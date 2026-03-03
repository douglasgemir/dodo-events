import { CheckinRule, Event } from "@/prisma/generated/client";
import { useEventCheckinRules } from "@/queries/events/useEventCheckinRules";
import { useEvents } from "@/queries/events/useEvents";
import { useState } from "react";

export const useViewModel = () => {
  const { data: eventList, isLoading } = useEvents();

  const [manuallySelectedId, setManuallySelectedId] = useState<string>();

  const selectedEventId = manuallySelectedId ?? eventList?.[0]?.id;

  const { data: checkinRulesList, isLoading: isLoadingCheckins } =
    useEventCheckinRules(selectedEventId);

  const totalRules = checkinRulesList?.length;
  const activeRules = 5;

  const requiredRules = checkinRulesList?.reduce(
    (count: number, rule: CheckinRule) => {
      return rule.mandatory == true ? count + 1 : count;
    },
    0,
  );

  const sections = [
    { title: "TOTAL DE REGRAS", value: totalRules },
    { title: "ATIVAS", value: activeRules },
    { title: "OBRIGATÓRIAS ATIVAS", value: requiredRules },
  ];

  const selectedEvent = eventList?.find(
    (event: Event) => event.id === selectedEventId,
  );

  return {
    sections,
    isLoading,
    selectedEventId,
    setManuallySelectedId,
    eventList,
    selectedEvent,
    isLoadingCheckins,
    checkinRulesList,
  };
};
