import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
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
        <div
          className={cn(
            "flex flex-1 flex-col transition-all duration-300 min-w-0",
            collapsed ? "ml-[68px]" : "ml-[240px]"
          )}
        >
          <AppHeader />
          <main className="flex-1 p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
