"use client";

import { CustomCard } from "@/components/molecules/customcard";
import { Label } from "@/components/ui/label";
import { InfoCardList } from "./components/infoCardList";
import { EventListCard } from "./components/eventListCard";
import { CheckListCard } from "./components/checkListCard";
import { useViewModel } from "./useViewModel";

export default function Dashboard() {
  const { infos, upcomingEvent, recentCheckins, isLoading } = useViewModel();

  return (
    <div className="w-full h-full grid lg:grid-rows-12 md:grid-cols-1 space-y-4">
      <div className="text-center row-span-1 pl-8 pt-4">
        <Label className="text-4xl">Dashboard</Label>
        <Label className="text-md pl-2 pt-2">
          Visao geral do seu painel de eventos
        </Label>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-1 lg:row-span-3 pt-6 pb-4 pl-8 pr-8 gap-8">
        <InfoCardList itemList={infos} isLoading={isLoading} />
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:row-span-10 p-8 gap-8">
        <EventListCard upcomingEvent={upcomingEvent} isLoading={isLoading} />
        <CheckListCard checkinList={recentCheckins} isLoading={isLoading} />
      </div>
    </div>
  );
}
