import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign In | Oriental Wisdom",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<Card className="text-center py-8">Loading...</Card>}>
      <LoginForm />
    </Suspense>
  );
}
