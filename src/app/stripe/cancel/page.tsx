import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function StripeCancelPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <Card>
        <h1 className="font-serif text-2xl font-bold text-ink">Payment Cancelled</h1>
        <p className="mt-2 text-ink-muted">
          Your payment was not processed. No worries — you can try again whenever you&apos;re ready.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/courses">
            <Button variant="secondary">Back to Courses</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Go Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
