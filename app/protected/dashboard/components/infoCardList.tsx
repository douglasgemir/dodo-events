import { CustomCard } from "@/components/molecules/customcard";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type Item = {
  type: string;
  data: string | number;
  info: string;
  icon: LucideIcon;
};

type Props = {
  itemList: Item[];
  isLoading?: boolean;
};

export const InfoCardList = ({ itemList, isLoading }: Props) => {
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`skeleton-${index}`}>
            <CardHeader className="flex flex-row justify-between items-start pb-2">
              <div className="flex flex-col gap-2 w-full mt-1">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-[150px]" />
            </CardFooter>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {itemList.map((item, index) => (
        <CustomCard
          key={index}
          title={item.type}
          footerInfo={item.info}
          headerIcon={item.icon}
        >
          {item.data}
        </CustomCard>
      ))}
    </>
  );
};
