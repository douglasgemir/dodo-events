import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { CustomCard } from "./customcard";

type props = {
  title: string;
  list: [];
  footerInfo: string;
  className?: string;
};

export const ListCard = ({ title, list, footerInfo, className }: props) => {
  return (
    <Card className={cn("w-full h-full", className)}>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        {list.map((item, index) => (
          <CustomCard
            key={index}
            title={item.title}
            content={item.content}
            footerInfo={item.info}
          />
        ))}
      </CardContent>
      <CardFooter>{footerInfo}</CardFooter>
    </Card>
  );
};
