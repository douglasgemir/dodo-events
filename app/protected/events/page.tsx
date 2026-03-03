"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Event } from "@/prisma/generated/client";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash } from "lucide-react";
import { EventFormModal } from "./components/EventFormModal";
import { EventCard } from "./components/EventCard";
import { EventCardSkeleton } from "./components/EventCardSkeleton";
import { DeleteConfirmationModal } from "@/components/ui/DeleteConfirmationModal";
import { useViewModel } from "./useViewModel";

export default function Events() {
  const {
    eventList,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    eventToDelete,
    setEventToDelete,
    eventNumber,
    isDeleting,
    handleDelete,
    handleEdit,
    handleCreate,
  } = useViewModel();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center pl-8 pr-8 pt-4">
        <div>
          <Label className="text-4xl">Eventos</Label>
          <Label className="text-md pl-2 pt-2 block text-muted-foreground">
            {eventNumber} evento(s) cadastrado(s)
          </Label>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-4 p-8 gap-6">
        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <EventCardSkeleton key={`skeleton-event-${i}`} />
            ))}
          </>
        ) : (
          eventList?.map((event: any) => (
            <EventCard 
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={setEventToDelete}
            />
          ))
        )}
      </div>

      <EventFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventToEdit={selectedEvent}
      />

      <DeleteConfirmationModal
        isOpen={eventToDelete !== null}
        onClose={() => setEventToDelete(null)}
        onConfirm={handleDelete}
        title="Excluir Evento"
        description="Tem certeza que deseja excluir permanentemente este evento e todos os participantes e regras de check-in atrelados a ele?"
        isLoading={isDeleting}
      />
    </div>
  );
}
