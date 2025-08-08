import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@/types/dashboard";

interface UserProfilesProps {
  profiles: Profile[];
  additionalCount?: number;
  size?: "sm" | "md" | "lg";
  showNames?: boolean;
}

const UserProfiles = ({
  profiles,
  additionalCount = 0,
  size = "md",
  showNames = true,
}: UserProfilesProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", // 32px total including the 3px padding
    lg: "h-10 w-10",
  };

  const avatarSize = sizeClasses[size];

  return (
    <section className="flex items-center gap-3 pb-6">
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
      </div>

      {showNames && (
        <div className="text-[11px] xs:text-sm text-muted-foreground">
          {profiles
            .slice(0, 3)
            .map((p) => p.name.split(" ")[0])
            .join(", ")}
          {profiles.length > 3 && `, ${profiles[3].name.split(" ")[0]}`}
          {additionalCount > 0 && ` +${additionalCount} others`}
        </div>
      )}
    </section>
  );
};

export default UserProfiles;
