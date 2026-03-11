"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const TestimonialSchema = z.object({
  name: z.string().min(1, "Nome obrigatorio"),
  company: z.string().optional(),
  role: z.string().optional(),
  content: z.string().min(10, "Conteudo deve ter ao menos 10 caracteres"),
  rating: z.coerce.number().min(1).max(5).default(5),
  active: z.coerce.boolean().default(true),
  order: z.coerce.number().default(0),
});

export type TestimonialState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createTestimonial(
  prevState: TestimonialState,
  formData: FormData
): Promise<TestimonialState> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const raw = {
    name: formData.get("name"),
    company: formData.get("company") || undefined,
    role: formData.get("role") || undefined,
    content: formData.get("content"),
    rating: formData.get("rating") ?? "5",
    active: formData.get("active") ?? "true",
    order: formData.get("order") ?? "0",
  };

  const result = TestimonialSchema.safeParse(raw);
  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };

  let photoUrl: string | undefined;
  const photoFile = formData.get("photo") as File | null;
  if (photoFile && photoFile.size > 0) {
    const buffer = Buffer.from(await photoFile.arrayBuffer());
    photoUrl = await uploadImage(buffer, "primorholding/testimonials");
  }

  await prisma.testimonial.create({
    data: { ...result.data, photoUrl },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  prevState: TestimonialState,
  formData: FormData
): Promise<TestimonialState> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const raw = {
    name: formData.get("name"),
    company: formData.get("company") || undefined,
    role: formData.get("role") || undefined,
    content: formData.get("content"),
    rating: formData.get("rating") ?? "5",
    active: formData.get("active") ?? "true",
    order: formData.get("order") ?? "0",
  };

  const result = TestimonialSchema.safeParse(raw);
  if (!result.success)
    return {
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };

  let photoUrl: string | undefined;
  const photoFile = formData.get("photo") as File | null;
  if (photoFile && photoFile.size > 0) {
    const buffer = Buffer.from(await photoFile.arrayBuffer());
    photoUrl = await uploadImage(buffer, "primorholding/testimonials");
  }

  await prisma.testimonial.update({
    where: { id },
    data: {
      ...result.data,
      ...(photoUrl ? { photoUrl } : {}),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
