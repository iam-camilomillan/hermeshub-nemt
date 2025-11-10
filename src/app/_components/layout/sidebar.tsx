/* Next Imports */
import Link from "next/link";

/* Shadcn Imports */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/app/_components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";

/* Icons Imports */
import {
  IconAddressBook,
  IconBus,
  IconChartArcs,
  IconDotsVertical,
  IconLayoutDashboard,
  IconListDetails,
  IconLogout,
  IconMoon,
  IconRoute,
  IconSettings,
  IconUserCircle,
  IconUsersGroup,
  IconWallet,
} from "@tabler/icons-react";

/* Sidebar Groups */
const sidebarGroups = [
  {
    label: "",
    items: [
      {
        label: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        label: "Dispatching",
        icon: IconRoute,
        href: "/dispatching",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        label: "Trips",
        icon: IconListDetails,
        href: "/trips",
      },
      {
        label: "Members",
        icon: IconAddressBook,
        href: "/trips",
      },
      {
        label: "Vehicles",
        icon: IconBus,
        href: "/trips",
      },
    ],
  },
  {
    label: "Administration",
    items: [
      {
        label: "Users",
        icon: IconUsersGroup,
        href: "/users",
      },
      {
        label: "Payers",
        icon: IconWallet,
        href: "/payers",
      },
    ],
  },
];

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1"
            >
              <Link href="/dashboard">
                <IconChartArcs />
                <span className="text-base font-semibold">HermesHub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sidebarGroups.map((group, index) => (
          <SidebarGroup key={index}>
            {group.label && (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href}>
                        <item.icon />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Camilo Millan"
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Camilo Millan</span>

                    <span className="text-muted-foreground truncate text-xs">
                      iam.camilomillan@gmail.com
                    </span>
                  </div>

                  <IconDotsVertical className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Camilo Millan"
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        Camilo Millan
                      </span>

                      <span className="text-muted-foreground truncate text-xs">
                        iam.camilomillan@gmail.com
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconUserCircle />
                    Account
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <IconSettings />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <IconMoon />
                    Dark Mode
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <IconLogout />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
