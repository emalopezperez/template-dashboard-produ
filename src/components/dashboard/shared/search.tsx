"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  SearchIcon,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { dataSidebar, dataSupportSidebar } from "@/constants";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function Search() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleInputClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleRoute = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <>
      <Input
        placeholder="Search..."
        className="rounded-lg"
        onClick={handleInputClick}
      />
      <SearchIcon strokeWidth={1} className="absolute top-2 right-2" />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {dataSidebar.map((item) => (
              <CommandItem
                key={item.href}
                onSelect={() => handleRoute(item.href)}>
                <item.icon />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            {dataSupportSidebar.map((item) => (
              <CommandItem
                key={item.label}
                onSelect={() => handleRoute(item.href)}>
                <item.icon />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
