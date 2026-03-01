import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ReactNode } from "react";
import { Label } from "../ui/label";
import { Icon, LucideIcon } from "lucide-react";

type props = {
  title?: string;
  subtitle?: string;
  headerIcon?: LucideIcon;
  children?: ReactNode;
  footerInfo?: string;
  titleSize?: string;
  subtitleSize?: string;
  rootStyle?: string;
  headerStyle?: string;
  contentStyle?: string;
  footerStyle?: string;
};

export const CustomCard = ({
  title,
  subtitle,
  headerIcon,
  children,
  footerInfo,
  titleSize,
  subtitleSize,
  rootStyle,
  headerStyle,
  contentStyle,
  footerStyle,
}: props) => {
  const Icon = headerIcon;

  return (
    <Card className={cn(rootStyle)}>
      <CardHeader
        className={cn("flex justify-between items-start", headerStyle)}
      >
        <div className="flex flex-col gap-2">
          <Label className={cn(titleSize)}>{title}</Label>
          <Label className={cn(subtitleSize)}>{subtitle}</Label>
        </div>

        {Icon && <Icon className="w-5 h-5 text-muted-foreground" />}
      </CardHeader>

      <CardContent className={cn(contentStyle)}>{children}</CardContent>

      <CardFooter className={cn(footerStyle)}>{footerInfo}</CardFooter>
    </Card>
  );
};
