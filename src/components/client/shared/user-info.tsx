import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserInfoProps = {
  user: {
    imageUrl?: string;
    username?: string | null;
    emailAddresses: { emailAddress: string }[];
  };
};

export function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={user.imageUrl} alt={user.username || "Usuario"} />
        <AvatarFallback>
          {user.username?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-lg">{user.username || "Usuario"}</p>
        <p className="text-sm text-muted-foreground">
          {user.emailAddresses[0]?.emailAddress}
        </p>
      </div>
    </div>
  );
}
