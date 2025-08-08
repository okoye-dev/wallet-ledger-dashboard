import { Button } from "@/components/ui/button";

interface TransactionsContentProps {
  onBackToOverview: () => void;
}

const TransactionsContent = ({
  onBackToOverview,
}: TransactionsContentProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Transactions Coming Soon
          </h3>
          <p className="text-muted-foreground text-sm">
            We're working hard to bring you detailed transaction history and
            analytics. Stay tuned for this exciting feature!
          </p>
        </div>

        <Button
          onClick={onBackToOverview}
          variant="default"
          className="bg-button-green hover:bg-button-green/90 text-white"
        >
          Back to Overview
        </Button>
      </div>
    </div>
  );
};

export { TransactionsContent };
