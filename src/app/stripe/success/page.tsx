import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function StripeSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <Card>
        <div className="text-5xl mb-4">&#10003;</div>
        <h1 className="font-serif text-2xl font-bold text-ink">Payment Successful</h1>
        <p className="mt-2 text-ink-muted">
          Thank you for your purchase. You now have access to your course.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/dashboard/courses">
            <Button variant="vermilion">Go to My Courses</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary">Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
