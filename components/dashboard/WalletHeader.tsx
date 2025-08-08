import { Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  name: string;
  avatar: string;
}

interface WalletHeaderProps {
  users: User[];
  additionalUsersCount: number;
}

const WalletHeader = ({ users, additionalUsersCount }: WalletHeaderProps) => {
  return (
    <div className="bg-surface border-b border-card-border px-6 py-6">
      {/* Wallet title and actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-text-header">
            Wallet Ledger
          </h1>
          <Badge
            variant="secondary"
            className="bg-success-subtle text-success border-success/20"
          >
            Active
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User avatars */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex -space-x-2">
          {users.map((user) => (
            <Avatar
              key={user.name}
              className="h-8 w-8 border-2 border-surface hover:z-10 relative transition-transform hover:scale-110"
            >
              {user.avatar && <AvatarImage src={user.avatar} />}
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          {additionalUsersCount > 0 && (
            <Avatar className="h-8 w-8 border-2 border-surface bg-muted">
              <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                +{additionalUsersCount}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {users
            .slice(0, 3)
            .map((u) => u.name.split(" ")[0])
            .join(", ")}
          {users.length > 3 && `, ${users[3].name.split(" ")[0]}`}
          {additionalUsersCount > 0 && ` +${additionalUsersCount} others`}
        </div>
      </div>

      {/* Tab navigation */}
      <Tabs defaultValue="overview">
        <TabsList className="bg-surface-muted">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-surface data-[state=active]:text-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-surface data-[state=active]:text-foreground"
          >
            Transactions
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default WalletHeader;
