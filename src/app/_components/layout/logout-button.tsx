"use client";

/* Next Imports */
import { useRouter } from "next/navigation";

/* Shadcn Imports */
import { Button } from "~/app/_components/ui/button";

/* Icons Imports */
import { IconLogout } from "@tabler/icons-react";

/* Auth Imports */
import { authClient } from "~/server/better-auth/client";

const LogoutButton = () => {
  const router = useRouter();

  const signout = async () =>
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });

  return (
    <Button
      variant="ghost"
      className="w-full hover:text-red-400"
      onClick={signout}
    >
      <IconLogout />
      Log out
    </Button>
  );
};

export default LogoutButton;
