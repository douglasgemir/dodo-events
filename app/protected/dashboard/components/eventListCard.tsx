import { CustomCard } from "@/components/molecules/customcard";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

type event = { name: string; placement: string; date: string; time: string };

type props = {
  upcomingEvent: event[];
  isLoading?: boolean;
};

export const EventListCard = ({ upcomingEvent, isLoading }: props) => {
  if (isLoading) {
    return (
      <CustomCard
        title="Proximos Eventos"
        titleSize="text-xl"
        subtitle="Eventos ativos com data mais próxima"
        headerStyle="flex flex-col gap-4"
        contentStyle="flex flex-col gap-4"
      >
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={`skeleton-${index}`}
              className="flex md:flex-row sm:flex-col md:h-20 p-4 mb-2 items-center md:justify-between sm:justify-center "
            >
              <CardHeader className="flex flex-col flex-1 md:p-4 sm:p-0 w-full sm:items-center gap-2">
                <Skeleton className="h-5 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </CardHeader>
              <CardFooter className="flex flex-col items-center gap-2 p-4">
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-5 w-[60px] rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </>
      </CustomCard>
    );
  }

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
