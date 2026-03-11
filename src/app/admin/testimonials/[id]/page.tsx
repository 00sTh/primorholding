import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialEditForm from "./TestimonialEditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;

  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      company: true,
      role: true,
      content: true,
      photoUrl: true,
      rating: true,
      active: true,
      order: true,
    },
  });

  if (!testimonial) notFound();

  return <TestimonialEditForm testimonial={testimonial} />;
}
