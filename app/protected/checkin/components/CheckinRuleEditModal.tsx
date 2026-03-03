"use client";

import { useState, useEffect } from "react";
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
  const [formData, setFormData] = useState<Partial<CheckinRule> | null>(null);
  const updateCheckinRule = useUpdateCheckinRule();
  const createCheckinRule = useCreateCheckinRule();

  const isLoading = updateCheckinRule.isPending || createCheckinRule.isPending;

  // Effect para preencher formData quando o modal abre
  useEffect(() => {
    if (isOpen) {
      if (isCreating && eventId) {
        // Nova regra
        setFormData({
          type: "QR_CODE",
          startOffset: 0,
          endOffset: 0,
          isActive: true,
          mandatory: false,
        });
      } else if (checkinRule) {
        // Editar regra existente
        setFormData(checkinRule);
      }
    }
  }, [isOpen, checkinRule, isCreating, eventId]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormData(null);
    }
    onOpenChange(open);
  };

  const handleSave = () => {
    if (!formData) return;
    setErrorMessage(null); // Clear errors before validating

    if (formData.mandatory) {
      // Validate overlapping rules
      const newStart = Number(formData.startOffset ?? 0);
      const newEnd = Number(formData.endOffset ?? 0);

      const conflict = existingRules
        .filter((r) => r.mandatory && r.id !== checkinRule?.id) // Exclude current rule if editing
        .some((r) => {
          const s = Number(r.startOffset ?? 0);
          const e = Number(r.endOffset ?? 0);
          
          // Two intervals overlap if (StartA <= EndB) and (EndA >= StartB)
          // To calculate time: Event is T=0.
          // Rule starts at T - startOffset, and ends at T + endOffset
          // Therefore, Start = -startOffset, End = endOffset
          const currentStart = -newStart;
          const currentEnd = newEnd;
          
          const existingStart = -s;
          const existingEnd = e;

          return currentStart <= existingEnd && currentEnd >= existingStart;
        });

      if (conflict) {
        setErrorMessage(
          "Não é possível cadastrar duas regras obrigatórias em intervalos que se sobrepõem.",
        );
        return;
      }
    }

    if (isCreating && eventId) {
      // Criar nova regra
      createCheckinRule.mutate(
        {
          eventId: Number(eventId),
          data: {
            type: formData.type,
            isActive: formData.isActive,
            startOffset: formData.startOffset,
            endOffset: formData.endOffset,
            mandatory: formData.mandatory,
          },
        },
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    } else if (checkinRule) {
      // Atualizar regra existente
      updateCheckinRule.mutate(
        {
          id: checkinRule.id,
          data: {
            type: formData.type,
            isActive: formData.isActive,
            startOffset: formData.startOffset,
            endOffset: formData.endOffset,
            mandatory: formData.mandatory,
          },
        },
        {
          onSuccess: () => {
            handleOpenChange(false);
          },
        },
      );
    }
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isCreating ? "Nova Regra de Check-in" : "Editar Regra de Check-in"}
          </DialogTitle>
        </DialogHeader>

        {formData && (
          <div className="grid gap-4 py-4">
            {errorMessage && (
              <div className="text-sm text-destructive">{errorMessage}</div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Regra</Label>
              <Select
                value={formData.type || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value as CheckinRuleType })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="QR_CODE">QR Code</SelectItem>
                  <SelectItem value="DOCUMENTO">Documento</SelectItem>
                  <SelectItem value="LISTA_IMPRESSA">Lista Impressa</SelectItem>
                  <SelectItem value="CONFIRMACAO_EMAIL">
                    Confirmação Email
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="startOffset">Abertura (minutos antes)</Label>
              <Input
                id="startOffset"
                type="number"
                value={formData.startOffset || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startOffset: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endOffset">Encerramento (minutos depois)</Label>
              <Input
                id="endOffset"
                type="number"
                value={formData.endOffset || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endOffset: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="isActive">Regra Ativa</Label>
              <Switch
                id="isActive"
                checked={formData.isActive || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="mandatory">Obrigatório</Label>
              <Switch
                id="mandatory"
                checked={formData.mandatory || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, mandatory: checked })
                }
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading || !formData}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
