import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getEnrollment(courseId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.enrollment.findUnique({
    where: { userId_courseId: { userId: session.user.id, courseId } },
  });
}
