"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/schemas/contact.schema";
import type { ActionResult } from "@/types";

export async function submitLead(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    company: (formData.get("company") as string) || undefined,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Verifique os campos e tente novamente.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.lead.create({ data: parsed.data });

  return {
    success: true,
    message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
  };
}

export async function toggleLeadRead(id: string, currentRead: boolean) {
  await prisma.lead.update({
    where: { id },
    data: { read: !currentRead },
  });
}

export async function getLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getLeadById(id: string) {
  return prisma.lead.findUnique({ where: { id } });
}
