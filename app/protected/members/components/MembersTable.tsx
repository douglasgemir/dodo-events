import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { User as UserIcon, AlertTriangle } from "lucide-react";
import { MemberTableRow } from "./MemberTableRow";

interface MembersTableProps {
  isLoading: boolean;
  isError: boolean;
  users: any[];
  searchTerm: string;
  onEdit: (user: any) => void;
  onTransfer: (user: any) => void;
  onDelete: (id: string) => void;
}

export function MembersTable({
  isLoading,
  isError,
  users,
  searchTerm,
  onEdit,
  onTransfer,
  onDelete,
}: MembersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent bg-gray-50/80 border-b-gray-100">
          <TableHead className="w-[350px] pl-6 font-semibold text-gray-600">
            Participante
          </TableHead>
          <TableHead className="font-semibold text-gray-600 w-[250px]">Contato</TableHead>
          <TableHead className="font-semibold text-gray-600">Eventos (Check-ins)</TableHead>
          <TableHead className="font-semibold text-gray-600">Cadastro</TableHead>
          <TableHead className="text-right pr-6 font-semibold text-gray-600">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={`skeleton-member-${index}`} className="border-b-gray-50">
              <TableCell className="pl-6 py-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[180px]" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[120px] rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[120px]" />
              </TableCell>
              <TableCell className="text-right pr-6">
                <Skeleton className="h-8 w-8 rounded-md ml-auto" />
              </TableCell>
            </TableRow>
          ))
        ) : isError ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center h-[400px]">
              <div className="flex flex-col items-center justify-center gap-3 text-red-500">
                <AlertTriangle className="h-8 w-8 mb-2" />
                <p className="font-semibold">Erro ao carregar participantes</p>
                <p className="text-sm text-red-400">Tente atualizar a página mais tarde.</p>
              </div>
            </TableCell>
          </TableRow>
        ) : users?.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center h-[400px] text-muted-foreground"
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900">Nenhum participante encontrado</p>
                <p className="text-sm text-gray-500 max-w-sm">
                  {searchTerm 
                    ? "Não encontramos participantes para essa busca." 
                    : "Adicione um novo participante para começar."}
                </p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          users?.map((user: any) => (
            <MemberTableRow 
              key={user.id} 
              user={user} 
              onEdit={onEdit} 
              onTransfer={onTransfer} 
              onDelete={onDelete} 
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}
