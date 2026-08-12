import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  ChevronsLeft,
  ChevronsRight,
  Image,
  SlidersHorizontal,
  Megaphone,
  Tag,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarState } from "./DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/core/routes/paths";

const navItems = [
  { title: "Dashboard", path: ROUTES.DASHBOARD, icon: LayoutDashboard },
  { title: "Institutions", path: ROUTES.INSTITUTION, icon: Building2 },
  { title: "Users", path: ROUTES.ADMINS, icon: Users },
];

const mediaSubItems = [
  { title: "Carousel", path: ROUTES.MEDIA_CAROUSEL, icon: SlidersHorizontal },
  { title: "Ads", path: ROUTES.MEDIA_ADS, icon: Megaphone },
  { title: "Offers", path: ROUTES.MEDIA_OFFERS, icon: Tag },
];

export function AppSidebar() {
  const { collapsed, setCollapsed } = useSidebarState();
  const navigate = useNavigate();
  const location = useLocation();

  const isMediaActive = location.pathname.startsWith("/dashboard/media");
  const [mediaOpen, setMediaOpen] = useState(isMediaActive);

  return (
    <aside
      data-testid="sidebar"
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-24 items-center border-b border-sidebar-border px-4 overflow-hidden">
        <NavLink to={ROUTES.DASHBOARD} className="flex items-center w-full">
          {collapsed ? (
            <div className="flex w-full items-center justify-center">
              <img 
                src="/logo_icon.png" 
                alt="Logo" 
                className="h-16 w-16 shrink-0 object-contain transition-transform hover:scale-105" 
              />
            </div>
          ) : (
            <img 
              src="/logo_full.png" 
              alt="CoachingKart" 
              className="h-[76px] w-auto shrink-0 object-contain ml-1 transition-transform hover:scale-105" 
            />
          )}
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === ROUTES.DASHBOARD}
            data-testid={`nav-${item.title.toLowerCase()}`}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        ))}

        {/* Media Group */}
        <div>
          <button
            data-testid="nav-media"
            onClick={() => {
              if (collapsed) {
                navigate(ROUTES.MEDIA_CAROUSEL);
              } else {
                setMediaOpen((prev) => !prev);
              }
            }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isMediaActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <Image className="h-5 w-5 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Media</span>
                {mediaOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0" />
                )}
              </>
            )}
          </button>

          {!collapsed && mediaOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-3">
              {mediaSubItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  data-testid={`nav-media-${item.title.toLowerCase()}`}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto border-t border-sidebar-border p-3">
        <button
          data-testid="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-primary-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        >
          {collapsed ? (
            <ChevronsRight className="h-5 w-5 shrink-0" />
          ) : (
            <>
              <ChevronsLeft className="h-5 w-5 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
