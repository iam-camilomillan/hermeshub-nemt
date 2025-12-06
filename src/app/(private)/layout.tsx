/* Next Imports */
import { redirect } from "next/navigation";

/* Auth Imports */
import { getSession } from "~/server/better-auth/server";

/* Shadcn Imports */
import { SidebarInset, SidebarProvider } from "~/app/_components/ui/sidebar";

import { Toaster } from "~/app/_components/ui/sonner";

/* Components Imports */
import Sidebar from "~/app/_components/layout/sidebar";
import MainHeader from "./_components/main_header";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* Auth Validation */
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <Sidebar variant="inset" session={session} />

      <SidebarInset>
        <MainHeader />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="@container/main flex h-full flex-col">
            <Toaster position="top-center" />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
