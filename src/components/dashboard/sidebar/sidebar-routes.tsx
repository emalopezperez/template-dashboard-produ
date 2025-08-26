"use client";

import { Separator } from "@/components/ui/separator";
import { dataSidebar, dataSupportSidebar, dataToolsSidebar } from "@/constants";
import SidebarItem from "./sidebar-item";

const SidebarRoutes = () => {
  return (
    <aside className="flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-4">
          <h3 className="text-slate-600 mb-2 font-serif">General</h3>
          {dataSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />
        <div className="p-2 md:p-4">
          <h3 className="text-slate-600 mb-2 font-serif">Suports</h3>
          {dataToolsSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>

        <Separator />

        <div className="p-2 md:p-4">
          <h3 className="text-slate-600 mb-2 font-serif">Settings</h3>
          {dataSupportSidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      </div>
      <div>
        <Separator />
        <footer className="mt-2 p-3 text-center font-serif">
          2025 © All rights reserved
        </footer>
      </div>
    </aside>
  );
};

export default SidebarRoutes;
