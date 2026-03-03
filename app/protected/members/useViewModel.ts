import { useState } from "react";
import { useMembers } from "@/queries/members/useMembers";
import { useDeleteUser } from "@/queries/mutations/members";
import { useEvents } from "@/queries/events/useEvents";

export function useViewModel() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals state
  const [isParticipantModalOpen, setParticipantModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<any>(null);

  const [isTransferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedUserForTransfer, setSelectedUserForTransfer] = useState<any>(null);

  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const { data: users, isLoading, isError } = useMembers();

  const { data: events } = useEvents();

  const handleEdit = (user: any) => {
    setSelectedUserForEdit(user);
    setParticipantModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUserForEdit(null);
    setParticipantModalOpen(true);
  };

  const handleTransfer = (user: any) => {
    setSelectedUserForTransfer(user);
    setTransferModalOpen(true);
  };

  const deleteMutation = useDeleteUser();

  const handleDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete, {
        onSuccess: () => setUserToDelete(null)
      });
    }
  };

  const confirmDelete = (userId: string) => {
    setUserToDelete(userId);
  };

  // Filter 
  const filteredUsers = users?.filter((user: any) => {
    const term = searchTerm.toLowerCase();
    const matchName = user.name?.toLowerCase().includes(term);
    const matchEmail = user.email?.toLowerCase().includes(term);
    
    // Also matched if they are enrolled in an event that matches the search
    const matchEvent = user.checkins?.some((c: any) => 
      c.event?.name?.toLowerCase().includes(term) || 
      c.checkinRule?.type?.toLowerCase().includes(term)
    );

    return matchName || matchEmail || matchEvent;
  });

  const usersCount = filteredUsers?.length ?? 0;

  return {
    searchTerm,
    setSearchTerm,
    isParticipantModalOpen,
    setParticipantModalOpen,
    selectedUserForEdit,
    isTransferModalOpen,
    setTransferModalOpen,
    selectedUserForTransfer,
    users,
    isLoading,
    isError,
    events,
    handleEdit,
    handleAddNew,
    handleTransfer,
    handleDelete: confirmDelete,
    executeDelete: handleDelete,
    userToDelete,
    setUserToDelete,
    isDeleting: deleteMutation.isPending,
    filteredUsers,
    usersCount,
  };
}
