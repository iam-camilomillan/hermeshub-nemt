"use client";

/* React Imports */
import { usePathname } from "next/navigation";

/* Shadcn Imports */
import { SidebarTrigger } from "~/app/_components/ui/sidebar";
import { Separator } from "~/app/_components/ui/separator";
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import { IconBell } from "@tabler/icons-react";

export default function MainHeader() {
  /* Title */
  const pathname = usePathname();
  const page = pathname.split("/").pop();

  return (
    <header className="border-b px-2 py-1">
      <div className="flex items-center">
        <SidebarTrigger className="" />

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-6"
        />

        <h1 className="text-base font-medium capitalize">{page}</h1>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <IconBell className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
