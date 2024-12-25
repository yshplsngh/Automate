"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth-layout";
import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/user-provider";

export default function LoginPage() {
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );
      const data = await res.json();
      if (data.success) {
        console.log("Login successful");
        login({
          name: data.name ?? "User",
          email: data.email,
          token: data.token,
          id: data.id,
          avatarUrl: data.avatarUrl ?? "",
        });
        window.location.href = "/";
      } else {
        setError(data.message || "An error occurred");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
    // Implement Google sign-in logic here
  };

  const handleGithubSignIn = () => {
    console.log("GitHub sign-in clicked");
    // Implement GitHub sign-in logic here
  };

  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email below to log in to your account"
    >
      <AuthForm
        type="login"
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGithubSignIn}
        error={error || undefined}
        isLoading={isLoading}
      />
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          Don't have an account?{" "}
        </span>
        <Button variant="link" asChild>
          <Link to="/signup">Sign up</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
