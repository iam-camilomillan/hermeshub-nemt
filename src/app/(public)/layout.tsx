/* Next Imports */
import { redirect } from "next/navigation";

/* Auth Imports */
import { getSession } from "~/server/better-auth/server";

/* Components imports */
import Navbar from "~/app/_components/layout/navbar";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) redirect("/dashboard");

  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
