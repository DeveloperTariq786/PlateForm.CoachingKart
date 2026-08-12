import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronDown } from "lucide-react";
import { ROUTES } from "@/core/routes/paths";
import useAuthStore from "@/modules/auth/store/auth.store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AppHeader() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const formattedRole = user?.platformRole
    ? user.platformRole.replace("PLATFORM_", "").replace("_", " ")
    : "";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-end border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="header-user-dropdown"
              className="group flex items-center gap-3 rounded-full p-1 pr-2.5 outline-none transition-colors hover:bg-accent/60 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar className="h-9 w-9 border border-border/50">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col text-left md:flex">
                <span className="text-sm font-semibold leading-tight text-foreground">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {formattedRole}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 p-2 shadow-lg">
              <DropdownMenuLabel className="font-normal p-2">
                <div className="flex flex-col space-y-1.5">
                  <p className="text-sm font-semibold leading-none text-foreground">
                    {user?.name || "User"}
                  </p>
                  {user?.email && (
                    <p className="text-xs leading-none text-muted-foreground truncate">
                      {user.email}
                    </p>
                  )}
                  {formattedRole && (
                    <span className="mt-1 inline-flex w-fit items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                      {formattedRole}
                    </span>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                data-testid="header-logout-btn"
                onSelect={() => setShowLogoutDialog(true)}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950/50 dark:focus:text-red-300"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out of your session and redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                logout();
                navigate(ROUTES.LOGIN);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
