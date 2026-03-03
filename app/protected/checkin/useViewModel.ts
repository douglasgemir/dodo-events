import { CheckinRule, Event } from "@/prisma/generated/client";
import { useEventCheckinRules } from "@/queries/events/useEventCheckinRules";
import { useEvents } from "@/queries/events/useEvents";
import { useState } from "react";
import {
  useCreateCheckinRule,
  useUpdateCheckinRule,
  useDeleteCheckinRule,
} from "@/queries/mutations/checkinRules";

export const useViewModel = () => {
  const { data: eventList, isLoading } = useEvents();

  const [manuallySelectedId, setManuallySelectedId] = useState<string>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRuleForEdit, setSelectedRuleForEdit] = useState<CheckinRule | null>(null);

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

  const createCheckinRule = useCreateCheckinRule();
  const updateCheckinRule = useUpdateCheckinRule();
  const deleteCheckinRule = useDeleteCheckinRule();

  function toggleMandatory(id: number, checked: boolean) {
    return updateCheckinRule.mutate({ id, data: { mandatory: checked } });
  }

  function removeRule(id: number) {
    return deleteCheckinRule.mutate(id);
  }

  function createRule(eventId: number, data: any) {
    return createCheckinRule.mutate({ eventId, data });
  }

  return {
    sections,
    isLoading,
    selectedEventId,
    setManuallySelectedId,
    eventList,
    selectedEvent,
    isLoadingCheckins,
    checkinRulesList,
    // mutations
    createCheckinRule,
    updateCheckinRule,
    deleteCheckinRule,
    toggleMandatory,
    removeRule,
    createRule,
    editModalOpen,
    setEditModalOpen,
    selectedRuleForEdit,
    setSelectedRuleForEdit,
  };
};
