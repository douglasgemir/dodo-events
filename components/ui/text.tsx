import { Label } from "./label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TextProps = {
  children: ReactNode;
  variant?: "basic" | "title" | "subtitle";
};

export const Text = ({ children, variant = "basic" }: TextProps) => {
  const styles = {
    basic: "text-sm font-normal",
    subtitle: "text-base font-medium",
    title: "text-xl font-bold",
  };

  return <Label className={cn(styles[variant])}>{children}</Label>;
};
