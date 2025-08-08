import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-black text-gray-900 dark:text-foreground font-serif">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-muted-foreground">
          Sorry, this page is lost in the everglades, <br />
          might wanna turn back ;)
        </p>
        <Link href="/">
          <Button className="h-12 px-6 cursor-pointer transition-colors">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
