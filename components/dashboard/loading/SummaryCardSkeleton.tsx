import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SUMMARY_STYLES } from "../summary/config";

export const SummaryCardSkeleton = () => {
  return (
    <Card className={`${SUMMARY_STYLES.cardRadius} ${SUMMARY_STYLES.cardBg}`}>
      <CardHeader className="flex flex-row justify-between px-0">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="flex-col flex gap-1">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
    </Card>
  );
};

export const SummaryCardsLoadingSkeleton = () => {
  return (
    <div className="bg-background">
      <Skeleton className="h-6 w-20 mb-4" />
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <SummaryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
