import { useEvents } from "@/queries/events/useEvents";
import { useDashboardUsers, useDashboardCheckins } from "@/queries/dashboard/useDashboard";
import { Calendar, Users, CheckCircle, TrendingUp } from "lucide-react";

export function useViewModel() {
  const { data: events, isLoading: isEventsLoading } = useEvents();

  const { data: users, isLoading: isUsersLoading } = useDashboardUsers();
  const { data: checkins, isLoading: isCheckinsLoading } = useDashboardCheckins();

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

  const isLoading = isEventsLoading || isUsersLoading || isCheckinsLoading;

  return {
    infos,
    upcomingEvent,
    recentCheckins,
    isLoading
  };
}
