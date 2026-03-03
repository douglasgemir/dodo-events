"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckinRule, CheckinRuleType } from "@/prisma/generated/client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  useUpdateCheckinRule,
  useCreateCheckinRule,
} from "@/queries/mutations/checkinRules";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const RULE_TYPES = ["QR_CODE", "DOCUMENTO", "LISTA_IMPRESSA", "CONFIRMACAO_EMAIL"] as const;

const checkinRuleSchema = z.object({
  type: z.enum(RULE_TYPES),
  startOffset: z.preprocess((v) => Number(v), z.number().min(0, "Deve ser >= 0")),
  endOffset: z.preprocess((v) => Number(v), z.number().min(0, "Deve ser >= 0")),
  isActive: z.boolean(),
  mandatory: z.boolean(),
});

type CheckinRuleFormData = z.infer<typeof checkinRuleSchema>;

interface CheckinRuleEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  checkinRule: CheckinRule | null;
  eventId?: string;
  isCreating?: boolean;
  existingRules?: CheckinRule[];
}

export function CheckinRuleEditModal({
  isOpen,
  onOpenChange,
  checkinRule,
  eventId,
  isCreating = false,
  existingRules = [],
}: CheckinRuleEditModalProps) {
  const updateCheckinRule = useUpdateCheckinRule();
  const createCheckinRule = useCreateCheckinRule();
  const isLoading = updateCheckinRule.isPending || createCheckinRule.isPending;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<CheckinRuleFormData>({
    resolver: zodResolver(checkinRuleSchema) as any,
    defaultValues: {
      type: "QR_CODE",
      startOffset: 0,
      endOffset: 0,
      isActive: true,
      mandatory: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (isCreating) {
        reset({ type: "QR_CODE", startOffset: 0, endOffset: 0, isActive: true, mandatory: false });
      } else if (checkinRule) {
        reset({
          type: (checkinRule as any).type as CheckinRuleFormData["type"],
          startOffset: (checkinRule as any).startOffset ?? 0,
          endOffset: (checkinRule as any).endOffset ?? 0,
          isActive: (checkinRule as any).isActive ?? true,
          mandatory: (checkinRule as any).mandatory ?? false,
        });
      }
    }
  }, [isOpen, checkinRule, isCreating, reset]);

  const onSubmit = (data: CheckinRuleFormData) => {
    if (data.mandatory) {
      const newStart = -data.startOffset;
      const newEnd = data.endOffset;
      const conflict = existingRules
        .filter((r) => r.mandatory && r.id !== checkinRule?.id)
        .some((r) => {
          const s = -Number(r.startOffset ?? 0);
          const e = Number(r.endOffset ?? 0);
          return newStart <= e && newEnd >= s;
        });

      if (conflict) {
        setError("root", {
          message: "Não é possível cadastrar duas regras obrigatórias em intervalos que se sobrepõem.",
        });
        return;
      }
    }

    const payload = {
      type: data.type as CheckinRuleType,
      isActive: data.isActive,
      startOffset: data.startOffset,
      endOffset: data.endOffset,
      mandatory: data.mandatory,
    };

    if (isCreating && eventId) {
      createCheckinRule.mutate(
        { eventId: Number(eventId), data: payload as any },
        { onSuccess: () => onOpenChange(false) }
      );
    } else if (checkinRule) {
      updateCheckinRule.mutate(
        { id: checkinRule.id, data: payload as any },
        { onSuccess: () => onOpenChange(false) }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? "Nova Regra de Check-in" : "Editar Regra de Check-in"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {errors.root && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              <span>⚠️</span>
              <span>{errors.root.message}</span>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Regra</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QR_CODE">QR Code</SelectItem>
                    <SelectItem value="DOCUMENTO">Documento</SelectItem>
                    <SelectItem value="LISTA_IMPRESSA">Lista Impressa</SelectItem>
                    <SelectItem value="CONFIRMACAO_EMAIL">Confirmação Email</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="startOffset">Abertura (minutos antes)</Label>
            <Input id="startOffset" type="number" {...register("startOffset")} />
            {errors.startOffset && <p className="text-xs text-red-500">{errors.startOffset.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="endOffset">Encerramento (minutos depois)</Label>
            <Input id="endOffset" type="number" {...register("endOffset")} />
            {errors.endOffset && <p className="text-xs text-red-500">{errors.endOffset.message}</p>}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="isActive">Regra Ativa</Label>
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <Switch id="isActive" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="mandatory">Obrigatório</Label>
            <Controller
              name="mandatory"
              control={control}
              render={({ field }) => (
                <Switch id="mandatory" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
