"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { AuthForm } from "@/components/auth-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would typically handle the signup logic
    console.log("Email signup submitted");
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
      title="Create an account"
      description="Enter your email below to create your account"
    >
      <AuthForm
        type="signup"
        onSubmit={handleSubmit}
        onGoogleSignIn={handleGoogleSignIn}
        onGithubSignIn={handleGithubSignIn}
      />
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          Already have an account?{" "}
        </span>
        <Button variant="link" asChild>
          <Link to="/login">Log in</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
