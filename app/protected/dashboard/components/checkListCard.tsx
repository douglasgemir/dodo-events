import { CustomCard } from "@/components/molecules/customcard";
import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

type checkin = {
  personName: string;
  placement: string;
  creationDate: string | number;
};

type props = {
  checkinList: checkin[];
  isLoading?: boolean;
};

export const CheckListCard = ({ checkinList, isLoading }: props) => {
  if (isLoading) {
    return (
      <CustomCard
        title="Check-ins Recentes"
        titleSize="text-xl"
        subtitle="Ultimas confirmacoes de presenca"
        headerStyle="flex flex-col gap-4"
        contentStyle="flex flex-col gap-4"
      >
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={`skeleton-${index}`}
              className="flex flex-row h-20 p-4 mb-2 items-center justify-between"
            >
              <CardHeader className="flex flex-col flex-1 p-4 gap-2">
                <Skeleton className="h-5 w-[140px]" />
                <Skeleton className="h-4 w-[100px]" />
              </CardHeader>

              <CardFooter className="flex flex-col items-center gap-2 p-4">
                <Skeleton className="h-4 w-[120px]" />
              </CardFooter>
            </Card>
          ))}
        </>
      </CustomCard>
    );
  }

  return (
    <CustomCard
      title="Check-ins Recentes"
      titleSize="text-xl"
      subtitle="Ultimas confirmacoes de presenca"
      headerStyle="flex flex-col gap-4"
      contentStyle="flex flex-col gap-4"
    >
      <>
        {checkinList.map((event, index) => (
          <Card
            key={index}
            className="flex flex-row h-20 p-4 mb-2 items-center justify-between"
          >
            <CardHeader className="flex flex-col flex-1 p-4">
              <Label className="font-semibold truncate">
                {event.personName}
              </Label>

              <Label className="text-sm text-muted-foreground truncate">
                {event.placement}
              </Label>
            </CardHeader>

            <CardFooter className="flex flex-col items-center gap-2 p-4">
              <Label className="text-sm">{event.creationDate}</Label>
            </CardFooter>
          </Card>
        ))}
      </>
    </CustomCard>
  );
};
