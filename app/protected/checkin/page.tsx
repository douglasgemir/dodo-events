"use client";

import { CustomCard } from "@/components/molecules/customcard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckinRuleEditModal } from "./components/CheckinRuleEditModal";
import { CheckinRuleCard } from "./components/CheckinRuleCard";
import { CheckinRuleCardSkeleton } from "./components/CheckinRuleCardSkeleton";
import { useViewModel } from "./useViewModel";
import { Plus } from "lucide-react";

type Event = {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  startOffset: number;
  endOffset: number;
};

export default function Checkin() {
  const {
    sections,
    isLoading,
    selectedEventId,
    setManuallySelectedId,
    eventList,
    selectedEvent,
    isLoadingCheckins,
    checkinRulesList,
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
  } = useViewModel();

  if (isLoading) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex justify-between items-center px-8 pt-4">
        <div>
          <Label className="text-4xl">Configuração de Check-in</Label>
          <Label className="text-md block pt-2 text-muted-foreground">
            Gerencie as regras de validação de check-in por evento
          </Label>
        </div>
      </div>

      <div className="px-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="w-72">
            <Select
              value={selectedEventId}
              onValueChange={setManuallySelectedId}
            >
              <SelectTrigger className="bg-blue-50 border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {eventList.map((event: Event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEvent && (
            <>
              <Badge
                variant={
                  selectedEvent.status === "ACTIVE" ? "default" : "secondary"
                }
                className="p-2"
              >
                {selectedEvent.status}
              </Badge>

              <Button
                onClick={() => {
                  setSelectedRuleForEdit(null);
                  setEditModalOpen(true);
                }}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Nova Regra
              </Button>
            </>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {isLoadingCheckins ? (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <CheckinRuleCardSkeleton key={i} />
              ))}
            </>
          ) : checkinRulesList?.length === 0 && selectedEventId ? (
            <div className="text-center py-12 flex flex-col items-center justify-center space-y-3 bg-white/50 border border-dashed rounded-xl">
              <Label className="text-lg font-medium text-muted-foreground cursor-pointer">Nenhuma regra cadastrada</Label>
              <Label className="text-sm text-muted-foreground w-full cursor-pointer">
                Crie uma nova regra de check-in para este evento clicando no botão "Nova Regra" acima.
              </Label>
            </div>
          ) : (
            <>
              {checkinRulesList?.map((checkinRule: any) => (
                <CheckinRuleCard
                  key={checkinRule.id}
                  checkinRule={checkinRule}
                  onToggleMandatory={toggleMandatory}
                  onEdit={(rule) => {
                    setSelectedRuleForEdit(rule);
                    setEditModalOpen(true);
                  }}
                  onDelete={removeRule}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <CheckinRuleEditModal
        isOpen={editModalOpen}
        onOpenChange={setEditModalOpen}
        checkinRule={selectedRuleForEdit}
        eventId={selectedEventId}
        isCreating={selectedRuleForEdit === null}
        existingRules={checkinRulesList}
      />

      <div className="px-8 pb-4">
        <CustomCard
          title="Resumo das regras"
          subtitle="Visão consolidada das regras configuradas"
        >
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {sections.map((section: any, index: number) => (
              <CustomCard
                key={index}
                title={section.title}
                rootStyle="bg-gray-100"
              >
                <div className="flex items-center justify-center ">
                  <Label className="text-3xl font-bold">{section.value}</Label>
                </div>
              </CustomCard>
            ))}
          </div>
        </CustomCard>
      </div>
    </div>
  );
}
