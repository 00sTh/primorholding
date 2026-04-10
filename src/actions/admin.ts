"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signJwt } from "@/lib/jwt";
import { adminLoginSchema } from "@/schemas/admin-login.schema";
import type { ActionResult } from "@/types";

export async function loginAdmin(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = adminLoginSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: "Dados inválidos." };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user) {
    return { success: false, message: "Credenciais inválidas." };
  }

  const valid = await bcrypt.compare(parsed.data.password, user.password);
  if (!valid) {
    return { success: false, message: "Credenciais inválidas." };
  }

  const token = await signJwt({ email: user.email, role: user.role });

  const cookieStore = await cookies();
  cookieStore.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  redirect("/admin/login");
}

export async function getAdminStats() {
  const [total, unread, today] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { read: false } }),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
  ]);
  return { total, unread, today };
}

export async function getRecentLeads(limit = 5) {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
