"use client";

/* Next Imports */
import { useRouter } from "next/navigation";

/* Auth Imports */
import { authClient } from "~/server/better-auth/client";

/* Shadcn Imports */
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import { IconLogout } from "@tabler/icons-react";

export default function LogoutButton() {
  const router = useRouter();

  const signout = async () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  return (
    <Button variant="ghost" className="w-full" onClick={signout}>
      <IconLogout />
      Log out
    </Button>
  );
}
