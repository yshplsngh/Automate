import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocialSignIn } from "./social-signin";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn: () => void;
  onGithubSignIn: () => void;
}

export function AuthForm({
  type,
  onSubmit,
  onGoogleSignIn,
  onGithubSignIn,
}: AuthFormProps) {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        {type === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" required />
          </div>
        )}
        <Button type="submit" className="w-full">
          {type === "login" ? "Log in" : "Sign up"}
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <SocialSignIn
        onGoogleSignIn={onGoogleSignIn}
        onGithubSignIn={onGithubSignIn}
      />
    </div>
  );
}
