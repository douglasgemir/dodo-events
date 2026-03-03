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
import { useSaveUser } from "@/queries/mutations/members";

const participantSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().optional(),
});

type ParticipantFormData = z.infer<typeof participantSchema>;

interface ParticipantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
}

export function ParticipantFormModal({ isOpen, onClose, user }: ParticipantFormModalProps) {
  const saveMutation = useSaveUser();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ParticipantFormData>({
    resolver: zodResolver(participantSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
      });
    }
  }, [user, isOpen, reset]);

  const onSubmit = (data: ParticipantFormData) => {
    const body: any = { name: data.name, email: data.email };
    if (data.password) body.password = data.password;
    else if (!user) body.password = "123456";
    if (user) body.id = user.id;

    saveMutation.mutate(body, { onSuccess: onClose });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Editar Participante" : "Novo Participante"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Modifique os dados do participante abaixo."
              : "Preencha os dados básicos para adicionar um novo participante."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" {...register("name")} placeholder="Digite o nome..." />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="exemplo@email.com" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {user ? "Nova Senha (opcional)" : "Senha (padrão: 123456)"}
            </Label>
            <Input id="password" type="password" {...register("password")} placeholder="******" />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {saveMutation.isError && (
            <div className="text-sm text-red-500">Erro: {(saveMutation.error as any)?.message}</div>
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
