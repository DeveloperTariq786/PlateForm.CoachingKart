import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { cn } from "@/lib/utils";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebarState = () => useContext(SidebarContext);

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main
          className={cn(
            "flex-1 transition-all duration-300",
            collapsed ? "ml-[68px]" : "ml-[240px]"
          )}
        >
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
