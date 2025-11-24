/* Components Imports */
import { IconChartArcs } from "@tabler/icons-react";
import Link from "next/link";
import { LoginForm } from "~/app/_components/layout/login-form";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-1 self-center font-medium"
        >
          <IconChartArcs className="size-5" />
          <span>HermesHub</span>
        </Link>

        <LoginForm />
      </div>
    </main>
  );
}
