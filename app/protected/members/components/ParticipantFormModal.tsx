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
import { useSaveUser } from "@/queries/mutations/members";

interface ParticipantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
}

export function ParticipantFormModal({ isOpen, onClose, user }: ParticipantFormModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [user, isOpen]);

  const saveMutation = useSaveUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body: any = { name, email };
    if (password) body.password = password;
    else if (!user) body.password = "123456"; // default on creation
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {user ? "Nova Senha (opcional)" : "Senha (padrão: 123456)"}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </div>

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
