"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSignIn(provider: string) {
    setLoading(provider);
    await signIn(provider, { callbackUrl });
  }

  return (
    <Card className="text-center">
      <h1 className="font-serif text-2xl font-bold text-ink mb-2">Begin Your Journey</h1>
      <p className="text-sm text-ink-muted mb-8">
        Join Oriental Wisdom to access courses and consultations
      </p>

      <div className="space-y-3">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => handleSignIn("google")}
          disabled={loading !== null}
        >
          {loading === "google" ? "Redirecting..." : "Continue with Google"}
        </Button>
        <Button
          variant="primary"
          className="w-full"
          onClick={() => handleSignIn("resend")}
          disabled={loading !== null}
        >
          {loading === "resend" ? "Sending link..." : "Sign up with Email"}
        </Button>
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-vermilion hover:underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
