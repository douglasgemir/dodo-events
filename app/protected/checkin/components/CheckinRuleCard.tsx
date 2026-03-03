import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { CheckinRule } from "@/prisma/generated/client";

interface CheckinRuleCardProps {
  checkinRule: CheckinRule;
  onToggleMandatory: (id: number, checked: boolean) => void;
  onEdit: (rule: CheckinRule) => void;
  onDelete: (id: number) => void;
}

export function CheckinRuleCard({
  checkinRule,
  onToggleMandatory,
  onEdit,
  onDelete,
}: CheckinRuleCardProps) {
  return (
    <Card className="flex flex-row justify-between">
      <CardHeader>
        <Label className="text-lg font-semibold">{checkinRule.type}</Label>
      </CardHeader>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex w-full justify-end items-center gap-4">
          <Switch
            checked={checkinRule.mandatory}
            onCheckedChange={(checked) =>
              onToggleMandatory(checkinRule.id as number, checked as boolean)
            }
          />

          <Button variant="ghost" size="icon" onClick={() => onEdit(checkinRule)}>
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (confirm("Tem certeza que deseja excluir?")) {
                onDelete(checkinRule.id as number);
              }
            }}
          >
            <Trash className="h-4 w-4 text-destructive" />
          </Button>
        </div>
        <div className="flex gap-12 text-sm text-muted-foreground">
          <div className="flex flex-col gap-1">
            <Label className="uppercase text-xs tracking-wide">Abertura</Label>
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
  );
}
