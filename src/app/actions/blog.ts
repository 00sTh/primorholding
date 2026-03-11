"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const BlogPostSchema = z.object({
  title: z.string().min(1, "Titulo obrigatorio"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Conteudo obrigatorio"),
  published: z.coerce.boolean().default(false),
});

export type BlogPostState = { errors?: Record<string, string[]>; message?: string };

export async function createBlogPost(
  prevState: BlogPostState,
  formData: FormData
): Promise<BlogPostState> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    published: formData.get("published") === "on" ? "true" : "false",
  };
  const result = BlogPostSchema.safeParse(raw);
  if (!result.success)
    return { errors: result.error.flatten().fieldErrors as Record<string, string[]> };

  const slug = slugify(result.data.title);
  const publishedAt = result.data.published ? new Date() : null;

  await prisma.blogPost.create({
    data: {
      title: result.data.title,
      slug,
      excerpt: result.data.excerpt,
      content: result.data.content,
      published: result.data.published,
      publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  prevState: BlogPostState,
  formData: FormData
): Promise<BlogPostState> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title"),
    excerpt: formData.get("excerpt") || undefined,
    content: formData.get("content"),
    published: formData.get("published") === "on" ? "true" : "false",
  };
  const result = BlogPostSchema.safeParse(raw);
  if (!result.success)
    return { errors: result.error.flatten().fieldErrors as Record<string, string[]> };

  // Fetch current post to check if it was previously published
  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { published: true, publishedAt: true },
  });
  const wasPublished = existing?.published ?? false;
  const publishedAt =
    result.data.published && !wasPublished
      ? new Date()
      : (existing?.publishedAt ?? null);

  await prisma.blogPost.update({
    where: { id },
    data: {
      title: result.data.title,
      slug: slugify(result.data.title),
      excerpt: result.data.excerpt,
      content: result.data.content,
      published: result.data.published,
      publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
