/* Next Imports */
import { redirect } from "next/navigation";

/* Shadcn Imports */
import { SidebarInset, SidebarProvider } from "~/app/_components/ui/sidebar";
import { Toaster } from "~/app/_components/ui/sonner";

/* Components Imports */
import Sidebar from "~/app/_components/layout/sidebar";
import MainHeader from "./_components/main-header";

/* Auth Imports */
import { getSession } from "~/server/better-auth/server";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  /* Auth validation */
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <SidebarProvider className="h-svh overflow-hidden">
      <Sidebar variant="inset" session={session} />

      <SidebarInset>
        <MainHeader />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="@container/main flex h-full flex-col">
            <Toaster position="top-center" />
            <div className="flex-1 overflow-hidden">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
