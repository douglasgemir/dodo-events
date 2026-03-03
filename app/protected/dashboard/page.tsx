"use client";

import { CustomCard } from "@/components/molecules/customcard";
import { Label } from "@/components/ui/label";
import { InfoCardList } from "./components/infoCardList";
import { EventListCard } from "./components/eventListCard";
import { CheckListCard } from "./components/checkListCard";
import { Calendar, Users, CheckCircle, TrendingUp } from "lucide-react";
import { useEvents } from "@/queries/events/useEvents";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: events } = useEvents();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Erro ao buscar usuarios");
      return res.json();
    },
  });

  const { data: checkins } = useQuery({
    queryKey: ["checkins"],
    queryFn: async () => {
      const res = await fetch("/api/checkins");
      if (!res.ok) throw new Error("Erro ao buscar checkins");
      return res.json();
    },
  });

  const totalEvents = events?.length ?? 0;
  const activeEvents = events
    ? events.filter((e: any) => new Date(e.endDate) > new Date()).length
    : 0;

  const totalParticipants = users?.length ?? 0;
  const totalCheckins = checkins?.length ?? 0;
  const checkinRate = totalParticipants
    ? Math.round((totalCheckins / totalParticipants) * 100)
    : 0;

  const infos = [
    {
      type: "Total de eventos",
      data: String(totalEvents),
      info: `${activeEvents} Ativos`,
      icon: Calendar,
    },
    {
      type: "Participantes",
      data: String(totalParticipants),
      info: "Cadastrados no sistema",
      icon: Users,
    },
    {
      type: "Check-ins realizados",
      data: String(totalCheckins),
      info: "nos ultimos eventos",
      icon: CheckCircle,
    },
    {
      type: "Taxa de check-ins",
      data: `${checkinRate}%`,
      info: "Participantes confirmados",
      icon: TrendingUp,
    },
  ];

  const today = new Date();

  // Prefer events that start in the future; fall back to most recent events if none
  let upcomingEvent = (events ?? [])
    .slice()
    .sort(
      (a: any, b: any) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )
    .filter((e: any) => new Date(e.startDate) >= today)
    .slice(0, 10)
    .map((e: any) => ({
      name: e.name,
      placement: e.placement,
      date: new Date(e.startDate).toLocaleDateString(),
      time: new Date(e.startDate).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

  if (!upcomingEvent.length) {
    upcomingEvent = (events ?? [])
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      )
      .slice(0, 10)
      .map((e: any) => ({
        name: e.name,
        placement: e.placement,
        date: new Date(e.startDate).toLocaleDateString(),
        time: new Date(e.startDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
  }

  const recentCheckins = (checkins ?? [])
    .slice()
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 10)
    .map((c: any) => ({
      personName: c.user?.name ?? "-",
      placement: c.event?.name ?? c.event?.placement ?? "-",
      creationDate: new Date(c.createdAt).toLocaleString(),
    }));

  return (
    <div className="w-full h-full grid lg:grid-rows-12 md:grid-cols-1 space-y-4">
      <div className="text-center row-span-1 pl-8 pt-4">
        <Label className="text-4xl">Dashboard</Label>
        <Label className="text-md pl-2 pt-2">
          Visao geral do seu painel de eventos
        </Label>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-1 lg:row-span-3 pt-6 pb-4 pl-8 pr-8 gap-8">
        <InfoCardList itemList={infos} />
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 lg:row-span-10 p-8 gap-8">
        <EventListCard upcomingEvent={upcomingEvent} />
        <CheckListCard checkinList={recentCheckins} />
      </div>
    </div>
  );
}
