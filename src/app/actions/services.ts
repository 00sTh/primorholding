"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ServiceSchema = z.object({
  title: z.string().min(1, "Titulo obrigatorio"),
  description: z.string().min(1, "Descricao obrigatoria"),
  icon: z.string().optional(),
  active: z.coerce.boolean().default(true),
  order: z.coerce.number().default(0),
});

export type ServiceState = { errors?: Record<string, string[]>; message?: string };

export async function createService(
  prevState: ServiceState,
  formData: FormData
): Promise<ServiceState> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon") || undefined,
    active: formData.get("active") ?? "true",
    order: formData.get("order") ?? "0",
  };

  const result = ServiceSchema.safeParse(raw);
  if (!result.success)
    return { errors: result.error.flatten().fieldErrors as Record<string, string[]> };

  let imageUrl: string | undefined;
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    imageUrl = await uploadImage(buffer, "primorholding/services");
  }

  const slug = slugify(result.data.title);
  await prisma.service.create({ data: { ...result.data, slug, imageUrl } });
  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  prevState: ServiceState,
  formData: FormData
): Promise<ServiceState> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon") || undefined,
    active: formData.get("active") ?? "true",
    order: formData.get("order") ?? "0",
  };

  const result = ServiceSchema.safeParse(raw);
  if (!result.success)
    return { errors: result.error.flatten().fieldErrors as Record<string, string[]> };

  let imageUrl: string | undefined;
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    imageUrl = await uploadImage(buffer, "primorholding/services");
  }

  await prisma.service.update({
    where: { id },
    data: {
      ...result.data,
      slug: slugify(result.data.title),
      ...(imageUrl ? { imageUrl } : {}),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: string): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}
