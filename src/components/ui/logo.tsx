"use client";
import { Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/dashboard")}
      className="min-h-20 h-20 flex items-center px-6 cursor-pointer gap-2 border-b">
      <Ticket
        size={22}
        className="text-orange-700 dark:text-orange-400 rotate-12"
      />

      <h1 className="font-bold text-xl text-gray-800 dark:text-gray-200">
        Ticket Panel
      </h1>
    </div>
  );
};

export default Logo;
