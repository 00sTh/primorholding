import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
}

export function Section({ className, children, id, ...props }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
