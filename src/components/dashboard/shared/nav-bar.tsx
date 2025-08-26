"use client";
import { UserPlus } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/toggle-theme";
import { Search } from "@/components/dashboard/shared/search";
import MobileSidebar from "../sidebar/mobile-sidebar";
import Logo from "@/components/ui/logo";

const NavBar = () => {
  const { user } = useUser();

  return (
    <div className="flex sticky top-0 items-center px-4 gap-x-4 justify-between w-full bg-background border-b h-20 z-50">
      <MobileSidebar />

      <div className="hidden sm:flex relative w-[300px]">
        <Search />
      </div>

      <div className="xl:hidden sm:hidden">
        <Logo />
      </div>

      <div className="flex gap-x-2 items-center">
        <ModeToggle />
        {user?.id ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Iniciar sesión</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
