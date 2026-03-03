import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CheckinRuleCardSkeleton() {
  return (
    <Card className="flex flex-row justify-between p-6 items-center">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-7 w-32" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-end items-center gap-4">
          <Skeleton className="h-5 w-10 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
        <div className="flex gap-12 mt-2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>
    </Card>
  );
}
