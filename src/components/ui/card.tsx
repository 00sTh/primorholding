import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-navy p-6",
        hover &&
          "transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
