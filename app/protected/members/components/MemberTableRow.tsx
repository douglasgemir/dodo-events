import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const getInitials = (name: string) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

interface MemberTableRowProps {
  user: any;
  onEdit: (user: any) => void;
  onTransfer: (user: any) => void;
  onDelete: (id: string) => void;
}

export function MemberTableRow({ user, onEdit, onTransfer, onDelete }: MemberTableRowProps) {
  return (
    <TableRow className="border-b-gray-50 hover:bg-gray-50/50 transition-colors">
      <TableCell className="pl-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shadow-sm ring-1 ring-blue-50">
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">{user.name}</span>
            <span className="text-xs text-gray-500">ID: #{user.id.toString().padStart(4, "0")}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1 text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-sm truncate w-48" title={user.email}>{user.email}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          {user.checkins && user.checkins.length > 0 ? (
            <span className="text-sm text-gray-700 font-medium">
              {user.checkins.length} evento(s)
            </span>
          ) : (
            <span className="text-sm text-gray-400 italic">Sem eventos</span>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-sm">
            {new Date(user.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-right pr-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 data-[state=open]:bg-gray-100">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(user)}>Editar dados</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => onTransfer(user)}>Transferir/Gerenciar</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700" onClick={() => onDelete(user.id.toString())}>
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
