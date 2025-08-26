import NavBar from "@/components/dashboard/shared/nav-bar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full h-screen overflow-hidden">
      <div className="hidden xl:block w-80 h-full">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full xl:w-[calc(100%-20rem)] h-full overflow-hidden">
        <NavBar />
        <div className="flex-1 overflow-y-auto bg-[#fafbfc] dark:bg-secondary">
          <div className="p-6">{children}</div>
          <Toaster />
        </div>
      </div>
    </main>
  );
}
