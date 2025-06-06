import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
}

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
  xl: "h-16 w-16"
};

export function Logo({ className, size = "md", href }: LogoProps) {
  const logoElement = (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        className={cn(sizeClasses[size])}
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top circle - outer */}
        <circle cx="60" cy="30" r="25" fill="#C2185B"/>
        {/* Top circle - inner hole */}
        <circle cx="60" cy="30" r="8" fill="white"/>

        {/* Bottom left circle - outer */}
        <circle cx="30" cy="90" r="25" fill="#C2185B"/>
        {/* Bottom left circle - inner hole */}
        <circle cx="30" cy="90" r="8" fill="white"/>

        {/* Bottom right circle - outer */}
        <circle cx="90" cy="90" r="25" fill="#C2185B"/>
        {/* Bottom right circle - inner hole */}
        <circle cx="90" cy="90" r="8" fill="white"/>
      </svg>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {logoElement}
      </a>
    );
  }

  return logoElement;
}