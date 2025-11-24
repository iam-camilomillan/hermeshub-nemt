/* Next Imports */
import { redirect } from "next/navigation";

/* Auth Imports */
import { getSession } from "~/server/better-auth/server";

/* Shadcn Imports */
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/app/_components/ui/sidebar";
import { Separator } from "~/app/_components/ui/separator";
import { Button } from "~/app/_components/ui/button";

/* Components Imports */
import Sidebar from "~/app/_components/layout/sidebar";

/* Icons Imports */
import { IconBell } from "@tabler/icons-react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) redirect("/login");

  return (
    <SidebarProvider>
      <Sidebar variant="inset" />

      <SidebarInset>
        <header className="border-b px-2 py-1">
          <div className="flex items-center">
            <SidebarTrigger className="" />

            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />

            <h1 className="text-base font-medium">Dashboard</h1>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <IconBell className="size-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="">
          <div className="@container/main">
            <div className="">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
