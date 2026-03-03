import { useState } from "react";
import { useEvents } from "@/queries/events/useEvents";
import { useDeleteEvent } from "@/queries/mutations/events";

export function useViewModel() {
  const { data: eventList, isLoading } = useEvents();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  const eventNumber = eventList?.length ?? 0;

  const deleteMutation = useDeleteEvent();

  const handleDelete = () => {
    if (eventToDelete) {
      deleteMutation.mutate(eventToDelete, {
        onSuccess: () => setEventToDelete(null)
      });
    }
  };

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  return {
    eventList,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    eventToDelete,
    setEventToDelete,
    eventNumber,
    isDeleting: deleteMutation.isPending,
    handleDelete,
    handleEdit,
    handleCreate,
  };
}
