"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ContactSchema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.email("Email invalido"),
  phone: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter ao menos 10 caracteres"),
  website: z.string().max(0), // honeypot -- must be empty
});

export type ContactState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: (formData.get("name") as string) ?? "",
    email: (formData.get("email") as string) ?? "",
    phone: (formData.get("phone") as string) || undefined,
    message: (formData.get("message") as string) ?? "",
    website: (formData.get("website") as string) ?? "",
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    // Honeypot triggered: silently return success (do not tell bots it failed)
    if (result.error.issues.some((i) => i.path[0] === "website")) {
      return { success: true };
    }
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.contact.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      message: result.data.message,
    },
  });

  return {
    success: true,
    message: "Mensagem enviada com sucesso! Retornaremos em breve.",
  };
}
