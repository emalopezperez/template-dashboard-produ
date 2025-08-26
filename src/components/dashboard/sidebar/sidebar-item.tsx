"use client";

import { cn } from "@/utils/utils";
import { ChevronDown, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SubItem {
  label: string;
  href: string;
}

interface SidebarItemProps {
  item: {
    label: string;
    icon: LucideIcon;
    href: string;
    subItems?: SubItem[];
  };
}

const SidebarItem = ({ item }: SidebarItemProps) => {
  const { label, icon: Icon, href, subItems } = item;
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (subItems && subItems.length > 0) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-slate-300/20 rounded-lg cursor-pointer">
          <div className="flex items-center gap-x-2">
            <Icon strokeWidth={2} className="w-5 h-5" />
            <span className="text-sm ">{label}</span>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {subItems.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className={cn(
                "flex gap-x-2 mt-2 text-sm font-sans items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer ml-6",
                pathname === subItem.href && "bg-slate-400/20"
              )}>
              <Icon strokeWidth={2} className="w-5 h-5" />
              {subItem.label}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex gap-x-2 mt-2 text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer",
        pathname === href && "bg-slate-400/20"
      )}>
      <Icon strokeWidth={2} className="w-5 h-5" />
      {label}
    </Link>
  );
};

export default SidebarItem;
