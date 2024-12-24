"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would typically handle the login logic
    console.log("Email login submitted");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
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
