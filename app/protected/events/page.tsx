"use client";

import { Label } from "@/components/ui/label";
import { useEvents } from "@/queries/events/useEvents";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Event } from "@/prisma/generated/client";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Events() {
  const { data: eventList, isLoading } = useEvents();

  const eventNumber = eventList?.length ?? 0;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center pl-8 pt-4">
        <Label className="text-4xl">Eventos</Label>
        <Label className="text-md pl-2 pt-2">
          {eventNumber} evento(s) cadastrado(s)
        </Label>
      </div>

      <div className="grid grid-cols-4 p-8 gap-6">
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          eventList?.map((event: Event) => (
            <Card key={event.id} className="p-0 rounded-2xl overflow-hidden">
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
                    <Label className="text-lg font-semibold">
                      {event.name}
                    </Label>
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

              <CardFooter className="flex justify-end pb-2 gap-2">
                <Button variant="outline">Editar</Button>
                <Button variant="destructive">Remover</Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
