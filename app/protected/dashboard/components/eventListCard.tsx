import { CustomCard } from "@/components/molecules/customcard";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type event = { name: string; placement: string; date: string; time: string };

type props = {
  upcomingEvent: event[];
};

export const EventListCard = ({ upcomingEvent }: props) => {
  return (
    <CustomCard
      title="Proximos Eventos"
      titleSize="text-xl"
      subtitle="Eventos ativos com data mais próxima"
      headerStyle="flex flex-col gap-4"
      contentStyle="flex flex-col gap-4"
    >
      <>
        {upcomingEvent.map((event, index) => (
          <Card
            key={index}
            className="flex md:flex-row sm:flex-col md:h-20 p-4 mb-2 items-center md:justify-between sm:justify-center "
          >
            <CardHeader className="flex flex-col flex-1 md:p-4 sm:p-0 w-full sm:items-center">
              <Label className="font-semibold truncate">{event.name}</Label>
              <Label className="text-sm text-muted-foreground truncate">
                {event.placement}
              </Label>
            </CardHeader>

            <CardFooter className="flex flex-col items-center gap-2 p-4">
              <Label className="text-sm">{event.date}</Label>
              <Badge>{event.time}</Badge>
            </CardFooter>
          </Card>
        ))}
      </>
    </CustomCard>
  );
};
