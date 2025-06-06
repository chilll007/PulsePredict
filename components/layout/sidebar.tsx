"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Settings,
  Upload,
  Home,
  History,
  ChevronLeft,
  ChevronRight,
  Radio
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

function NavItem({ href, icon, label, isCollapsed }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              {icon}
              <span className="sr-only">{label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 items-center gap-3 rounded-md px-3",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "group flex flex-col border-r border-border transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[220px]"
      )}
    >
      <div className="flex flex-1 flex-col gap-4 p-2">
        <div className="flex h-12 items-center justify-center px-2 border-b border-border mb-2">
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/dashboard">
                    <Logo size="sm" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  PulsePredict
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="font-semibold text-sm">PulsePredict</span>
            </Link>
          )}
        </div>
        <div className="flex h-8 items-center justify-end px-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isCollapsed ? "Expand" : "Collapse"}
            </span>
          </Button>
        </div>
        <nav className="grid gap-1 px-2">
          <NavItem
            href="/dashboard"
            icon={<Home className="h-5 w-5" />}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/upload"
            icon={<Upload className="h-5 w-5" />}
            label="Upload Data"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/live"
            icon={<Radio className="h-5 w-5" />}
            label="Live Insights"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/history"
            icon={<History className="h-5 w-5" />}
            label="History"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/results/demo"
            icon={<BarChart className="h-5 w-5" />}
            label="Results Demo"
            isCollapsed={isCollapsed}
          />
          <NavItem
            href="/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
    </div>
  );
}