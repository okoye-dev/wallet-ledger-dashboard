import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Profile {
  name: string;
  image: string;
}

interface ProfileContainerProps {
  profiles: Profile[];
  additionalCount?: number;
  size?: "sm" | "md" | "lg";
  showNames?: boolean;
}

const ProfileContainer = ({
  profiles,
  additionalCount = 0,
  size = "md",
  showNames = true,
}: ProfileContainerProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", // 32px total including the 3px padding
    lg: "h-10 w-10",
  };

  const avatarSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-3">
      {" "}
      {/* Changed from gap-4 to gap-3 (12px) */}
      <div className="flex -space-x-2">
        {profiles.map((profile) => (
          <div
            key={profile.name}
            className="rounded-full p-[3px] bg-surface border-2 border-surface hover:z-10 relative transition-transform hover:scale-110"
          >
            <Avatar className={`${avatarSize} rounded-full`}>
              <AvatarImage
                src={profile.image}
                alt={profile.name}
                className="rounded-full object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs rounded-full">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
        {additionalCount > 0 && (
          <div className="rounded-full p-[3px] bg-surface border-2 border-surface">
            <Avatar className={`${avatarSize} bg-muted rounded-full`}>
              <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium rounded-full">
                +{additionalCount}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      {showNames && (
        <div className="text-sm text-muted-foreground">
          {profiles
            .slice(0, 3)
            .map((p) => p.name.split(" ")[0])
            .join(", ")}
          {profiles.length > 3 && `, ${profiles[3].name.split(" ")[0]}`}
          {additionalCount > 0 && ` +${additionalCount} others`}
        </div>
      )}
    </div>
  );
};

export default ProfileContainer;
