import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServiceEditForm from "./ServiceEditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      icon: true,
      imageUrl: true,
      active: true,
      order: true,
    },
  });

  if (!service) notFound();

  return <ServiceEditForm service={service} />;
}
