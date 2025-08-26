"use client";

import { UserPlus } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/shared/toggle-theme";
import { Search } from "@/components/dashboard/shared/search";

const NavBar = () => {
  const { user } = useUser();
  return (
    <div className="flex sticky top-0 items-center px-2 gap-x-4 md:px-4 justify-between w-full bg-background border-b h-20 z-50">
      <div className="relative w-[300px] ">
        <Search />
      </div>

      <div className="flex gap-x-2 items-center w-26">
        <ModeToggle />
        {user?.id ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button>
              <UserPlus className="w-4 h-4 mr-1" /> Iniciar sesión
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
