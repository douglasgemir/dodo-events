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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSaveEvent } from "@/queries/mutations/events";

const eventSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  placement: z.string().min(2, "Local deve ter ao menos 2 caracteres"),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  endDate: z.string().min(1, "Data de fim é obrigatória"),
}).refine((d) => new Date(d.endDate) > new Date(d.startDate), {
  message: "Data de fim deve ser após a data de início",
  path: ["endDate"],
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: any | null;
}

export function EventFormModal({ isOpen, onClose, eventToEdit }: EventFormModalProps) {
  const saveMutation = useSaveEvent();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { name: "", placement: "", startDate: "", endDate: "" },
  });

  useEffect(() => {
    if (isOpen) {
      if (eventToEdit) {
        const sDate = new Date(eventToEdit.startDate);
        sDate.setMinutes(sDate.getMinutes() - sDate.getTimezoneOffset());
        const eDate = new Date(eventToEdit.endDate);
        eDate.setMinutes(eDate.getMinutes() - eDate.getTimezoneOffset());
        reset({
          name: eventToEdit.name || "",
          placement: eventToEdit.placement || "",
          startDate: sDate.toISOString().slice(0, 16),
          endDate: eDate.toISOString().slice(0, 16),
        });
      } else {
        reset({ name: "", placement: "", startDate: "", endDate: "" });
      }
    }
  }, [eventToEdit, isOpen, reset]);

  const onSubmit = (data: EventFormData) => {
    saveMutation.mutate(
      {
        id: eventToEdit?.id,
        name: data.name,
        placement: data.placement,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Evento</Label>
            <Input id="name" {...register("name")} placeholder="Ex: Workshop de React" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="placement">Local</Label>
            <Input id="placement" {...register("placement")} placeholder="Ex: Sala 1, Prédio Principal..." />
            {errors.placement && <p className="text-xs text-red-500">{errors.placement.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data e Hora de Início</Label>
              <Input id="startDate" type="datetime-local" {...register("startDate")} />
              {errors.startDate && <p className="text-xs text-red-500">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data e Hora de Fim</Label>
              <Input id="endDate" type="datetime-local" {...register("endDate")} />
              {errors.endDate && <p className="text-xs text-red-500">{errors.endDate.message}</p>}
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
