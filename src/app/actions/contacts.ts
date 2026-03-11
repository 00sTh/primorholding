"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleContactRead(
  id: string,
  currentRead: boolean
): Promise<void> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.contact.update({
    where: { id },
    data: { read: !currentRead },
  });
  revalidatePath("/admin/contacts");
  revalidatePath("/admin"); // update dashboard unread count
}
