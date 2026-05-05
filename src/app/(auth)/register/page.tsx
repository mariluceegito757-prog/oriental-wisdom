import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "./register-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create Account | Oriental Wisdom",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<Card className="text-center py-8">Loading...</Card>}>
      <RegisterForm />
    </Suspense>
  );
}
