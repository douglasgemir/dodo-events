import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useSaveEvent } from "@/queries/mutations/events";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: any | null;
}

export function EventFormModal({ isOpen, onClose, eventToEdit }: EventFormModalProps) {
  const [name, setName] = useState("");
  const [placement, setPlacement] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name || "");
      setPlacement(eventToEdit.placement || "");
      
      const sDate = new Date(eventToEdit.startDate);
      sDate.setMinutes(sDate.getMinutes() - sDate.getTimezoneOffset());
      setStartDate(sDate.toISOString().slice(0, 16));

      const eDate = new Date(eventToEdit.endDate);
      eDate.setMinutes(eDate.getMinutes() - eDate.getTimezoneOffset());
      setEndDate(eDate.toISOString().slice(0, 16));
    } else {
      setName("");
      setPlacement("");
      setStartDate("");
      setEndDate("");
    }
  }, [eventToEdit, isOpen]);

  const saveMutation = useSaveEvent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(
      {
        id: eventToEdit?.id,
        name,
        placement,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        status: "ACTIVE",
      },
      { onSuccess: onClose }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{eventToEdit ? "Editar Evento" : "Novo Evento"}</DialogTitle>
          <DialogDescription>
            {eventToEdit
              ? "Modifique os detalhes do evento."
              : "Preencha os dados abaixo para cadastrar um novo evento na plataforma."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Evento</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Workshop de React"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="placement">Local</Label>
            <Input
              id="placement"
              required
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              placeholder="Ex: Sala 1, Prédio Principal..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data e Hora de Início</Label>
              <Input
                id="startDate"
                type="datetime-local"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Data e Hora de Fim</Label>
              <Input
                id="endDate"
                type="datetime-local"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {saveMutation.isError && (
             <div className="text-sm text-red-500">Erro: {saveMutation.error.message}</div>
          )}

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={saveMutation.isPending}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
