"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { ParticipantFormModal } from "./components/ParticipantFormModal";
import { TransferEventModal } from "./components/TransferEventModal";
import { DeleteConfirmationModal } from "@/components/ui/DeleteConfirmationModal";
import { useViewModel } from "./useViewModel";
import { MembersTable } from "./components/MembersTable";

export default function Members() {
  const {
    searchTerm,
    setSearchTerm,
    isParticipantModalOpen,
    setParticipantModalOpen,
    selectedUserForEdit,
    isTransferModalOpen,
    setTransferModalOpen,
    selectedUserForTransfer,
    isLoading,
    isError,
    events,
    handleEdit,
    handleAddNew,
    handleTransfer,
    handleDelete,
    filteredUsers,
    usersCount,
    userToDelete,
    setUserToDelete,
    executeDelete,
    isDeleting,
  } = useViewModel();

  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-8 mb-8 gap-4">
        <div>
          <Label className="text-4xl font-bold tracking-tight">Participantes</Label>
          <Label className="text-md block pt-2 text-muted-foreground">
            Gerencie os {usersCount} participante(s) cadastrados na plataforma.
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Participante
          </Button>
        </div>
      </div>

      <div className="px-8 pb-8 flex-1">
        <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white h-full flex flex-col">
          <CardHeader className="border-b bg-gray-50/50 pb-4 pt-6 px-6">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email, evento ou regra..."
                  className="pl-9 bg-white border-gray-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex-1 overflow-auto">
            <MembersTable
              isLoading={isLoading}
              isError={isError}
              users={filteredUsers || []}
              searchTerm={searchTerm}
              onEdit={handleEdit}
              onTransfer={handleTransfer}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>

      <ParticipantFormModal
        isOpen={isParticipantModalOpen}
        onClose={() => setParticipantModalOpen(false)}
        user={selectedUserForEdit}
      />

      <TransferEventModal
        isOpen={isTransferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        user={selectedUserForTransfer}
        events={events || []}
      />

      <DeleteConfirmationModal
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={executeDelete}
        title="Excluir Participante"
        description="Deseja realmente excluir este participante? Os checkins vinculados também serão perdidos permanentemente."
        isLoading={isDeleting}
      />

    </div>
  );
}
