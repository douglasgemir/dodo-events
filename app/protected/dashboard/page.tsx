import { CustomCard } from "@/components/molecules/customcard";
import { Label } from "@/components/ui/label";
import { InfoCardList } from "./components/infoCardList";
import { EventListCard } from "./components/eventListCard";
import { CheckListCard } from "./components/checkListCard";
import { Calendar, Users, CheckCircle, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const infos = [
    {
      type: "Total de eventos",
      data: "6",
      info: "3 Ativos",
      icon: Calendar,
    },
    {
      type: "Participantes",
      data: "10",
      info: "Cadastrados no sistema",
      icon: Users,
    },
    {
      type: "Check-ins realizados",
      data: "5",
      info: "nos ultimos eventos",
      icon: CheckCircle,
    },
    {
      type: "Taxa de check-ins",
      data: "50%",
      info: "Participantes confirmados",
      icon: TrendingUp,
    },
  ];

  const upcomingEvent = [
    {
      name: "Tech Conference 2026",
      placement: "São Paulo - SP",
      date: "2026-04-15",
      time: "09:00",
    },
    {
      name: "Workshop de React",
      placement: "Rio de Janeiro - RJ",
      date: "2026-04-20",
      time: "14:00",
    },
    {
      name: "Startup Meetup",
      placement: "Belo Horizonte - MG",
      date: "2026-05-02",
      time: "19:00",
    },
    {
      name: "Marketing Summit",
      placement: "Curitiba - PR",
      date: "2026-05-10",
      time: "10:30",
    },
    {
      name: "UX/UI Experience",
      placement: "Florianópolis - SC",
      date: "2026-05-18",
      time: "08:45",
    },
    {
      name: "DevOps Days",
      placement: "Porto Alegre - RS",
      date: "2026-06-01",
      time: "13:00",
    },
    {
      name: "AI & Data Forum",
      placement: "Recife - PE",
      date: "2026-06-12",
      time: "11:15",
    },
    {
      name: "Cyber Security Expo",
      placement: "Brasília - DF",
      date: "2026-06-22",
      time: "16:00",
    },
    {
      name: "Product Management Day",
      placement: "Salvador - BA",
      date: "2026-07-05",
      time: "09:30",
    },
    {
      name: "Frontend Masters Live",
      placement: "Fortaleza - CE",
      date: "2026-07-15",
      time: "15:45",
    },
  ];

  const checkins = [
    {
      personName: "João Silva",
      placement: "Tech Conference 2026",
      creationDate: new Date("2026-07-01T09:15:00").getTime(),
    },
    {
      personName: "Maria Oliveira",
      placement: "Workshop de React",
      creationDate: new Date("2026-07-01T10:30:00").getTime(),
    },
    {
      personName: "Carlos Souza",
      placement: "Startup Meetup",
      creationDate: new Date("2026-07-01T11:45:00").getTime(),
    },
    {
      personName: "Ana Costa",
      placement: "Marketing Summit",
      creationDate: new Date("2026-07-02T08:20:00").getTime(),
    },
    {
      personName: "Lucas Pereira",
      placement: "UX/UI Experience",
      creationDate: new Date("2026-07-02T09:50:00").getTime(),
    },
    {
      personName: "Fernanda Lima",
      placement: "DevOps Days",
      creationDate: new Date("2026-07-02T13:10:00").getTime(),
    },
    {
      personName: "Rafael Mendes",
      placement: "AI & Data Forum",
      creationDate: new Date("2026-07-03T14:00:00").getTime(),
    },
    {
      personName: "Juliana Rocha",
      placement: "Cyber Security Expo",
      creationDate: new Date("2026-07-03T15:25:00").getTime(),
    },
    {
      personName: "Bruno Almeida",
      placement: "Product Management Day",
      creationDate: new Date("2026-07-04T16:40:00").getTime(),
    },
    {
      personName: "Patrícia Gomes",
      placement: "Frontend Masters Live",
      creationDate: new Date("2026-07-04T18:00:00").getTime(),
    },
  ];

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
        <CheckListCard checkinList={checkins} />
      </div>
    </div>
  );
}
