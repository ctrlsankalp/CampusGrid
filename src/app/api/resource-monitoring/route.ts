import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!["DEPARTMENT_OFFICER", "LAB_TECH", "SUPER_ADMIN", "ADMIN"].includes(user.role)) {
      return NextResponse.json({ success: false, error: "Insufficient permissions" }, { status: 403 });
    }

    const where: Record<string, unknown> = {
      isActive: true,
      type: { in: ["EQUIPMENT", "ASSET"] },
    };

    if (["DEPARTMENT_OFFICER", "LAB_TECH"].includes(user.role)) {
      if (!user.departmentId) {
        return NextResponse.json({ success: true, data: { department: null, resources: [] } });
      }
      where.departmentId = user.departmentId;
    }

    const now = new Date();

    const resources = await prisma.resource.findMany({
      where,
      include: {
        department: { select: { id: true, slug: true, name: true } },
        owner: { select: { id: true, name: true } },
        bookings: {
          where: {
            status: { in: ["APPROVED", "PENDING"] },
            endTime: { gte: now },
          },
          select: {
            id: true,
            title: true,
            status: true,
            startTime: true,
            endTime: true,
            user: { select: { id: true, name: true, email: true } },
          },
          orderBy: { startTime: "asc" },
        },
      },
      orderBy: { name: "asc" },
    });

    const dept = resources[0]?.department ?? null;

    const summary = resources.map((r) => {
      const activeBookings = r.bookings.filter(
        (b) => b.status === "APPROVED" && new Date(b.startTime) <= now && new Date(b.endTime) >= now
      );
      const pendingBookings = r.bookings.filter((b) => b.status === "PENDING");
      const upcomingBookings = r.bookings.filter(
        (b) => b.status === "APPROVED" && new Date(b.startTime) > now
      );

      const maxCount = r.maxCount ?? 1;
      const currentlyInUse = activeBookings.length;
      const availableNow = Math.max(0, maxCount - currentlyInUse);

      return {
        id: r.id,
        name: r.name,
        type: r.type,
        description: r.description,
        location: r.location,
        owner: r.owner,
        maxCount,
        currentlyInUse,
        availableNow,
        status: currentlyInUse >= maxCount ? "ALL_IN_USE" as const : currentlyInUse > 0 ? "PARTIAL" as const : "AVAILABLE" as const,
        activeBookings,
        pendingBookings,
        upcomingBookings,
        totalActiveAndUpcoming: activeBookings.length + upcomingBookings.length,
        totalPending: pendingBookings.length,
      };
    });

    const totalResources = summary.length;
    const totalUnits = summary.reduce((sum, r) => sum + r.maxCount, 0);
    const unitsInUse = summary.reduce((sum, r) => sum + r.currentlyInUse, 0);
    const unitsAvailable = totalUnits - unitsInUse;
    const totalPending = summary.reduce((sum, r) => sum + r.totalPending, 0);

    return NextResponse.json({
      success: true,
      data: {
        department: dept,
        stats: { totalResources, totalUnits, unitsInUse, unitsAvailable, totalPending },
        resources: summary,
      },
    });
  } catch (error) {
    console.error("[ResourceMonitoring]", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
