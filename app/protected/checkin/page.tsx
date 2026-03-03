"use client";

import { CustomCard } from "@/components/molecules/customcard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckinRule } from "@/prisma/generated/client";
import { useViewModel } from "./useViewModel";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash } from "lucide-react";

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

        <Button>Salvar regras</Button>
      </div>

      <div className="px-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-72">
            <Select
              value={selectedEventId}
              onValueChange={setManuallySelectedId}
            >
              <SelectTrigger>
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
            <Badge
              variant={
                selectedEvent.status === "ACTIVE" ? "default" : "secondary"
              }
            >
              {selectedEvent.status}
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {isLoadingCheckins ? (
            <div>
              <Label>Carregando...</Label>
            </div>
          ) : (
            <>
              {checkinRulesList?.map((checkinRule: CheckinRule) => (
                <Card
                  key={checkinRule.id}
                  className="flex flex-row justify-between"
                >
                  <CardHeader>
                    <Label className="text-lg font-semibold">
                      {checkinRule.type}
                    </Label>
                  </CardHeader>
                  <CardFooter className="flex flex-col gap-4">
                    {/* Linha dos ícones */}
                    <div className="flex w-full justify-end items-center gap-4">
                      <Switch />

                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="flex gap-12 text-sm text-muted-foreground">
                      <div className="flex flex-col gap-1">
                        <Label className="uppercase text-xs tracking-wide">
                          Abertura
                        </Label>
                        <Label className="font-medium text-foreground">
                          {checkinRule.startOffset} min antes
                        </Label>
                      </div>

                      <div className="flex flex-col gap-1">
                        <Label className="uppercase text-xs tracking-wide">
                          Encerramento
                        </Label>
                        <Label className="font-medium text-foreground">
                          {checkinRule.endOffset} min depois
                        </Label>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="px-8 pb-4">
        <CustomCard
          title="Resumo das regras"
          subtitle="Visão consolidada das regras configuradas"
        >
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {sections.map((section, index) => (
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
