import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const onCredentialsSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

    setIsPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <Card className="w-full border-none shadow-lg p-6">
      <CardHeader className="px-0 pt-0 space-y-2">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>Sign up to start saving lives</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 text-destructive p-3 flex items-center gap-x-2 rounded-md text-sm mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialsSignUp} className="space-y-4">
          <Input
            disabled={isPending}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Full Name"
            className="h-11"
          />
          <Input
            disabled={isPending}
            value={email}
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="h-11"
          />
          <Input
            disabled={isPending}
            value={password}
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="h-11"
          />
          <Input
            disabled={isPending}
            value={confirmPassword}
            required
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="h-11"
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            size="lg"
            disabled={isPending}
          >
            Continue
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-red-600 hover:underline cursor-pointer font-medium"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
