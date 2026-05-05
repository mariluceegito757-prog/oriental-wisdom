"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface EnrollButtonProps {
  courseSlug: string;
  isEnrolled: boolean;
  isLoggedIn: boolean;
}

export function EnrollButton({ courseSlug, isEnrolled, isLoggedIn }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleEnroll() {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=/courses/${courseSlug}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "COURSE", itemId: courseSlug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Something went wrong");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (isEnrolled) {
    return (
      <Button variant="jade" size="lg" disabled>
        Enrolled
      </Button>
    );
  }

  return (
    <Button variant="vermilion" size="lg" onClick={handleEnroll} disabled={loading}>
      {loading ? "Redirecting..." : isLoggedIn ? "Enroll Now" : "Sign In to Enroll"}
    </Button>
  );
}
