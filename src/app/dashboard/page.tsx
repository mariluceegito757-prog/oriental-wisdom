import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dashboard | Oriental Wisdom",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const [enrollments, bookings] = await Promise.all([
    prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: { course: { select: { title: true, slug: true, lessons: { select: { id: true } } } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        timeSlot: { select: { startTime: true, endTime: true } },
        consultationType: { select: { name: true, slug: true, duration: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <Header />
      <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold text-ink">My Dashboard</h1>
      <p className="mt-2 text-ink-muted">
        Welcome, {session.user.name ?? "there"}
      </p>

      {/* My Courses */}
      <section className="mt-12">
        <h2 className="font-serif text-xl font-bold text-ink mb-4">My Courses</h2>
        {enrollments.length === 0 ? (
          <Card className="p-6 text-center text-ink-muted">
            <p>No courses yet.</p>
            <Link href="/courses" className="text-vermilion hover:underline mt-2 inline-block">
              Browse courses
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {enrollments.map((e) => (
              <Card key={e.id} className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-ink">{e.course.title}</h3>
                  <p className="text-sm text-ink-muted mt-1">
                    {e.progress} / {e.course.lessons.length} lessons completed
                    {e.completedAt && <Badge className="ml-2" variant="jade">Completed</Badge>}
                  </p>
                </div>
                <Link href={`/courses/${e.course.slug}`}>
                  <Button variant="jade" size="sm">
                    {e.completedAt ? "Review" : "Continue"}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* My Bookings */}
      <section className="mt-12">
        <h2 className="font-serif text-xl font-bold text-ink mb-4">My Consultations</h2>
        {bookings.length === 0 ? (
          <Card className="p-6 text-center text-ink-muted">
            <p>No bookings yet.</p>
            <Link href="/consultations" className="text-vermilion hover:underline mt-2 inline-block">
              Book a consultation
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <Card key={b.id} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-ink">{b.consultationType.name}</h3>
                  <Badge
                    variant={
                      b.status === "CONFIRMED" ? "jade" : b.status === "CANCELLED" ? "default" : "gold"
                    }
                  >
                    {b.status}
                  </Badge>
                </div>
                <p className="text-sm text-ink-muted">
                  {new Date(b.timeSlot.startTime).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                  {" · "}
                  {new Date(b.timeSlot.startTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  {" — "}
                  {new Date(b.timeSlot.endTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  {" · "}
                  {b.consultationType.duration} min
                </p>
                {b.notes && (
                  <p className="text-xs text-ink-muted mt-2 italic">Note: {b.notes}</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Orders */}
      <section className="mt-12">
        <h2 className="font-serif text-xl font-bold text-ink mb-4">Order History</h2>
        <OrdersList userId={session.user.id} />
      </section>
    </div>
      <Footer />
    </>
  );
}

async function OrdersList({ userId }: { userId: string }) {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  if (orders.length === 0) {
    return (
      <Card className="p-6 text-center text-ink-muted">
        <p>No orders yet.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {orders.map((o) => (
        <div
          key={o.id}
          className="flex items-center justify-between py-3 px-4 bg-paper rounded-lg border border-ink/5 text-sm"
        >
          <div>
            <span className="font-medium">{o.type === "COURSE" ? "Course" : "Consultation"}</span>
            <span className="text-ink-muted ml-2">
              {new Date(o.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge>{o.status}</Badge>
            <span className="font-mono text-ink">
              {(o.amount / 100).toFixed(2)} {o.currency.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
