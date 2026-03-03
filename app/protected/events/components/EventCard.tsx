import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Calendar, MapPin, Ticket, Pencil, Trash } from "lucide-react";
import { Event } from "@/prisma/generated/client";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <Card className="p-0 rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={event.imageUrl ?? "/default-event-image.jpg"}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-muted-foreground" />
            <Label className="text-lg font-semibold">{event.name}</Label>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm text-muted-foreground">
              {event.name}
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Label className="text-sm">
              {new Date(event.startDate).toLocaleString()}
            </Label>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end pb-4 gap-2">
        <Button variant="outline" onClick={() => onEdit(event)}>
          <Pencil className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(event.id)}>
          <Trash className="w-4 h-4 mr-2" />
          Remover
        </Button>
      </CardFooter>
    </Card>
  );
}
