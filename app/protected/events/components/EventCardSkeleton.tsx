import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <Card className="p-0 rounded-2xl overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="w-full h-48 rounded-none" />
        <div className="p-4 space-y-4 mt-2">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pb-4 pt-2 gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  );
}
