import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useManageEnrollment } from "@/queries/mutations/members";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface TransferEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
  events: any[]; // All events
}

export function TransferEventModal({ isOpen, onClose, user, events }: TransferEventModalProps) {
  const queryClient = useQueryClient();
  const [selectedCheckinId, setSelectedCheckinId] = useState<string>("");
  const [destinationEventId, setDestinationEventId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

  const userCheckins = user?.checkins || [];
  
  // Available events to transfer to (not currently enrolled)
  const availableEvents = events?.filter(
    (ev) => !userCheckins.some((c: any) => c.eventId === ev.id)
  ) || [];

  useEffect(() => {
    if (isOpen) {
      if (userCheckins.length === 0) {
        setSelectedCheckinId("new");
      } else {
        setSelectedCheckinId("");
      }
      setDestinationEventId("");
      setErrorMsg("");
    }
  }, [isOpen, user]);

  const manageMutation = useManageEnrollment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = selectedCheckinId === "new" ? "enroll" : "transfer";

    manageMutation.mutate(
      { 
        action,
        userId: user?.id?.toString(), 
        newEventId: destinationEventId,
        currentCheckinId: action === "transfer" ? selectedCheckinId : undefined
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerenciar Inscrição</DialogTitle>
          <DialogDescription>
            Adicione ou transfira a inscrição de <b>{user?.name}</b>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Ação / Inscrição Atual</Label>
            <Select value={selectedCheckinId} onValueChange={setSelectedCheckinId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o que deseja fazer..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Nova Inscrição (Adicionar Evento)</SelectItem>
                {userCheckins.map((c: any) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    Transferir de: {c.event?.name || `Evento #${c.eventId}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Evento de Destino</Label>
            <Select value={destinationEventId} onValueChange={setDestinationEventId} disabled={!selectedCheckinId || availableEvents.length === 0}>
              <SelectTrigger>
                <SelectValue placeholder={availableEvents.length === 0 ? "Nenhum evento disponível..." : "Selecione o evento..."} />
              </SelectTrigger>
              <SelectContent>
                {availableEvents.map((ev: any) => {
                  const hasRules = ev.checkinRules && ev.checkinRules.length > 0;
                  return (
                    <SelectItem key={ev.id} value={ev.id.toString()} disabled={!hasRules}>
                      {ev.name} {!hasRules && "(Sem regras de check-in)"}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm">{errorMsg}</p>
          )}

          {manageMutation.isError && (
            <p className="text-red-500 text-sm">
              Erro: {manageMutation.error?.message}
            </p>
          )}

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={manageMutation.isPending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={manageMutation.isPending || !selectedCheckinId || !destinationEventId}>
              {manageMutation.isPending ? "Processando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
