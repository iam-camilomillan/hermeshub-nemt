/* Next Imports */
import Link from "next/link";

/* Shadcn imports */
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "~/app/_components/ui/navigation-menu";
import { Button } from "~/app/_components/ui/button";

/* Icons imports */
import { IconChartArcs } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <header className="absolute top-0 flex w-full items-center px-4 py-2">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-1">
        <IconChartArcs className="size-5" />
        <span className="text-base font-semibold">HermesHub</span>
      </Link>

      {/* Center navigation */}
      <NavigationMenu className="ml-6 font-medium">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/#hero">Home</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/#about">About</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/#product">Product</NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/#pricing">Pricing</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Auth */}
      <div className="ml-auto flex items-center space-x-2">
        <Button variant="link" asChild>
          <Link href="/book-demo">Book Demo</Link>
        </Button>

        <Button variant="default" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
